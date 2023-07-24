#########
# Grain #
#########

"""Struct to hold grain level data"""
Grain{T} = NamedVector{T} where T <: Real
measurements(g::Grain) = names(g, 1) # names(g) from NamedArray returns Vector{Vector{T}}

# Very hand-wavey stuff so you can call Grain(v::AbstractVector{T}, measurement_names::AbstractVector{String})
"""Main constructor for a Grain"""
function (::Type{S})(v::AbstractVector{T}, measurement_names::AbstractVector{String}) where {S<:NamedArray{P,1} where P, T<:Real}
    return NamedArray(v, (measurement_names,), ("measurement",))::Grain{T}
end

# measurements(g::Grain) = names(g, 1) # names(g) from NamedArray returns Vector{Vector{T}}

# """Main constructor for a Grain"""
# function Grain(v::AbstractVector{T}, measurement_names::AbstractVector{String}) where T<:Real
#     return NamedVector(v, (measurement_names,), ("measurement",))::Grain{T}
# end

#################
# Sinks / Rocks #
#################

"""Struct to hold sink level data"""
Sink = Vector{Grain{T} where T<:Real} # Using vector and not a set to preserve order

"""Gets the names of measurements from a Sink"""
measurements(s::Sink) = iszero(length(s)) ? String[] : measurements(s[1])
Base.getindex(s::Sink, key::String) = (g[key] for g ∈ s)

"""Iterator for a list of values of each measurement"""
eachmeasurement(s::Sink) = (s[m] for m in measurements(s))

"""
    Sink(grain1, grain2, ...)
    Sink([grain1, grain2, ...])

Collects a list of Grains into a Rock/Sink.

Ensures all Grains have the same names and are in the same order.
"""
# function (::Type{Vector{Grain{T}}})(vec_of_grains::AbstractVector{Grain{T}}) where T <: Real # each element is a grain
#     @assert allequal(measurements.(vec_of_grains))
#     return collect(vec_of_grains)::Sink
# end
#(::Type{Vector{Grain}})(vec_of_grains::AbstractVector{Grain}...) = Sink(vec_of_grains)

function (::Type{S})(vec_of_grains::AbstractVector{Grain}) where S <: Sink # each element is a grain
    @assert allequal(measurements.(vec_of_grains))
    return collect(vec_of_grains)::Sink
end

# Define aliases so Rock or Source can be used in place of Sink when those terms make more
# sense in those contexts.
"""Alias for Sink"""
Rock = Sink
"""Alias for Sink"""
Source = Sink

#################
# DensityTensor #
#################

# Idealy this would be a plain NamedArray, where we store the domain as
# the names along the third axis. But we have a different domain for each
# lateral slice j :( This means we must wrap the named array in a new type
# since Julia can only subtype abstract types...
"""
    DensityTensor(tensor::NamedArray{T, 3})
    DensityTensor(tensor::NamedArray{T, 3}, domains::AbstractVector{<: AbstractVector{T}})
    DensityTensor(
    KDEs::AbstractVector{<: AbstractVector{UnivariateKDE}},
    domains::AbstractVector{<: AbstractVector{T}},
    sinks::AbstractVector{Sink},
    )

An order 3 array to hold the density distributions for multiple sinks.
"""
struct DensityTensor{T <: Real} <: AbstractArray{T, 3}
    tensor::NamedArray{T, 3}
    domains::AbstractVector{<: AbstractVector{T}} # inner vector needs to be abstract to hold intervals ex. 1:10
    function DensityTensor(args...; domains, measurements, kw...)
        array = args[begin]
        typeT = typeof(array[begin,begin,begin])
        namedarray = NamedArray(args...; kw...)
        setnames!(namedarray, measurements, 2)
        setdimnames!(namedarray, "measurement", 2)
        setdimnames!(namedarray, "density", 3)
        #init_domains = [[]] #TODO initialize with the correct size
        #I, J, K = size(array)
        #init_xs = Vector{Vector{typeT}}(Vector{typeT}(undef, K), J)
        return new{typeT}(namedarray, domains)
    end
