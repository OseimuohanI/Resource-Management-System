<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckSubscriptionAccess
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->user() && !$request->user()->canAccessResources()) {
            return redirect()->route('pricing')->with('message', 'Please upgrade your plan to access resources.');
        }

        return $next($request);
    }
}
