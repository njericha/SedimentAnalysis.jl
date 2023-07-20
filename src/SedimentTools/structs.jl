#########
# Grain #
#########

"""Struct to hold grain level data"""
Grain{T <: Number} = NamedVector{T}
measurments(g::Grain) = names(g, 1) # names(g) from NamedArray returns Vector{Vector{T}}

function Grain(v::AbstractVector{T<:Number}, measurment_names::AbstractVector{String})
    return NamedArray(v, (measurment_names,), ("measurment",))::Grain{T}
end

#################
# Sinks / Rocks #
#################

"""Struct to hold sink level data"""
Sink{T <: Number} = Vector{Grain{T}} # Using vector and not a set to preserve order

"""Gets the names of measurments from a Sink"""
measurments(s::Sink) = iszero(length(s)) ? String[] : measurments(s[1])
getindex(s::Sink, key::String) = (g[key] for g ∈ s)

"""Iterator for a list of values of each measurement"""
eachmeasurment(s::Sink) = (s[m] for m in measurments(s))

"""
    Sink(grain1, grain2, ...)
    Sink([grain1, grain2, ...])

Collects a list of Grains into a Rock/Sink.

Ensures all Grains have the same names and are in the same order.
"""
function Sink(vec_of_grains::AbstractVector{Grain{T}}) # each element is a grain
    @assert allequal(measurments.(vec_of_grains))
    return collect(vec_of_grains)::Sink{T}
end
Sink(vec_of_grains::AbstractVector{Grain}...) = Sink(vec_of_grains)

"""Alias for Sink"""
Rock = Sink

#################
# DensityTensor #
#################

"""Struct to hold sink level density data"""
DensityTensor{T <: Number} = NamedArray{T, 3}

measurments(d::DensityTensor) = names(d, "measurments")
getsink(d::DensityTensor, i::Integer) = d[i, :, :] # TODO see if @view is better
getsource = getsink

"""Methods to get the names given the axis name rather than the axis number"""
function Base.names(n::NamedArray, dimname::Union{String,Symbol})
    return names(n, findfirst(dimnames(n) .== dimname))
end
Base.names(n::NamedArray, dimname::Name) = names(n, findfirst(dimnames(n) .== dimname.names))

to_tensor(sinks::DensityTensor) = sinks.array

function DensityTensor(sinks::AbstractVector{Sinks}, KDEs::AbstractVector{AbstractVector{UnivariateKDE}})
    # Argument Handeling
    allequal(measurments.(sinks)) ||
        ArgumentError("All sinks must have the same measurements in the same order.")
    length(sinks) == length(KDEs) ||
        ArgumentError("Must be the same number of sinks as there are lists of KDEs.")
    measurment_names = measurments(sinks[begin])
    length(measurment_names) == length(KDEs[begin]) ||
        ArgumentError("Must be the same number of measurements as there are KDEs for each sink.")

    # TODO make this line more legible, possible by wrapping the KDEs in a struct so they're named
    # Magic line to take the KDEs into an order-3 tensor
    data = permutedims(cat(cat(map.(k -> k.density, KDEs)..., dims=2)..., dims=3), [3,2,1])

    # Confirm all the dimentions are in the right order
    n_density_samples = length((KDEs[begin][begin]).x)
    @assert size(data) == (length(sinks), length(measurment_names), n_density_samples)

    # Wrap in a NamedArray
    dsinks = NamedArray(data, dimnames=("sink", "measurment", "density"))::DensityTensor
    setnames!(dsinks, measurment_names, 2)

    return dsinks
end