end
domains(D::DensityTensor) = D.domains
nammedarray(D::DensityTensor) = D.tensor
array(D::DensityTensor) = array(nammedarray(D))
array(N::NamedArray) = N.array
# ...but with ReusePatterns, DensityTensor can now be used like a NamedArray!
# Note (DensityTensor <: NamedArray == false) formally.
@forward((DensityTensor, :tensor), NamedArray);

function DensityTensor(
    KDEs::AbstractVector{<: AbstractVector{UnivariateKDE}},
    domains::AbstractVector{<: AbstractVector{T}},
    sinks::AbstractVector{Sink},
    ) where T <: Real
    # Argument Handeling
    allequal(measurements.(sinks)) ||
        ArgumentError("All sinks must have the same measurements in the same order.")
    length(sinks) == length(KDEs) ||
        ArgumentError("Must be the same number of sinks as there are lists of KDEs.")
    measurement_names = measurements(sinks[begin])
    length(measurement_names) == length(KDEs[begin]) ||
        ArgumentError("Must be the same number of measurements as there are KDEs for each sink.")

    # TODO make this line more legible, possible by wrapping the KDEs in a struct so they're named
    # Magic line to take the KDEs into an order-3 tensor
    data = permutedims(cat(cat(map.(k -> k.density, KDEs)..., dims=2)..., dims=3), [3,2,1])

    # Confirm all the dimentions are in the right order
    n_density_samples = length((KDEs[begin][begin]).x)
    @assert size(data) == (length(sinks), length(measurement_names), n_density_samples)

    # Wrap in a NamedArray
    namedarray = NamedArray(data, dimnames=("sink", "measurement", "density"))
    setnames!(namedarray, measurement_names, 2)

    # Wrap again in a DensityTensor to store the domains
    densitytensor = DensityTensor(namedarray, domains)

    return densitytensor
end

"""
    names(n::NamedArray, dimname::Union{String,Symbol})

Extend the names function from NamedArray to get the names given the axis name rather than
the axis number.
"""
function Base.names(n::NamedArray, dimname::Union{String,Symbol})
    return names(n, findfirst(dimnames(n) .== dimname))
end
Base.names(n::NamedArray, dimname::Name) = names(n, findfirst(dimnames(n) .== dimname.names))

# Getters for useful quantities
measurements(D::DensityTensor) = names(D, "measurement")

function _getmeasurementindex(D::DensityTensor, measurement::String)
    return findfirst(names(D, "measurement") .== measurement)
end

domain(D::DensityTensor, measurement::String) = domains(D)[_getmeasurementindex(D, measurement)]
domain(D::DensityTensor, j::Integer) = domains(D)[j]
getsource(D::DensityTensor, i::Integer) = D[i, :, :] # TODO see if @view is better
getsink = getsource
getstepsizes(D::DensityTensor) = [d[begin+1] - d[begin] for d in domains(D)]
sources(D::DensityTensor) = ["$(dimnames(D)[1]) $s" for s in names(D, 1)]

# Setters
setsourcename!(D::DensityTensor, name::String) = setdimnames!(D, name, 1)

# Other manipulators
"""
    normalize_density_sums!(D::DensityTensor)

Rescales the densities so that the sum of the density samples is 1.

This is in constrast to the usualy normalization for density functions where the area of the
density curve is 1. In the case of an evenly sampled density, this area is
`sum(density_samples)*step_size`.

Use `normalize_densities` to avoid mutation.
"""
function normalize_density_sums!(D::DensityTensor)
    for (slice, x) in zip(eachmeasurement(D), getstepsizes(D))
        slice ./= x
    end
end

"""See [normalize_density_sums!](@ref)"""
function normalize_density_sums(D::DensityTensor)
    D_copy = deepcopy(D)
    normalize_density_sums!(D_copy)
    return D_copy
end

# Iterators
eachdensity(D::DensityTensor) = eachslice(D, dims=3)
eachdensity(D::DensityTensor, measurement::String) = eachrow(D[:, measurement, :])
eachmeasurement(D::DensityTensor) = eachslice(D, dims=(1,3))
eachsource(D::DensityTensor) = eachslice(D, dims=(2,3))
const eachsink = eachsource
