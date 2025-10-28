import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Vehicles\VehicleController::index
* @see app/Http/Controllers/Vehicles/VehicleController.php:20
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
* @see app/Http/Controllers/Vehicles/VehicleController.php:20
* @route '/api/vehicles'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::index
* @see app/Http/Controllers/Vehicles/VehicleController.php:20
* @route '/api/vehicles'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::index
* @see app/Http/Controllers/Vehicles/VehicleController.php:20
* @route '/api/vehicles'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::index
* @see app/Http/Controllers/Vehicles/VehicleController.php:20
* @route '/api/vehicles'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::index
* @see app/Http/Controllers/Vehicles/VehicleController.php:20
* @route '/api/vehicles'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::index
* @see app/Http/Controllers/Vehicles/VehicleController.php:20
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
* @see app/Http/Controllers/Vehicles/VehicleController.php:96
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
* @see app/Http/Controllers/Vehicles/VehicleController.php:96
* @route '/api/vehicles'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::store
* @see app/Http/Controllers/Vehicles/VehicleController.php:96
* @route '/api/vehicles'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::store
* @see app/Http/Controllers/Vehicles/VehicleController.php:96
* @route '/api/vehicles'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::store
* @see app/Http/Controllers/Vehicles/VehicleController.php:96
* @route '/api/vehicles'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::show
* @see app/Http/Controllers/Vehicles/VehicleController.php:106
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
* @see app/Http/Controllers/Vehicles/VehicleController.php:106
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
* @see app/Http/Controllers/Vehicles/VehicleController.php:106
* @route '/api/vehicles/{vehicle}'
*/
show.get = (args: { vehicle: number | { id: number } } | [vehicle: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::show
* @see app/Http/Controllers/Vehicles/VehicleController.php:106
* @route '/api/vehicles/{vehicle}'
*/
show.head = (args: { vehicle: number | { id: number } } | [vehicle: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::show
* @see app/Http/Controllers/Vehicles/VehicleController.php:106
* @route '/api/vehicles/{vehicle}'
*/
const showForm = (args: { vehicle: number | { id: number } } | [vehicle: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::show
* @see app/Http/Controllers/Vehicles/VehicleController.php:106
* @route '/api/vehicles/{vehicle}'
*/
showForm.get = (args: { vehicle: number | { id: number } } | [vehicle: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::show
* @see app/Http/Controllers/Vehicles/VehicleController.php:106
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
* @see app/Http/Controllers/Vehicles/VehicleController.php:114
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
* @see app/Http/Controllers/Vehicles/VehicleController.php:114
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
* @see app/Http/Controllers/Vehicles/VehicleController.php:114
* @route '/api/vehicles/{vehicle}'
*/
update.put = (args: { vehicle: number | { id: number } } | [vehicle: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::update
* @see app/Http/Controllers/Vehicles/VehicleController.php:114
* @route '/api/vehicles/{vehicle}'
*/
update.patch = (args: { vehicle: number | { id: number } } | [vehicle: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::update
* @see app/Http/Controllers/Vehicles/VehicleController.php:114
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
* @see app/Http/Controllers/Vehicles/VehicleController.php:114
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
* @see app/Http/Controllers/Vehicles/VehicleController.php:114
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
* @see app/Http/Controllers/Vehicles/VehicleController.php:124
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
* @see app/Http/Controllers/Vehicles/VehicleController.php:124
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
* @see app/Http/Controllers/Vehicles/VehicleController.php:124
* @route '/api/vehicles/{vehicle}'
*/
destroy.delete = (args: { vehicle: number | { id: number } } | [vehicle: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleController::destroy
* @see app/Http/Controllers/Vehicles/VehicleController.php:124
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
* @see app/Http/Controllers/Vehicles/VehicleController.php:124
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
* @see routes/web.php:17
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
* @see routes/web.php:17
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
* @see routes/web.php:17
* @route '/vehicles/{listing}'
*/
listing.get = (args: { listing: string | number } | [listing: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: listing.url(args, options),
    method: 'get',
})

/**
* @see routes/web.php:17
* @route '/vehicles/{listing}'
*/
listing.head = (args: { listing: string | number } | [listing: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: listing.url(args, options),
    method: 'head',
})

/**
* @see routes/web.php:17
* @route '/vehicles/{listing}'
*/
const listingForm = (args: { listing: string | number } | [listing: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: listing.url(args, options),
    method: 'get',
})

/**
* @see routes/web.php:17
* @route '/vehicles/{listing}'
*/
listingForm.get = (args: { listing: string | number } | [listing: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: listing.url(args, options),
    method: 'get',
})

/**
* @see routes/web.php:17
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
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
    listing: Object.assign(listing, listing),
}

export default vehicles