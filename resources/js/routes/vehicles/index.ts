import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
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
* @see \App\Http\Controllers\Vehicles\VehicleController::geocode
* @see app/Http/Controllers/Vehicles/VehicleController.php:217
* @route '/api/vehicles/geocode'
*/
export const geocode = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: geocode.url(options),
    method: 'get',
})

geocode.definition = {
    methods: ["get","head"],
    url: '/api/vehicles/geocode',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::geocode
* @see app/Http/Controllers/Vehicles/VehicleController.php:217
* @route '/api/vehicles/geocode'
*/
geocode.url = (options?: RouteQueryOptions) => {
    return geocode.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::geocode
* @see app/Http/Controllers/Vehicles/VehicleController.php:217
* @route '/api/vehicles/geocode'
*/
geocode.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: geocode.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::geocode
* @see app/Http/Controllers/Vehicles/VehicleController.php:217
* @route '/api/vehicles/geocode'
*/
geocode.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: geocode.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::geocode
* @see app/Http/Controllers/Vehicles/VehicleController.php:217
* @route '/api/vehicles/geocode'
*/
const geocodeForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: geocode.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::geocode
* @see app/Http/Controllers/Vehicles/VehicleController.php:217
* @route '/api/vehicles/geocode'
*/
geocodeForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: geocode.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::geocode
* @see app/Http/Controllers/Vehicles/VehicleController.php:217
* @route '/api/vehicles/geocode'
*/
geocodeForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: geocode.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

geocode.form = geocodeForm

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
* @see routes/vehicles.php:14
* @route '/vehicles/dashboard'
*/
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/vehicles/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/vehicles.php:14
* @route '/vehicles/dashboard'
*/
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see routes/vehicles.php:14
* @route '/vehicles/dashboard'
*/
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

/**
* @see routes/vehicles.php:14
* @route '/vehicles/dashboard'
*/
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

/**
* @see routes/vehicles.php:14
* @route '/vehicles/dashboard'
*/
const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: dashboard.url(options),
    method: 'get',
})

/**
* @see routes/vehicles.php:14
* @route '/vehicles/dashboard'
*/
dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: dashboard.url(options),
    method: 'get',
})

/**
* @see routes/vehicles.php:14
* @route '/vehicles/dashboard'
*/
dashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: dashboard.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

dashboard.form = dashboardForm

/**
* @see routes/vehicles.php:18
* @route '/vehicles/stock-cars'
*/
export const stockCars = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: stockCars.url(options),
    method: 'get',
})

stockCars.definition = {
    methods: ["get","head"],
    url: '/vehicles/stock-cars',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/vehicles.php:18
* @route '/vehicles/stock-cars'
*/
stockCars.url = (options?: RouteQueryOptions) => {
    return stockCars.definition.url + queryParams(options)
}

/**
* @see routes/vehicles.php:18
* @route '/vehicles/stock-cars'
*/
stockCars.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: stockCars.url(options),
    method: 'get',
})

/**
* @see routes/vehicles.php:18
* @route '/vehicles/stock-cars'
*/
stockCars.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: stockCars.url(options),
    method: 'head',
})

/**
* @see routes/vehicles.php:18
* @route '/vehicles/stock-cars'
*/
const stockCarsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: stockCars.url(options),
    method: 'get',
})

/**
* @see routes/vehicles.php:18
* @route '/vehicles/stock-cars'
*/
stockCarsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: stockCars.url(options),
    method: 'get',
})

/**
* @see routes/vehicles.php:18
* @route '/vehicles/stock-cars'
*/
stockCarsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: stockCars.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

stockCars.form = stockCarsForm

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::details
* @see app/Http/Controllers/Vehicles/VehicleController.php:184
* @route '/vehicles/details/{id}'
*/
export const details = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: details.url(args, options),
    method: 'get',
})

details.definition = {
    methods: ["get","head"],
    url: '/vehicles/details/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::details
* @see app/Http/Controllers/Vehicles/VehicleController.php:184
* @route '/vehicles/details/{id}'
*/
details.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return details.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::details
* @see app/Http/Controllers/Vehicles/VehicleController.php:184
* @route '/vehicles/details/{id}'
*/
details.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: details.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::details
* @see app/Http/Controllers/Vehicles/VehicleController.php:184
* @route '/vehicles/details/{id}'
*/
details.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: details.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::details
* @see app/Http/Controllers/Vehicles/VehicleController.php:184
* @route '/vehicles/details/{id}'
*/
const detailsForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: details.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::details
* @see app/Http/Controllers/Vehicles/VehicleController.php:184
* @route '/vehicles/details/{id}'
*/
detailsForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: details.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::details
* @see app/Http/Controllers/Vehicles/VehicleController.php:184
* @route '/vehicles/details/{id}'
*/
detailsForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: details.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

details.form = detailsForm

/**
* @see routes/vehicles.php:29
* @route '/vehicles/{listing}'
*/
export const listing = (args: { listing: string | number } | [listing: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: listing.url(args, options),
    method: 'get',
})

listing.definition = {
    methods: ["get","head"],
    url: '/vehicles/{listing}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/vehicles.php:29
* @route '/vehicles/{listing}'
*/
listing.url = (args: { listing: string | number } | [listing: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { listing: args }
    }

    if (Array.isArray(args)) {
        args = {
            listing: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        listing: args.listing,
    }

    return listing.definition.url
            .replace('{listing}', parsedArgs.listing.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see routes/vehicles.php:29
* @route '/vehicles/{listing}'
*/
listing.get = (args: { listing: string | number } | [listing: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: listing.url(args, options),
    method: 'get',
})

/**
* @see routes/vehicles.php:29
* @route '/vehicles/{listing}'
*/
listing.head = (args: { listing: string | number } | [listing: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: listing.url(args, options),
    method: 'head',
})

/**
* @see routes/vehicles.php:29
* @route '/vehicles/{listing}'
*/
const listingForm = (args: { listing: string | number } | [listing: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: listing.url(args, options),
    method: 'get',
})

/**
* @see routes/vehicles.php:29
* @route '/vehicles/{listing}'
*/
listingForm.get = (args: { listing: string | number } | [listing: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: listing.url(args, options),
    method: 'get',
})

/**
* @see routes/vehicles.php:29
* @route '/vehicles/{listing}'
*/
listingForm.head = (args: { listing: string | number } | [listing: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: listing.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

listing.form = listingForm

const vehicles = {
    search: Object.assign(search, search),
    allFromFilters: Object.assign(allFromFilters, allFromFilters),
    filterCounts: Object.assign(filterCounts, filterCounts),
    geocode: Object.assign(geocode, geocode),
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
    dashboard: Object.assign(dashboard, dashboard),
    stockCars: Object.assign(stockCars, stockCars),
    details: Object.assign(details, details),
    listing: Object.assign(listing, listing),
}

export default vehicles