var documenterSearchIndex = {"docs":
[{"location":"SedimentTools/#Sediment-Analysis-Tools","page":"Sediment Analysis Tools","title":"Sediment Analysis Tools","text":"","category":"section"},{"location":"SedimentTools/","page":"Sediment Analysis Tools","title":"Sediment Analysis Tools","text":"SedimentSourceAnalysis.SedimentTools","category":"page"},{"location":"SedimentTools/#SedimentSourceAnalysis.SedimentTools","page":"Sediment Analysis Tools","title":"SedimentSourceAnalysis.SedimentTools","text":"Import, store, and visualize sediment data.\n\n\n\n\n\n","category":"module"},{"location":"SedimentTools/#Types","page":"Sediment Analysis Tools","title":"Types","text":"","category":"section"},{"location":"SedimentTools/","page":"Sediment Analysis Tools","title":"Sediment Analysis Tools","text":"Grain\nDensityTensor\nRock\nSink\nSource","category":"page"},{"location":"SedimentTools/#SedimentSourceAnalysis.SedimentTools.Grain","page":"Sediment Analysis Tools","title":"SedimentSourceAnalysis.SedimentTools.Grain","text":"Grain(v::AbstractVector{T}, measurement_names::AbstractVector{String})\n\nStruct to hold grain level data\n\n\n\n\n\n","category":"type"},{"location":"SedimentTools/#SedimentSourceAnalysis.SedimentTools.DensityTensor","page":"Sediment Analysis Tools","title":"SedimentSourceAnalysis.SedimentTools.DensityTensor","text":"DensityTensor(KDEs, domains, sinks)\nDensityTensor(array, domains, measurement_names; kw...)\n\nAn order 3 array to hold the density distributions for multiple sinks.\n\nKDEs is a Vector{Vector{Vector{T}}} like type whereas array is an Array{T,3} like type.\n\nCall setsourcename! to set the source name (name of first dimention).\n\n\n\n\n\n","category":"type"},{"location":"SedimentTools/#SedimentSourceAnalysis.SedimentTools.Rock","page":"Sediment Analysis Tools","title":"SedimentSourceAnalysis.SedimentTools.Rock","text":"Alias for Sink\n\n\n\n\n\n","category":"type"},{"location":"SedimentTools/#SedimentSourceAnalysis.SedimentTools.Sink","page":"Sediment Analysis Tools","title":"SedimentSourceAnalysis.SedimentTools.Sink","text":"Sink(grain1, grain2, ...)\nSink([grain1, grain2, ...])\n\nCollects a list of Grains into a Rock/Sink.\n\nEnsures all Grains have the same names and are in the same order. Struct to hold sink level data\n\n\n\n\n\n","category":"type"},{"location":"SedimentTools/#SedimentSourceAnalysis.SedimentTools.Source","page":"Sediment Analysis Tools","title":"SedimentSourceAnalysis.SedimentTools.Source","text":"Alias for Sink\n\n\n\n\n\n","category":"type"},{"location":"SedimentTools/#Method-Extentions","page":"Sediment Analysis Tools","title":"Method Extentions","text":"","category":"section"},{"location":"SedimentTools/","page":"Sediment Analysis Tools","title":"Sediment Analysis Tools","text":"getindex(::Sink, ::String)\nnames(::NamedArray, ::Union{String,Symbol})\nheatmap(::NamedMatrix)\nSedimentSourceAnalysis.SedimentTools.make_densities(::Sink)\nSedimentSourceAnalysis.SedimentTools.make_densities2d(::Sink)","category":"page"},{"location":"SedimentTools/#Base.getindex-Tuple{Vector{NamedVector{T} where T<:Real}, String}","page":"Sediment Analysis Tools","title":"Base.getindex","text":"Base.getindex(s::Sink, k::String)\nBase.getindex(s::Sink, ks::AbstractVector{String})\n\nGets all values of the measurement k in the Sink.\n\n\n\n\n\n","category":"method"},{"location":"SedimentTools/#Base.names-Tuple{NamedArray, Union{String, Symbol}}","page":"Sediment Analysis Tools","title":"Base.names","text":"names(n::NamedArray, dimname::Union{String,Symbol})\n\nExtend the names function from NamedArray to get the names given the axis name rather than the axis number.\n\n\n\n\n\n","category":"method"},{"location":"SedimentTools/#Plots.heatmap-Tuple{NamedMatrix}","page":"Sediment Analysis Tools","title":"Plots.heatmap","text":"Plots.heatmap(M::NamedMatrix; kwargs...)\n\nAutomatically grabs the names in axis to label the x and y plot axis\n\n\n\n\n\n","category":"method"},{"location":"SedimentTools/#MatrixTensorFactor.make_densities-Tuple{Vector{NamedVector{T} where T<:Real}}","page":"Sediment Analysis Tools","title":"MatrixTensorFactor.make_densities","text":"make_densities(s::Sink; kwargs...)\nmake_densities(s::Sink, domains::AbstractVector{<:AbstractVector}; kwargs...)\n\nEstimates the densities for each measurement in a Sink.\n\nWhen given domains, a list where each entry is a domain for a different measurement, resample the kernel on this domain.\n\nParameters\n\nbandwidths::AbstractVector{<:Real}: list of bandwidths used for each measurement's\n\ndensity estimation\n\ninner_percentile::Integer=100: value between 0 and 100 that filters out each measurement\n\nby using the inner percentile range. This can help remove outliers and focus in on where the bulk of the data is.\n\nReturns\n\ndensity_estimates::Vector{UnivariateKDE}\n\n\n\n\n\n","category":"method"},{"location":"SedimentTools/#MatrixTensorFactor.make_densities2d-Tuple{Vector{NamedVector{T} where T<:Real}}","page":"Sediment Analysis Tools","title":"MatrixTensorFactor.make_densities2d","text":"make_densities2d(s::Sink; kwargs...)\nmake_densities2d(s::Sink, domains::AbstractVector{<:AbstractVector}; kwargs...)\n\nSimilar to make_densities but performs the KDE on 2 measurements jointly.\n\n\n\n\n\n","category":"method"},{"location":"SedimentTools/#Functions","page":"Sediment Analysis Tools","title":"Functions","text":"","category":"section"},{"location":"SedimentTools/#Importers","page":"Sediment Analysis Tools","title":"Importers","text":"","category":"section"},{"location":"SedimentTools/","page":"Sediment Analysis Tools","title":"Sediment Analysis Tools","text":"read_raw_data","category":"page"},{"location":"SedimentTools/#SedimentSourceAnalysis.SedimentTools.read_raw_data","page":"Sediment Analysis Tools","title":"SedimentSourceAnalysis.SedimentTools.read_raw_data","text":"read_raw_data(filename)\nread_raw_data(filename; skip_sheets)\n\nImports excel data to a Vector{Sink}.\n\nExcel file must have one element per page where different columns correspond to different sinks. Each sink can have a different number of grains (length of the column), but a sink must have a consistant length across different measurements (sheets).\n\nOptionaly provide a collection skip_sheets to blacklist sheet names from the excel file.\n\n\n\n\n\n","category":"function"},{"location":"SedimentTools/#Getters","page":"Sediment Analysis Tools","title":"Getters","text":"","category":"section"},{"location":"SedimentTools/","page":"Sediment Analysis Tools","title":"Sediment Analysis Tools","text":"array\ngetdomain\ngetdomains\ngetmeasurements\ngetsourcename\ngetsourcenames\ngetstepsizes\nnamedarray\ngetsink\ngetsource","category":"page"},{"location":"SedimentTools/#SedimentSourceAnalysis.SedimentTools.array","page":"Sediment Analysis Tools","title":"SedimentSourceAnalysis.SedimentTools.array","text":"Turn a DensityTensor or NamedArray into a plain Array type.\n\n\n\n\n\n","category":"function"},{"location":"SedimentTools/#SedimentSourceAnalysis.SedimentTools.getdomain","page":"Sediment Analysis Tools","title":"SedimentSourceAnalysis.SedimentTools.getdomain","text":"getdomain(D::DensityTensor, measurement::String)\ngetdomain(D::DensityTensor, j::Integer)\n\nGets the domain for the measurement density, the locations where the density was sampled. See getdomains.\n\n\n\n\n\n","category":"function"},{"location":"SedimentTools/#SedimentSourceAnalysis.SedimentTools.getdomains","page":"Sediment Analysis Tools","title":"SedimentSourceAnalysis.SedimentTools.getdomains","text":"getdomains(D::DensityTensor{T})::Vector{Vector{T}}\n\nGets the domain for every measurement's density, the locations where each density was sampled. See getdomains.\n\n\n\n\n\n","category":"function"},{"location":"SedimentTools/#SedimentSourceAnalysis.SedimentTools.getmeasurements","page":"Sediment Analysis Tools","title":"SedimentSourceAnalysis.SedimentTools.getmeasurements","text":"getmeasurements(g::Grain)\ngetmeasurements(s::Sink)\ngetmeasurements(D::DensityTensor)\n\nGetter for the measurement names.\n\n\n\n\n\ngetmeasurements(s::Sink)\n\nGets the names of measurements from a Sink\n\n\n\n\n\n","category":"function"},{"location":"SedimentTools/#SedimentSourceAnalysis.SedimentTools.getsourcename","page":"Sediment Analysis Tools","title":"SedimentSourceAnalysis.SedimentTools.getsourcename","text":"getsourcename(D::DensityTensor)\n\nGets the name for the grouping of measurements. Usually \"Sink\" or \"Source\". See getsourcename.\n\n\n\n\n\n","category":"function"},{"location":"SedimentTools/#SedimentSourceAnalysis.SedimentTools.getsourcenames","page":"Sediment Analysis Tools","title":"SedimentSourceAnalysis.SedimentTools.getsourcenames","text":"getsourcenames(D::DensityTensor)\n\nGets the list of all sources' names. For example, [\"Sink 1\", \"Sink 2\", ...]. See getsourcenames.\n\n\n\n\n\n","category":"function"},{"location":"SedimentTools/#SedimentSourceAnalysis.SedimentTools.getstepsizes","page":"Sediment Analysis Tools","title":"SedimentSourceAnalysis.SedimentTools.getstepsizes","text":"getstepsizes(D::DensityTensor)\n\nGets the step sizes used for each domain. See getdomains.\n\n\n\n\n\n","category":"function"},{"location":"SedimentTools/#SedimentSourceAnalysis.SedimentTools.namedarray","page":"Sediment Analysis Tools","title":"SedimentSourceAnalysis.SedimentTools.namedarray","text":"Turn a DensityTensor into a NamedArray type.\n\n\n\n\n\n","category":"function"},{"location":"SedimentTools/#SedimentSourceAnalysis.SedimentTools.getsink","page":"Sediment Analysis Tools","title":"SedimentSourceAnalysis.SedimentTools.getsink","text":"Alias for getsource\n\n\n\n\n\n","category":"function"},{"location":"SedimentTools/#SedimentSourceAnalysis.SedimentTools.getsource","page":"Sediment Analysis Tools","title":"SedimentSourceAnalysis.SedimentTools.getsource","text":"getsource(D::DensityTensor, i::Integer)\ngetsink(D::DensityTensor, i::Integer)\n\nGets source/sink i from D. See eachsource.\n\n\n\n\n\n","category":"function"},{"location":"SedimentTools/#Setters-and-Manipulators","page":"Sediment Analysis Tools","title":"Setters and Manipulators","text":"","category":"section"},{"location":"SedimentTools/","page":"Sediment Analysis Tools","title":"Sediment Analysis Tools","text":"normalize_density_sums!\nnormalize_density_sums\nsetsourcename!\nmatch_sources!","category":"page"},{"location":"SedimentTools/#SedimentSourceAnalysis.SedimentTools.normalize_density_sums!","page":"Sediment Analysis Tools","title":"SedimentSourceAnalysis.SedimentTools.normalize_density_sums!","text":"normalize_density_sums!(D::DensityTensor)\n\nRescales the densities so that the sum of the density samples is 1.\n\nThis is in constrast to the usualy normalization for density functions where the area of the density curve is 1. In the case of an evenly sampled density, this area is sum(density_samples)*step_size.\n\nUse normalize_density_sums to avoid mutation.\n\n\n\n\n\n","category":"function"},{"location":"SedimentTools/#SedimentSourceAnalysis.SedimentTools.normalize_density_sums","page":"Sediment Analysis Tools","title":"SedimentSourceAnalysis.SedimentTools.normalize_density_sums","text":"See normalize_density_sums!\n\n\n\n\n\n","category":"function"},{"location":"SedimentTools/#SedimentSourceAnalysis.SedimentTools.setsourcename!","page":"Sediment Analysis Tools","title":"SedimentSourceAnalysis.SedimentTools.setsourcename!","text":"setsourcename!(D::DensityTensor, name::String)\n\nSets the name of the source used by getsourcename and getsourcenames.\n\n\n\n\n\n","category":"function"},{"location":"SedimentTools/#SedimentSourceAnalysis.SedimentTools.match_sources!","page":"Sediment Analysis Tools","title":"SedimentSourceAnalysis.SedimentTools.match_sources!","text":"match_sources!(C, F, C_true, F_true)\n\nPermute sources in C and F to match the ground truth C_true and F_true.\n\nSimilarity is checked by finding the source that minimizes norm(c - c_true) where c is the column of C.\n\nParameters\n\ndouble_check::Bool: When true, repeat for F and F_true with their horizontal slices, and assert the ordering is the same as before.\n\n\n\n\n\n","category":"function"},{"location":"SedimentTools/#Grain-Labeling","page":"Sediment Analysis Tools","title":"Grain Labeling","text":"","category":"section"},{"location":"SedimentTools/","page":"Sediment Analysis Tools","title":"Sediment Analysis Tools","text":"confidence_score\nestimate_which_source\nestimate_which_2d_source\nestimate_which_nd_source\nlabel_accuracy","category":"page"},{"location":"SedimentTools/#SedimentSourceAnalysis.SedimentTools.confidence_score","page":"Sediment Analysis Tools","title":"SedimentSourceAnalysis.SedimentTools.confidence_score","text":"confidence_score(source_likelihoods; sorted=false)\n\nScores each grain between [0, 1] on how confident it came from the most likely source.\n\nThe likelihoods should be sorted in desending order. If they are presorted, use the keyword sorted=true.\n\nInput\n\nsource_likelihoods: A list-of-lists or NTuple of Vectors of the likelihood each grain came from each source.\n\n\n\n\n\n","category":"function"},{"location":"SedimentTools/#SedimentSourceAnalysis.SedimentTools.estimate_which_source","page":"Sediment Analysis Tools","title":"SedimentSourceAnalysis.SedimentTools.estimate_which_source","text":"estimate_which_source(grain::Grain, F::DensityTensor; kwargs...)\n\nReturns the likelihood and source index of the mostly likely factor the grain vector came from.\n\nReturns\n\n(Default) source_index::Integer: The index of the most likely source\n(when max_likelihoods==true) (maxlikelihood, source_index): The most likely source and its likelihood\n(when all_likelihoods==true) likelihoods::Vector{Real}: Likelihood grain came from each source\n(when both are true) ((maxlikelihood, source_index), likelihoods)\n\n\n\n\n\n","category":"function"},{"location":"SedimentTools/#SedimentSourceAnalysis.SedimentTools.estimate_which_2d_source","page":"Sediment Analysis Tools","title":"SedimentSourceAnalysis.SedimentTools.estimate_which_2d_source","text":"estimate_which_2d_source(grain::Grain, F; kwargs...)\n\nReturns the likelihood and source index of the mostly likely factor the grain vector came from.\n\nWorks on densities F where each horizontal slice is a discretized 2D KDE.\n\nSee estimate_which_source.\n\nReturns\n\n(Default) source_index::Integer: The index of the most likely source\n(when max_likelihoods==true) (maxlikelihood, source_index): The most likely source and its likelihood\n(when all_likelihoods==true) likelihoods::Vector{Real}: Likelihood grain came from each source\n(when both are true) ((maxlikelihood, source_index), likelihoods)\n\n\n\n\n\n","category":"function"},{"location":"SedimentTools/#SedimentSourceAnalysis.SedimentTools.estimate_which_nd_source","page":"Sediment Analysis Tools","title":"SedimentSourceAnalysis.SedimentTools.estimate_which_nd_source","text":"estimate_which_nd_source(grain::Grain, F; kwargs...)\n\nReturns the likelihood and source index of the mostly likely factor the grain vector came from.\n\nWorks on densities F where each first order slice is a discretized n-Dimentional KDE.\n\nSee estimate_which_source and estimate_which_2d_source.\n\nReturns\n\n(Default) source_index::Integer: The index of the most likely source\n(when max_likelihoods==true) (maxlikelihood, source_index): The most likely source and its likelihood\n(when all_likelihoods==true) likelihoods::Vector{Real}: Likelihood grain came from each source\n(when both are true) ((maxlikelihood, source_index), likelihoods)\n\n\n\n\n\n","category":"function"},{"location":"SedimentTools/#SedimentSourceAnalysis.SedimentTools.label_accuracy","page":"Sediment Analysis Tools","title":"SedimentSourceAnalysis.SedimentTools.label_accuracy","text":"label_accuracy(labels, true_amounts::AbstractArray{T,3})\n\nCalculates the number of correctly labeled grains and percentage of correct labels\n\nArguments\n\nlabels: Iterable of iterables with the labels for each grain (Vector{Vector{T}} or Tuple{Tuple})\ntrue_amounts: Number of grains from each source for every sink\n\nOutputs\n\nn_correct_eachsink::Integer\nn_total_labels::Integer\naccuracy::Real\n\n\n\n\n\n","category":"function"},{"location":"SedimentTools/#Iterators","page":"Sediment Analysis Tools","title":"Iterators","text":"","category":"section"},{"location":"SedimentTools/","page":"Sediment Analysis Tools","title":"Sediment Analysis Tools","text":"eachdensity\neachmeasurement\neachsink\neachsource","category":"page"},{"location":"SedimentTools/#SedimentSourceAnalysis.SedimentTools.eachdensity","page":"Sediment Analysis Tools","title":"SedimentSourceAnalysis.SedimentTools.eachdensity","text":"eachdensity(D::DensityTensor)\neachdensity(D::DensityTensor, measurement::String)\neachdensity(...; sink::Integer)\n\nIterates D over each density vector. These are the 3 fibers of D. If a measurement is given, iterates over the densities for that measurement. If the keyword sink is given, only show densities from that sink.\n\n\n\n\n\n","category":"function"},{"location":"SedimentTools/#SedimentSourceAnalysis.SedimentTools.eachmeasurement","page":"Sediment Analysis Tools","title":"SedimentSourceAnalysis.SedimentTools.eachmeasurement","text":"eachmeasurement(s::Sink)\n\nIterator for a list of values of each measurement\n\n\n\n\n\neachmeasurement(D::DensityTensor)\n\nIterates D over each measurement slice. These are the lateral slices.\n\n\n\n\n\n","category":"function"},{"location":"SedimentTools/#SedimentSourceAnalysis.SedimentTools.eachsink","page":"Sediment Analysis Tools","title":"SedimentSourceAnalysis.SedimentTools.eachsink","text":"Alias for eachsource.\n\n\n\n\n\n","category":"function"},{"location":"SedimentTools/#SedimentSourceAnalysis.SedimentTools.eachsource","page":"Sediment Analysis Tools","title":"SedimentSourceAnalysis.SedimentTools.eachsource","text":"eachsource(D::DensityTensor)\neachsink(D::DensityTensor)\n\nIterates D over each source/sink slice. These are the horizontal slices. See getsource.\n\n\n\n\n\n","category":"function"},{"location":"SedimentTools/#Visualizers","page":"Sediment Analysis Tools","title":"Visualizers","text":"","category":"section"},{"location":"SedimentTools/","page":"Sediment Analysis Tools","title":"Sediment Analysis Tools","text":"measurement_heatmaps\nplot_densities\nsource_heatmaps\nplot_convergence\nplot_source_index","category":"page"},{"location":"SedimentTools/#SedimentSourceAnalysis.SedimentTools.measurement_heatmaps","page":"Sediment Analysis Tools","title":"SedimentSourceAnalysis.SedimentTools.measurement_heatmaps","text":"measurement_heatmaps(D::DensityTensor; kw...)\n\nReturns heatmaps for each measurement (lateral slices) of D.\n\n\n\n\n\n","category":"function"},{"location":"SedimentTools/#SedimentSourceAnalysis.SedimentTools.plot_densities","page":"Sediment Analysis Tools","title":"SedimentSourceAnalysis.SedimentTools.plot_densities","text":"distributions_plot(D::DensityTensor, measurement::String; kw...)\n\nReturns one plot will all distributions for a given measurement (lateral slice) of D.\n\n\n\n\n\n","category":"function"},{"location":"SedimentTools/#SedimentSourceAnalysis.SedimentTools.source_heatmaps","page":"Sediment Analysis Tools","title":"SedimentSourceAnalysis.SedimentTools.source_heatmaps","text":"source_heatmaps(D::DensityTensor; title=\"\", kw...)\n\nReturns heatmaps for each source (horizontal slices) of D.\n\nThe source name/index for each source will be appended to title.\n\n\n\n\n\n","category":"function"},{"location":"SedimentTools/#SedimentSourceAnalysis.SedimentTools.plot_convergence","page":"Sediment Analysis Tools","title":"SedimentSourceAnalysis.SedimentTools.plot_convergence","text":"plot_convergence(rel_errors, norm_grad, dist_Ncone)\n\nReturns 3 separate plots for the three convergence metrics on a log10-y scale.\n\n\n\n\n\nplot_convergence((rel_errors, norm_grad, dist_Ncone))\n\n\n\n\n\n","category":"function"},{"location":"SedimentTools/#SedimentSourceAnalysis.SedimentTools.plot_source_index","page":"Sediment Analysis Tools","title":"SedimentSourceAnalysis.SedimentTools.plot_source_index","text":"plot_source_index(\nindexes::AbstractVector{<:Integer},\nloglikelihood_ratios::AbstractVector{<:Real};\nkwargs...\n)\n\nReturns one scatter plot of dots (eachindex(indexes), indexes) with brighter colours corresponding to higher loglikelihood_ratios.\n\n\n\n\n\n","category":"function"},{"location":"SedimentTools/#Index","page":"Sediment Analysis Tools","title":"Index","text":"","category":"section"},{"location":"SedimentTools/","page":"Sediment Analysis Tools","title":"Sediment Analysis Tools","text":"","category":"page"},{"location":"MTF/#Matrix-Tensor-Factorization","page":"Matrix Tensor Factorization","title":"Matrix Tensor Factorization","text":"","category":"section"},{"location":"MTF/","page":"Matrix Tensor Factorization","title":"Matrix Tensor Factorization","text":"See https://mpf-optimization-laboratory.github.io/MatrixTensorFactor.jl/dev/.","category":"page"},{"location":"#Sediment-Source-Analysis","page":"Sediment Source Analysis","title":"Sediment Source Analysis","text":"","category":"section"},{"location":"#Summary-of-Features","page":"Sediment Source Analysis","title":"Summary of Features","text":"","category":"section"},{"location":"","page":"Sediment Source Analysis","title":"Sediment Source Analysis","text":"Import grain data from Excel files\nPerform kernel density estimation on grain data by sinks and features\nDecompose sink distributions into weighted combination of sources\nLabel grains based on learned sources\nPlot kernel densities, sink, and source distributions","category":"page"},{"location":"","page":"Sediment Source Analysis","title":"Sediment Source Analysis","text":"Depth = 3","category":"page"},{"location":"#How-setup-the-environment","page":"Sediment Source Analysis","title":"How setup the environment","text":"","category":"section"},{"location":"#Prefered-Method","page":"Sediment Source Analysis","title":"Prefered Method","text":"","category":"section"},{"location":"","page":"Sediment Source Analysis","title":"Sediment Source Analysis","text":"Run julia\nAdd the package with pkg> add https://github.com/njericha/SedimentSourceAnalysis.jl.git","category":"page"},{"location":"","page":"Sediment Source Analysis","title":"Sediment Source Analysis","text":"(use julia> ] to get to the package manager)","category":"page"},{"location":"","page":"Sediment Source Analysis","title":"Sediment Source Analysis","text":"Resolve dependency issues with pkg> resolve and check it works with pkg> precompile (if you have an error with dependencies not downloading, try pkg> instantiate)\nImport with using SedimentSourceAnalysis","category":"page"},{"location":"","page":"Sediment Source Analysis","title":"Sediment Source Analysis","text":"OR","category":"page"},{"location":"#In-Browser","page":"Sediment Source Analysis","title":"In Browser","text":"","category":"section"},{"location":"","page":"Sediment Source Analysis","title":"Sediment Source Analysis","text":"Go to https://github.com/njericha/SedimentSourceAnalysis.jl\nClick \"<> Code\" and press \"+\" to \"Create a codespace on main\". It make take a few moments to set up.\nOpen the command palett with Ctrl+Shift+P (Windows) or Cmd+Shift+P (Mac)\nEnter >Julia: Start REPL\nIn the REPL, resolve any dependency issues with pkg> resolve and pkg> instantiate (use julia> ] to get to the package manager). It may take a few minutes to download dependencies.","category":"page"},{"location":"","page":"Sediment Source Analysis","title":"Sediment Source Analysis","text":"Run one of the example files by opening the file and pressing the triangular \"run\" button, or >Julia: Execute active File in REPL.","category":"page"},{"location":"","page":"Sediment Source Analysis","title":"Sediment Source Analysis","text":"OR","category":"page"},{"location":"#On-your-own-device","page":"Sediment Source Analysis","title":"On your own device","text":"","category":"section"},{"location":"","page":"Sediment Source Analysis","title":"Sediment Source Analysis","text":"Clone the repo at https://github.com/njericha/SedimentSourceAnalysis.jl\nNavigate to the root of the repository in a terminal and run julia\nActivate the project with pkg> activate . (use julia> ] to get to the package manager)\nresolve any dependency issues with pkg> resolve","category":"page"},{"location":"#Importing-the-package","page":"Sediment Source Analysis","title":"Importing the package","text":"","category":"section"},{"location":"","page":"Sediment Source Analysis","title":"Sediment Source Analysis","text":"Type julia> using SedimentSourceAnalysis to load all submodules (currently only SedimentTools), or if only one of the modules is desired, type using SedimentSourceAnalysis.XXX.","category":"page"},{"location":"#Examples","page":"Sediment Source Analysis","title":"Examples","text":"","category":"section"},{"location":"","page":"Sediment Source Analysis","title":"Sediment Source Analysis","text":"knownsources.jl: Uses data from Sundel et al where we know the sources of each Grain. Use this to see how well the factorization performs with realistic data. unknownsources.jl: Uses data from Lee et al where we don't have a ground truth. Showcases how the method would be used in practice. randomtensor: Factorizes a random 50x50x50 tensor. See how the factorization performs in theory when a perfect factorization exists.","category":"page"},{"location":"#Submodules","page":"Sediment Source Analysis","title":"Submodules","text":"","category":"section"},{"location":"","page":"Sediment Source Analysis","title":"Sediment Source Analysis","text":"The main submodule is SedimentTools. SedimentSourceAnalysis also builds off of MatrixTensorFactor.jl.","category":"page"},{"location":"#MatrixTensorFactor","page":"Sediment Source Analysis","title":"MatrixTensorFactor","text":"","category":"section"},{"location":"","page":"Sediment Source Analysis","title":"Sediment Source Analysis","text":"Defines the main factorization function and related mathematical functions. See the full documentation here Matrix Tensor Factorization.","category":"page"},{"location":"#SedimentTools","page":"Sediment Source Analysis","title":"SedimentTools","text":"","category":"section"},{"location":"","page":"Sediment Source Analysis","title":"Sediment Source Analysis","text":"Holds various types at the Grain, and Sink level, importing (read_raw_data) and processing data (make_densities) functions, and additional methods of some Plots.jl functions for visualization with these custom types.","category":"page"},{"location":"#Index","page":"Sediment Source Analysis","title":"Index","text":"","category":"section"},{"location":"","page":"Sediment Source Analysis","title":"Sediment Source Analysis","text":"","category":"page"}]
}
