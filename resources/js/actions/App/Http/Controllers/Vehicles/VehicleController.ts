import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Vehicles\VehicleController::search
* @see app/Http/Controllers/Vehicles/VehicleController.php:248
* @route '/api/vehicles/search'
*/
export const search = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: search.url(options),
    method: 'get',
})

search.definition = {
    methods: ["get","head"],
    url: '/api/vehicles/search',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::search
* @see app/Http/Controllers/Vehicles/VehicleController.php:248
* @route '/api/vehicles/search'
*/
search.url = (options?: RouteQueryOptions) => {
    return search.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::search
* @see app/Http/Controllers/Vehicles/VehicleController.php:248
* @route '/api/vehicles/search'
*/
search.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: search.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::search
* @see app/Http/Controllers/Vehicles/VehicleController.php:248
* @route '/api/vehicles/search'
*/
search.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: search.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::search
* @see app/Http/Controllers/Vehicles/VehicleController.php:248
* @route '/api/vehicles/search'
*/
const searchForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: search.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::search
* @see app/Http/Controllers/Vehicles/VehicleController.php:248
* @route '/api/vehicles/search'
*/
searchForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: search.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::search
* @see app/Http/Controllers/Vehicles/VehicleController.php:248
* @route '/api/vehicles/search'
*/
searchForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: search.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

search.form = searchForm

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::allFromFilters
* @see app/Http/Controllers/Vehicles/VehicleController.php:0
* @route '/api/vehicles/all-from-filters'
*/
export const allFromFilters = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: allFromFilters.url(options),
    method: 'get',
})

allFromFilters.definition = {
    methods: ["get","head"],
    url: '/api/vehicles/all-from-filters',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::allFromFilters
* @see app/Http/Controllers/Vehicles/VehicleController.php:0
* @route '/api/vehicles/all-from-filters'
*/
allFromFilters.url = (options?: RouteQueryOptions) => {
    return allFromFilters.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::allFromFilters
* @see app/Http/Controllers/Vehicles/VehicleController.php:0
* @route '/api/vehicles/all-from-filters'
*/
allFromFilters.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: allFromFilters.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::allFromFilters
* @see app/Http/Controllers/Vehicles/VehicleController.php:0
* @route '/api/vehicles/all-from-filters'
*/
allFromFilters.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: allFromFilters.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::allFromFilters
* @see app/Http/Controllers/Vehicles/VehicleController.php:0
* @route '/api/vehicles/all-from-filters'
*/
const allFromFiltersForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: allFromFilters.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::allFromFilters
* @see app/Http/Controllers/Vehicles/VehicleController.php:0
* @route '/api/vehicles/all-from-filters'
*/
allFromFiltersForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: allFromFilters.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::allFromFilters
* @see app/Http/Controllers/Vehicles/VehicleController.php:0
* @route '/api/vehicles/all-from-filters'
*/
allFromFiltersForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: allFromFilters.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

allFromFilters.form = allFromFiltersForm

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::filterCounts
* @see app/Http/Controllers/Vehicles/VehicleController.php:256
* @route '/api/vehicles/filter-counts'
*/
export const filterCounts = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: filterCounts.url(options),
    method: 'get',
})

