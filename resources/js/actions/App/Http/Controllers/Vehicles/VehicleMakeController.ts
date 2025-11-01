import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Vehicles\VehicleMakeController::index
* @see app/Http/Controllers/Vehicles/VehicleMakeController.php:16
* @route '/api/vehicles/makes'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/vehicles/makes',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Vehicles\VehicleMakeController::index
* @see app/Http/Controllers/Vehicles/VehicleMakeController.php:16
* @route '/api/vehicles/makes'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Vehicles\VehicleMakeController::index
* @see app/Http/Controllers/Vehicles/VehicleMakeController.php:16
* @route '/api/vehicles/makes'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleMakeController::index
* @see app/Http/Controllers/Vehicles/VehicleMakeController.php:16
* @route '/api/vehicles/makes'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleMakeController::index
* @see app/Http/Controllers/Vehicles/VehicleMakeController.php:16
* @route '/api/vehicles/makes'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleMakeController::index
* @see app/Http/Controllers/Vehicles/VehicleMakeController.php:16
* @route '/api/vehicles/makes'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleMakeController::index
* @see app/Http/Controllers/Vehicles/VehicleMakeController.php:16
* @route '/api/vehicles/makes'
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
* @see \App\Http\Controllers\Vehicles\VehicleMakeController::show
* @see app/Http/Controllers/Vehicles/VehicleMakeController.php:26
* @route '/api/vehicles/makes/{make}'
*/
export const show = (args: { make: number | { id: number } } | [make: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/vehicles/makes/{make}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Vehicles\VehicleMakeController::show
* @see app/Http/Controllers/Vehicles/VehicleMakeController.php:26
* @route '/api/vehicles/makes/{make}'
*/
show.url = (args: { make: number | { id: number } } | [make: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { make: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { make: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            make: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        make: typeof args.make === 'object'
        ? args.make.id
        : args.make,
    }

    return show.definition.url
            .replace('{make}', parsedArgs.make.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Vehicles\VehicleMakeController::show
* @see app/Http/Controllers/Vehicles/VehicleMakeController.php:26
* @route '/api/vehicles/makes/{make}'
*/
show.get = (args: { make: number | { id: number } } | [make: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleMakeController::show
* @see app/Http/Controllers/Vehicles/VehicleMakeController.php:26
* @route '/api/vehicles/makes/{make}'
*/
show.head = (args: { make: number | { id: number } } | [make: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleMakeController::show
* @see app/Http/Controllers/Vehicles/VehicleMakeController.php:26
* @route '/api/vehicles/makes/{make}'
*/
const showForm = (args: { make: number | { id: number } } | [make: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleMakeController::show
* @see app/Http/Controllers/Vehicles/VehicleMakeController.php:26
* @route '/api/vehicles/makes/{make}'
*/
showForm.get = (args: { make: number | { id: number } } | [make: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleMakeController::show
* @see app/Http/Controllers/Vehicles/VehicleMakeController.php:26
* @route '/api/vehicles/makes/{make}'
*/
showForm.head = (args: { make: number | { id: number } } | [make: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

const VehicleMakeController = { index, show }

export default VehicleMakeController