import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Chat\MessageController::getMessagesByPageAndConversation
* @see app/Http/Controllers/Chat/MessageController.php:39
* @route '/chat/messages'
*/
export const getMessagesByPageAndConversation = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getMessagesByPageAndConversation.url(options),
    method: 'get',
})

getMessagesByPageAndConversation.definition = {
    methods: ["get","head"],
    url: '/chat/messages',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Chat\MessageController::getMessagesByPageAndConversation
* @see app/Http/Controllers/Chat/MessageController.php:39
* @route '/chat/messages'
*/
getMessagesByPageAndConversation.url = (options?: RouteQueryOptions) => {
    return getMessagesByPageAndConversation.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Chat\MessageController::getMessagesByPageAndConversation
* @see app/Http/Controllers/Chat/MessageController.php:39
* @route '/chat/messages'
*/
getMessagesByPageAndConversation.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getMessagesByPageAndConversation.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Chat\MessageController::getMessagesByPageAndConversation
* @see app/Http/Controllers/Chat/MessageController.php:39
* @route '/chat/messages'
*/
getMessagesByPageAndConversation.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getMessagesByPageAndConversation.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Chat\MessageController::getMessagesByPageAndConversation
* @see app/Http/Controllers/Chat/MessageController.php:39
* @route '/chat/messages'
*/
const getMessagesByPageAndConversationForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getMessagesByPageAndConversation.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Chat\MessageController::getMessagesByPageAndConversation
* @see app/Http/Controllers/Chat/MessageController.php:39
* @route '/chat/messages'
*/
getMessagesByPageAndConversationForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getMessagesByPageAndConversation.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Chat\MessageController::getMessagesByPageAndConversation
* @see app/Http/Controllers/Chat/MessageController.php:39
* @route '/chat/messages'
*/
getMessagesByPageAndConversationForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getMessagesByPageAndConversation.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

getMessagesByPageAndConversation.form = getMessagesByPageAndConversationForm

const messages = {
    getMessagesByPageAndConversation: Object.assign(getMessagesByPageAndConversation, getMessagesByPageAndConversation),
}

export default messages