filterCounts.definition = {
    methods: ["get","head"],
    url: '/api/vehicles/filter-counts',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::filterCounts
* @see app/Http/Controllers/Vehicles/VehicleController.php:256
* @route '/api/vehicles/filter-counts'
*/
filterCounts.url = (options?: RouteQueryOptions) => {
    return filterCounts.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::filterCounts
* @see app/Http/Controllers/Vehicles/VehicleController.php:256
* @route '/api/vehicles/filter-counts'
*/
filterCounts.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: filterCounts.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::filterCounts
* @see app/Http/Controllers/Vehicles/VehicleController.php:256
* @route '/api/vehicles/filter-counts'
*/
filterCounts.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: filterCounts.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::filterCounts
* @see app/Http/Controllers/Vehicles/VehicleController.php:256
* @route '/api/vehicles/filter-counts'
*/
const filterCountsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: filterCounts.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::filterCounts
* @see app/Http/Controllers/Vehicles/VehicleController.php:256
* @route '/api/vehicles/filter-counts'
*/
filterCountsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: filterCounts.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::filterCounts
* @see app/Http/Controllers/Vehicles/VehicleController.php:256
* @route '/api/vehicles/filter-counts'
*/
filterCountsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: filterCounts.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

filterCounts.form = filterCountsForm

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::geocodePostcode
* @see app/Http/Controllers/Vehicles/VehicleController.php:217
* @route '/api/vehicles/geocode/{postcode}'
*/
export const geocodePostcode = (args: { postcode: string | number } | [postcode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: geocodePostcode.url(args, options),
    method: 'get',
})

geocodePostcode.definition = {
    methods: ["get","head"],
    url: '/api/vehicles/geocode/{postcode}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::geocodePostcode
* @see app/Http/Controllers/Vehicles/VehicleController.php:217
* @route '/api/vehicles/geocode/{postcode}'
*/
geocodePostcode.url = (args: { postcode: string | number } | [postcode: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { postcode: args }
    }

    if (Array.isArray(args)) {
        args = {
            postcode: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        postcode: args.postcode,
    }

    return geocodePostcode.definition.url
            .replace('{postcode}', parsedArgs.postcode.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::geocodePostcode
* @see app/Http/Controllers/Vehicles/VehicleController.php:217
* @route '/api/vehicles/geocode/{postcode}'
*/
geocodePostcode.get = (args: { postcode: string | number } | [postcode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: geocodePostcode.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::geocodePostcode
* @see app/Http/Controllers/Vehicles/VehicleController.php:217
* @route '/api/vehicles/geocode/{postcode}'
*/
geocodePostcode.head = (args: { postcode: string | number } | [postcode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: geocodePostcode.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::geocodePostcode
* @see app/Http/Controllers/Vehicles/VehicleController.php:217
* @route '/api/vehicles/geocode/{postcode}'
*/
const geocodePostcodeForm = (args: { postcode: string | number } | [postcode: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: geocodePostcode.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::geocodePostcode
* @see app/Http/Controllers/Vehicles/VehicleController.php:217
* @route '/api/vehicles/geocode/{postcode}'
*/
geocodePostcodeForm.get = (args: { postcode: string | number } | [postcode: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: geocodePostcode.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::geocodePostcode
* @see app/Http/Controllers/Vehicles/VehicleController.php:217
* @route '/api/vehicles/geocode/{postcode}'
*/
geocodePostcodeForm.head = (args: { postcode: string | number } | [postcode: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: geocodePostcode.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

geocodePostcode.form = geocodePostcodeForm

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::myVehicles
* @see app/Http/Controllers/Vehicles/VehicleController.php:478
* @route '/api/vehicles/my-vehicles'
*/
export const myVehicles = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: myVehicles.url(options),
    method: 'get',
})

myVehicles.definition = {
    methods: ["get","head"],
    url: '/api/vehicles/my-vehicles',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::myVehicles
* @see app/Http/Controllers/Vehicles/VehicleController.php:478
* @route '/api/vehicles/my-vehicles'
*/
myVehicles.url = (options?: RouteQueryOptions) => {
    return myVehicles.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::myVehicles
* @see app/Http/Controllers/Vehicles/VehicleController.php:478
* @route '/api/vehicles/my-vehicles'
*/
myVehicles.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: myVehicles.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::myVehicles
* @see app/Http/Controllers/Vehicles/VehicleController.php:478
* @route '/api/vehicles/my-vehicles'
*/
myVehicles.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: myVehicles.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::myVehicles
* @see app/Http/Controllers/Vehicles/VehicleController.php:478
* @route '/api/vehicles/my-vehicles'
*/
const myVehiclesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: myVehicles.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::myVehicles
* @see app/Http/Controllers/Vehicles/VehicleController.php:478
* @route '/api/vehicles/my-vehicles'
*/
myVehiclesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: myVehicles.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::myVehicles
* @see app/Http/Controllers/Vehicles/VehicleController.php:478
* @route '/api/vehicles/my-vehicles'
*/
myVehiclesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: myVehicles.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

myVehicles.form = myVehiclesForm

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::updateStatus
* @see app/Http/Controllers/Vehicles/VehicleController.php:499
* @route '/api/vehicles/{vehicle}/status'
*/
export const updateStatus = (args: { vehicle: number | { id: number } } | [vehicle: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateStatus.url(args, options),
    method: 'patch',
})

updateStatus.definition = {
    methods: ["patch"],
    url: '/api/vehicles/{vehicle}/status',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::updateStatus
* @see app/Http/Controllers/Vehicles/VehicleController.php:499
* @route '/api/vehicles/{vehicle}/status'
*/
updateStatus.url = (args: { vehicle: number | { id: number } } | [vehicle: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { vehicle: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { vehicle: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            vehicle: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        vehicle: typeof args.vehicle === 'object'
        ? args.vehicle.id
        : args.vehicle,
    }

    return updateStatus.definition.url
            .replace('{vehicle}', parsedArgs.vehicle.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::updateStatus
* @see app/Http/Controllers/Vehicles/VehicleController.php:499
* @route '/api/vehicles/{vehicle}/status'
*/
updateStatus.patch = (args: { vehicle: number | { id: number } } | [vehicle: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateStatus.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::updateStatus
* @see app/Http/Controllers/Vehicles/VehicleController.php:499
* @route '/api/vehicles/{vehicle}/status'
*/
const updateStatusForm = (args: { vehicle: number | { id: number } } | [vehicle: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateStatus.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::updateStatus
* @see app/Http/Controllers/Vehicles/VehicleController.php:499
* @route '/api/vehicles/{vehicle}/status'
*/
updateStatusForm.patch = (args: { vehicle: number | { id: number } } | [vehicle: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateStatus.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updateStatus.form = updateStatusForm

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::index
* @see app/Http/Controllers/Vehicles/VehicleController.php:24
* @route '/api/vehicles'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/vehicles',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::index
* @see app/Http/Controllers/Vehicles/VehicleController.php:24
* @route '/api/vehicles'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::index
* @see app/Http/Controllers/Vehicles/VehicleController.php:24
* @route '/api/vehicles'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::index
* @see app/Http/Controllers/Vehicles/VehicleController.php:24
* @route '/api/vehicles'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::index
* @see app/Http/Controllers/Vehicles/VehicleController.php:24
* @route '/api/vehicles'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::index
* @see app/Http/Controllers/Vehicles/VehicleController.php:24
* @route '/api/vehicles'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::index
* @see app/Http/Controllers/Vehicles/VehicleController.php:24
* @route '/api/vehicles'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::store
* @see app/Http/Controllers/Vehicles/VehicleController.php:138
* @route '/api/vehicles'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/vehicles',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::store
* @see app/Http/Controllers/Vehicles/VehicleController.php:138
* @route '/api/vehicles'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::store
* @see app/Http/Controllers/Vehicles/VehicleController.php:138
* @route '/api/vehicles'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::store
* @see app/Http/Controllers/Vehicles/VehicleController.php:138
* @route '/api/vehicles'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::store
* @see app/Http/Controllers/Vehicles/VehicleController.php:138
* @route '/api/vehicles'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::show
* @see app/Http/Controllers/Vehicles/VehicleController.php:175
* @route '/api/vehicles/{vehicle}'
*/
export const show = (args: { vehicle: number | { id: number } } | [vehicle: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/vehicles/{vehicle}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::show
* @see app/Http/Controllers/Vehicles/VehicleController.php:175
* @route '/api/vehicles/{vehicle}'
*/
show.url = (args: { vehicle: number | { id: number } } | [vehicle: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { vehicle: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { vehicle: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            vehicle: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        vehicle: typeof args.vehicle === 'object'
        ? args.vehicle.id
        : args.vehicle,
    }

    return show.definition.url
            .replace('{vehicle}', parsedArgs.vehicle.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::show
* @see app/Http/Controllers/Vehicles/VehicleController.php:175
* @route '/api/vehicles/{vehicle}'
*/
show.get = (args: { vehicle: number | { id: number } } | [vehicle: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::show
* @see app/Http/Controllers/Vehicles/VehicleController.php:175
* @route '/api/vehicles/{vehicle}'
*/
show.head = (args: { vehicle: number | { id: number } } | [vehicle: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::show
* @see app/Http/Controllers/Vehicles/VehicleController.php:175
* @route '/api/vehicles/{vehicle}'
*/
const showForm = (args: { vehicle: number | { id: number } } | [vehicle: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::show
* @see app/Http/Controllers/Vehicles/VehicleController.php:175
* @route '/api/vehicles/{vehicle}'
*/
showForm.get = (args: { vehicle: number | { id: number } } | [vehicle: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::show
* @see app/Http/Controllers/Vehicles/VehicleController.php:175
* @route '/api/vehicles/{vehicle}'
*/
showForm.head = (args: { vehicle: number | { id: number } } | [vehicle: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::update
* @see app/Http/Controllers/Vehicles/VehicleController.php:197
* @route '/api/vehicles/{vehicle}'
*/
export const update = (args: { vehicle: number | { id: number } } | [vehicle: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/vehicles/{vehicle}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::update
* @see app/Http/Controllers/Vehicles/VehicleController.php:197
* @route '/api/vehicles/{vehicle}'
*/
update.url = (args: { vehicle: number | { id: number } } | [vehicle: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { vehicle: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { vehicle: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            vehicle: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        vehicle: typeof args.vehicle === 'object'
        ? args.vehicle.id
        : args.vehicle,
    }

    return update.definition.url
            .replace('{vehicle}', parsedArgs.vehicle.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::update
* @see app/Http/Controllers/Vehicles/VehicleController.php:197
* @route '/api/vehicles/{vehicle}'
*/
update.put = (args: { vehicle: number | { id: number } } | [vehicle: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::update
* @see app/Http/Controllers/Vehicles/VehicleController.php:197
* @route '/api/vehicles/{vehicle}'
*/
update.patch = (args: { vehicle: number | { id: number } } | [vehicle: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::update
* @see app/Http/Controllers/Vehicles/VehicleController.php:197
* @route '/api/vehicles/{vehicle}'
*/
const updateForm = (args: { vehicle: number | { id: number } } | [vehicle: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::update
* @see app/Http/Controllers/Vehicles/VehicleController.php:197
* @route '/api/vehicles/{vehicle}'
*/
updateForm.put = (args: { vehicle: number | { id: number } } | [vehicle: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::update
* @see app/Http/Controllers/Vehicles/VehicleController.php:197
* @route '/api/vehicles/{vehicle}'
*/
updateForm.patch = (args: { vehicle: number | { id: number } } | [vehicle: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::destroy
* @see app/Http/Controllers/Vehicles/VehicleController.php:207
* @route '/api/vehicles/{vehicle}'
*/
export const destroy = (args: { vehicle: number | { id: number } } | [vehicle: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/vehicles/{vehicle}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::destroy
* @see app/Http/Controllers/Vehicles/VehicleController.php:207
* @route '/api/vehicles/{vehicle}'
*/
destroy.url = (args: { vehicle: number | { id: number } } | [vehicle: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { vehicle: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { vehicle: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            vehicle: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        vehicle: typeof args.vehicle === 'object'
        ? args.vehicle.id
        : args.vehicle,
    }

    return destroy.definition.url
            .replace('{vehicle}', parsedArgs.vehicle.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::destroy
* @see app/Http/Controllers/Vehicles/VehicleController.php:207
* @route '/api/vehicles/{vehicle}'
*/
destroy.delete = (args: { vehicle: number | { id: number } } | [vehicle: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::destroy
* @see app/Http/Controllers/Vehicles/VehicleController.php:207
* @route '/api/vehicles/{vehicle}'
*/
const destroyForm = (args: { vehicle: number | { id: number } } | [vehicle: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::destroy
* @see app/Http/Controllers/Vehicles/VehicleController.php:207
* @route '/api/vehicles/{vehicle}'
*/
destroyForm.delete = (args: { vehicle: number | { id: number } } | [vehicle: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::adminIndex
* @see app/Http/Controllers/Vehicles/VehicleController.php:448
* @route '/api/admin/vehicles'
*/
export const adminIndex = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: adminIndex.url(options),
    method: 'get',
})

adminIndex.definition = {
    methods: ["get","head"],
    url: '/api/admin/vehicles',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::adminIndex
* @see app/Http/Controllers/Vehicles/VehicleController.php:448
* @route '/api/admin/vehicles'
*/
adminIndex.url = (options?: RouteQueryOptions) => {
    return adminIndex.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::adminIndex
* @see app/Http/Controllers/Vehicles/VehicleController.php:448
* @route '/api/admin/vehicles'
*/
adminIndex.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: adminIndex.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::adminIndex
* @see app/Http/Controllers/Vehicles/VehicleController.php:448
* @route '/api/admin/vehicles'
*/
adminIndex.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: adminIndex.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::adminIndex
* @see app/Http/Controllers/Vehicles/VehicleController.php:448
* @route '/api/admin/vehicles'
*/
const adminIndexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: adminIndex.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::adminIndex
* @see app/Http/Controllers/Vehicles/VehicleController.php:448
* @route '/api/admin/vehicles'
*/
adminIndexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: adminIndex.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::adminIndex
* @see app/Http/Controllers/Vehicles/VehicleController.php:448
* @route '/api/admin/vehicles'
*/
adminIndexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: adminIndex.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

adminIndex.form = adminIndexForm

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::showPage
* @see app/Http/Controllers/Vehicles/VehicleController.php:184
* @route '/vehicles/details/{id}'
*/
export const showPage = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showPage.url(args, options),
    method: 'get',
})

showPage.definition = {
    methods: ["get","head"],
    url: '/vehicles/details/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::showPage
* @see app/Http/Controllers/Vehicles/VehicleController.php:184
* @route '/vehicles/details/{id}'
*/
showPage.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return showPage.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::showPage
* @see app/Http/Controllers/Vehicles/VehicleController.php:184
* @route '/vehicles/details/{id}'
*/
showPage.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showPage.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::showPage
* @see app/Http/Controllers/Vehicles/VehicleController.php:184
* @route '/vehicles/details/{id}'
*/
showPage.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showPage.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::showPage
* @see app/Http/Controllers/Vehicles/VehicleController.php:184
* @route '/vehicles/details/{id}'
*/
const showPageForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showPage.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::showPage
* @see app/Http/Controllers/Vehicles/VehicleController.php:184
* @route '/vehicles/details/{id}'
*/
showPageForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showPage.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::showPage
* @see app/Http/Controllers/Vehicles/VehicleController.php:184
* @route '/vehicles/details/{id}'
*/
showPageForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showPage.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

showPage.form = showPageForm

const VehicleController = { search, allFromFilters, filterCounts, geocodePostcode, myVehicles, updateStatus, index, store, show, update, destroy, adminIndex, showPage }

export default VehicleController