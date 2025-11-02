import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see routes/web.php:5
* @route '/'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:5
* @route '/'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see routes/web.php:5
* @route '/'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see routes/web.php:5
* @route '/'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see routes/web.php:5
* @route '/'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see routes/web.php:5
* @route '/'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see routes/web.php:5
* @route '/'
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
* @see routes/web.php:13
* @route '/home'
*/
export const auth = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: auth.url(options),
    method: 'get',
})

auth.definition = {
    methods: ["get","head"],
    url: '/home',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:13
* @route '/home'
*/
auth.url = (options?: RouteQueryOptions) => {
    return auth.definition.url + queryParams(options)
}

/**
* @see routes/web.php:13
* @route '/home'
*/
auth.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: auth.url(options),
    method: 'get',
})

/**
* @see routes/web.php:13
* @route '/home'
*/
auth.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: auth.url(options),
    method: 'head',
})

/**
* @see routes/web.php:13
* @route '/home'
*/
const authForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: auth.url(options),
    method: 'get',
})

/**
* @see routes/web.php:13
* @route '/home'
*/
authForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: auth.url(options),
    method: 'get',
})

/**
* @see routes/web.php:13
* @route '/home'
*/
authForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: auth.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

auth.form = authForm

const home = {
    index: Object.assign(index, index),
    auth: Object.assign(auth, auth),
}

export default home