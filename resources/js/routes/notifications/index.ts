import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\NotificationController::index
* @see app/Http/Controllers/NotificationController.php:15
* @route '/notifications'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/notifications',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\NotificationController::index
* @see app/Http/Controllers/NotificationController.php:15
* @route '/notifications'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\NotificationController::index
* @see app/Http/Controllers/NotificationController.php:15
* @route '/notifications'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\NotificationController::index
* @see app/Http/Controllers/NotificationController.php:15
* @route '/notifications'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\NotificationController::index
* @see app/Http/Controllers/NotificationController.php:15
* @route '/notifications'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\NotificationController::index
* @see app/Http/Controllers/NotificationController.php:15
* @route '/notifications'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\NotificationController::index
* @see app/Http/Controllers/NotificationController.php:15
* @route '/notifications'
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
* @see \App\Http\Controllers\NotificationController::store
* @see app/Http/Controllers/NotificationController.php:42
* @route '/notifications'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/notifications',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\NotificationController::store
* @see app/Http/Controllers/NotificationController.php:42
* @route '/notifications'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\NotificationController::store
* @see app/Http/Controllers/NotificationController.php:42
* @route '/notifications'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\NotificationController::store
* @see app/Http/Controllers/NotificationController.php:42
* @route '/notifications'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\NotificationController::store
* @see app/Http/Controllers/NotificationController.php:42
* @route '/notifications'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\NotificationController::markAllSeen
* @see app/Http/Controllers/NotificationController.php:35
* @route '/notifications/mark-all-seen'
*/
export const markAllSeen = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markAllSeen.url(options),
    method: 'post',
})

markAllSeen.definition = {
    methods: ["post"],
    url: '/notifications/mark-all-seen',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\NotificationController::markAllSeen
* @see app/Http/Controllers/NotificationController.php:35
* @route '/notifications/mark-all-seen'
*/
markAllSeen.url = (options?: RouteQueryOptions) => {
    return markAllSeen.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\NotificationController::markAllSeen
* @see app/Http/Controllers/NotificationController.php:35
* @route '/notifications/mark-all-seen'
*/
markAllSeen.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markAllSeen.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\NotificationController::markAllSeen
* @see app/Http/Controllers/NotificationController.php:35
* @route '/notifications/mark-all-seen'
*/
const markAllSeenForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: markAllSeen.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\NotificationController::markAllSeen
* @see app/Http/Controllers/NotificationController.php:35
* @route '/notifications/mark-all-seen'
*/
markAllSeenForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: markAllSeen.url(options),
    method: 'post',
})

markAllSeen.form = markAllSeenForm

/**
* @see \App\Http\Controllers\NotificationController::markSeen
* @see app/Http/Controllers/NotificationController.php:22
* @route '/notifications/{notification}/mark-seen'
*/
export const markSeen = (args: { notification: string | number } | [notification: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markSeen.url(args, options),
    method: 'post',
})

markSeen.definition = {
    methods: ["post"],
    url: '/notifications/{notification}/mark-seen',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\NotificationController::markSeen
* @see app/Http/Controllers/NotificationController.php:22
* @route '/notifications/{notification}/mark-seen'
*/
markSeen.url = (args: { notification: string | number } | [notification: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { notification: args }
    }

    if (Array.isArray(args)) {
        args = {
            notification: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        notification: args.notification,
    }

    return markSeen.definition.url
            .replace('{notification}', parsedArgs.notification.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\NotificationController::markSeen
* @see app/Http/Controllers/NotificationController.php:22
* @route '/notifications/{notification}/mark-seen'
*/
markSeen.post = (args: { notification: string | number } | [notification: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markSeen.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\NotificationController::markSeen
* @see app/Http/Controllers/NotificationController.php:22
* @route '/notifications/{notification}/mark-seen'
*/
const markSeenForm = (args: { notification: string | number } | [notification: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: markSeen.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\NotificationController::markSeen
* @see app/Http/Controllers/NotificationController.php:22
* @route '/notifications/{notification}/mark-seen'
*/
markSeenForm.post = (args: { notification: string | number } | [notification: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: markSeen.url(args, options),
    method: 'post',
})

markSeen.form = markSeenForm

const notifications = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    markAllSeen: Object.assign(markAllSeen, markAllSeen),
    markSeen: Object.assign(markSeen, markSeen),
}

export default notifications