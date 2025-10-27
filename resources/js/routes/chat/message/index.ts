import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Chat\MessageController::loadOlder
* @see app/Http/Controllers/Chat/MessageController.php:50
* @route '/chat/message/older/{message}'
*/
export const loadOlder = (args: { message: number | { id: number } } | [message: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: loadOlder.url(args, options),
    method: 'get',
})

loadOlder.definition = {
    methods: ["get","head"],
    url: '/chat/message/older/{message}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Chat\MessageController::loadOlder
* @see app/Http/Controllers/Chat/MessageController.php:50
* @route '/chat/message/older/{message}'
*/
loadOlder.url = (args: { message: number | { id: number } } | [message: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { message: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { message: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            message: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        message: typeof args.message === 'object'
        ? args.message.id
        : args.message,
    }

    return loadOlder.definition.url
            .replace('{message}', parsedArgs.message.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Chat\MessageController::loadOlder
* @see app/Http/Controllers/Chat/MessageController.php:50
* @route '/chat/message/older/{message}'
*/
loadOlder.get = (args: { message: number | { id: number } } | [message: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: loadOlder.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Chat\MessageController::loadOlder
* @see app/Http/Controllers/Chat/MessageController.php:50
* @route '/chat/message/older/{message}'
*/
loadOlder.head = (args: { message: number | { id: number } } | [message: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: loadOlder.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Chat\MessageController::loadOlder
* @see app/Http/Controllers/Chat/MessageController.php:50
* @route '/chat/message/older/{message}'
*/
const loadOlderForm = (args: { message: number | { id: number } } | [message: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: loadOlder.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Chat\MessageController::loadOlder
* @see app/Http/Controllers/Chat/MessageController.php:50
* @route '/chat/message/older/{message}'
*/
loadOlderForm.get = (args: { message: number | { id: number } } | [message: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: loadOlder.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Chat\MessageController::loadOlder
* @see app/Http/Controllers/Chat/MessageController.php:50
* @route '/chat/message/older/{message}'
*/
loadOlderForm.head = (args: { message: number | { id: number } } | [message: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: loadOlder.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

loadOlder.form = loadOlderForm

/**
* @see \App\Http\Controllers\Chat\MessageController::store
* @see app/Http/Controllers/Chat/MessageController.php:65
* @route '/chat/message'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/chat/message',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Chat\MessageController::store
* @see app/Http/Controllers/Chat/MessageController.php:65
* @route '/chat/message'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Chat\MessageController::store
* @see app/Http/Controllers/Chat/MessageController.php:65
* @route '/chat/message'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Chat\MessageController::store
* @see app/Http/Controllers/Chat/MessageController.php:65
* @route '/chat/message'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Chat\MessageController::store
* @see app/Http/Controllers/Chat/MessageController.php:65
* @route '/chat/message'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Chat\MessageController::destroy
* @see app/Http/Controllers/Chat/MessageController.php:82
* @route '/chat/message/{message}'
*/
export const destroy = (args: { message: number | { id: number } } | [message: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/chat/message/{message}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Chat\MessageController::destroy
* @see app/Http/Controllers/Chat/MessageController.php:82
* @route '/chat/message/{message}'
*/
destroy.url = (args: { message: number | { id: number } } | [message: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { message: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { message: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            message: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        message: typeof args.message === 'object'
        ? args.message.id
        : args.message,
    }

    return destroy.definition.url
            .replace('{message}', parsedArgs.message.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Chat\MessageController::destroy
* @see app/Http/Controllers/Chat/MessageController.php:82
* @route '/chat/message/{message}'
*/
destroy.delete = (args: { message: number | { id: number } } | [message: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Chat\MessageController::destroy
* @see app/Http/Controllers/Chat/MessageController.php:82
* @route '/chat/message/{message}'
*/
const destroyForm = (args: { message: number | { id: number } } | [message: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Chat\MessageController::destroy
* @see app/Http/Controllers/Chat/MessageController.php:82
* @route '/chat/message/{message}'
*/
destroyForm.delete = (args: { message: number | { id: number } } | [message: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Chat\MessageController::markSeen
* @see app/Http/Controllers/Chat/MessageController.php:115
* @route '/chat/message/seen/{user}'
*/
export const markSeen = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markSeen.url(args, options),
    method: 'post',
})

markSeen.definition = {
    methods: ["post"],
    url: '/chat/message/seen/{user}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Chat\MessageController::markSeen
* @see app/Http/Controllers/Chat/MessageController.php:115
* @route '/chat/message/seen/{user}'
*/
markSeen.url = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return markSeen.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Chat\MessageController::markSeen
* @see app/Http/Controllers/Chat/MessageController.php:115
* @route '/chat/message/seen/{user}'
*/
markSeen.post = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markSeen.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Chat\MessageController::markSeen
* @see app/Http/Controllers/Chat/MessageController.php:115
* @route '/chat/message/seen/{user}'
*/
const markSeenForm = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: markSeen.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Chat\MessageController::markSeen
* @see app/Http/Controllers/Chat/MessageController.php:115
* @route '/chat/message/seen/{user}'
*/
markSeenForm.post = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: markSeen.url(args, options),
    method: 'post',
})

markSeen.form = markSeenForm

const message = {
    loadOlder: Object.assign(loadOlder, loadOlder),
    store: Object.assign(store, store),
    destroy: Object.assign(destroy, destroy),
    markSeen: Object.assign(markSeen, markSeen),
}

export default message