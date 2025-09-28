<?php

namespace App\Http\Middleware;

use App\Http\Resources\user\AuthUserResource;

use Illuminate\Http\Request;

use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $COOKIE_PREFIX = config('app.cookie_prefix');

        // Use raw cookies 
        $sidebar_state = $_COOKIE["{$COOKIE_PREFIX}-sidebar_state"] ?? null;
        $theme_state = $_COOKIE["{$COOKIE_PREFIX}-theme_state"] ?? null;

        // Handle boolean conversion
        $sidebar_state = $sidebar_state === 'true' ? true : ($sidebar_state === 'false' ? false : $sidebar_state);
        $theme_state = $theme_state === 'true' ? true : ($theme_state === 'false' ? false : $theme_state);

        return array_merge(
            parent::share($request),
            [
                'flash' => [
                    'message' => fn() => $request->session()->get('message')
                ],
                'auth' => [
                    'user' => $request->user() ? new AuthUserResource($request->user()) : null,
                ],
                'ziggy' => fn() => [
                    ...(new Ziggy)->toArray(),
                    'location' => $request->url(),
                ],
                'cookies' => [
                    'sidebar_state' => $sidebar_state,
                    'theme_state' => $theme_state,
                ],
            ]
        );
    }
}
