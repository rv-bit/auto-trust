import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
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

const VehicleMakeController = { index }

export default VehicleMakeController