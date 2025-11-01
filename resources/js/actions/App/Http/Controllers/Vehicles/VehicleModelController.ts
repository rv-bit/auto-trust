import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Vehicles\VehicleModelController::byMake
* @see app/Http/Controllers/Vehicles/VehicleModelController.php:17
* @route '/api/vehicles/makes/{make}/models'
*/
export const byMake = (args: { make: number | { id: number } } | [make: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: byMake.url(args, options),
    method: 'get',
})

byMake.definition = {
    methods: ["get","head"],
    url: '/api/vehicles/makes/{make}/models',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Vehicles\VehicleModelController::byMake
* @see app/Http/Controllers/Vehicles/VehicleModelController.php:17
* @route '/api/vehicles/makes/{make}/models'
*/
byMake.url = (args: { make: number | { id: number } } | [make: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return byMake.definition.url
            .replace('{make}', parsedArgs.make.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Vehicles\VehicleModelController::byMake
* @see app/Http/Controllers/Vehicles/VehicleModelController.php:17
* @route '/api/vehicles/makes/{make}/models'
*/
byMake.get = (args: { make: number | { id: number } } | [make: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: byMake.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleModelController::byMake
* @see app/Http/Controllers/Vehicles/VehicleModelController.php:17
* @route '/api/vehicles/makes/{make}/models'
*/
byMake.head = (args: { make: number | { id: number } } | [make: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: byMake.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleModelController::byMake
* @see app/Http/Controllers/Vehicles/VehicleModelController.php:17
* @route '/api/vehicles/makes/{make}/models'
*/
const byMakeForm = (args: { make: number | { id: number } } | [make: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: byMake.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleModelController::byMake
* @see app/Http/Controllers/Vehicles/VehicleModelController.php:17
* @route '/api/vehicles/makes/{make}/models'
*/
byMakeForm.get = (args: { make: number | { id: number } } | [make: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: byMake.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleModelController::byMake
* @see app/Http/Controllers/Vehicles/VehicleModelController.php:17
* @route '/api/vehicles/makes/{make}/models'
*/
byMakeForm.head = (args: { make: number | { id: number } } | [make: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: byMake.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

byMake.form = byMakeForm

/**
* @see \App\Http\Controllers\Vehicles\VehicleModelController::index
* @see app/Http/Controllers/Vehicles/VehicleModelController.php:27
* @route '/api/vehicles/models'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/vehicles/models',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Vehicles\VehicleModelController::index
* @see app/Http/Controllers/Vehicles/VehicleModelController.php:27
* @route '/api/vehicles/models'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Vehicles\VehicleModelController::index
* @see app/Http/Controllers/Vehicles/VehicleModelController.php:27
* @route '/api/vehicles/models'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleModelController::index
* @see app/Http/Controllers/Vehicles/VehicleModelController.php:27
* @route '/api/vehicles/models'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleModelController::index
* @see app/Http/Controllers/Vehicles/VehicleModelController.php:27
* @route '/api/vehicles/models'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleModelController::index
* @see app/Http/Controllers/Vehicles/VehicleModelController.php:27
* @route '/api/vehicles/models'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Vehicles\VehicleModelController::index
* @see app/Http/Controllers/Vehicles/VehicleModelController.php:27
* @route '/api/vehicles/models'
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

const VehicleModelController = { byMake, index }

export default VehicleModelController