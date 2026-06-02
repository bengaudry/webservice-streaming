<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;

class ApiAuthenticate extends Middleware
{
    /**
     * Handle an unauthenticated user - for API only
     */
    protected function unauthenticated($request, array $guards)
    {
        return response()->json(['message' => 'Unauthenticated.'], 401);
    }
}

