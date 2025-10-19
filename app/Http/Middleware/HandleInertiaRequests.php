<?php

namespace App\Http\Middleware;


use Inertia\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $COOKIE_PREFIX = config('app.cookie_prefix');

        $sidebar_state = $_COOKIE["{$COOKIE_PREFIX}-sidebar_state"] ?? null;
        $sidebar_state = $sidebar_state === 'true' ? true : ($sidebar_state === 'false' ? false : $sidebar_state);

        $chat_sidebar_state = $_COOKIE["{$COOKIE_PREFIX}-chat_sidebar_state"] ?? null;
        $chat_sidebar_state = $chat_sidebar_state === 'true' ? true : ($chat_sidebar_state === 'false' ? false : $chat_sidebar_state);

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                'user' => $request->user(),
            ],
            'sidebarOpen' => $sidebar_state,
            'chatSidebarOpen' => $chat_sidebar_state,
        ];
    }
}
