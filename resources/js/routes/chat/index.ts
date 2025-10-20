import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
import message from './message'
/**
* @see \App\Http\Controllers\Chat\MessageController::user
* @see app/Http/Controllers/Chat/MessageController.php:32
* @route '/chat/{user}'
*/
export const user = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: user.url(args, options),
    method: 'get',
})

user.definition = {
    methods: ["get","head"],
    url: '/chat/{user}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Chat\MessageController::user
* @see app/Http/Controllers/Chat/MessageController.php:32
* @route '/chat/{user}'
*/
user.url = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { user: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { user: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            user: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        user: typeof args.user === 'object'
        ? args.user.id
        : args.user,
    }

    return user.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Chat\MessageController::user
* @see app/Http/Controllers/Chat/MessageController.php:32
* @route '/chat/{user}'
*/
user.get = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: user.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Chat\MessageController::user
* @see app/Http/Controllers/Chat/MessageController.php:32
* @route '/chat/{user}'
*/
user.head = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: user.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Chat\MessageController::user
* @see app/Http/Controllers/Chat/MessageController.php:32
* @route '/chat/{user}'
*/
const userForm = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: user.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Chat\MessageController::user
* @see app/Http/Controllers/Chat/MessageController.php:32
* @route '/chat/{user}'
*/
userForm.get = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: user.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Chat\MessageController::user
* @see app/Http/Controllers/Chat/MessageController.php:32
* @route '/chat/{user}'
*/
userForm.head = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: user.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

user.form = userForm

const chat = {
    user: Object.assign(user, user),
    message: Object.assign(message, message),
}

export default chat