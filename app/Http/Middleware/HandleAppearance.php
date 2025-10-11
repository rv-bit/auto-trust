<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\View;
use Symfony\Component\HttpFoundation\Response;

class HandleAppearance
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $COOKIE_PREFIX = config('app.cookie_prefix');

        View::share("{$COOKIE_PREFIX}-appearance", $request->cookie("{$COOKIE_PREFIX}-appearance") ?? 'system');

        return $next($request);
    }
}
