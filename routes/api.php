<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// routes protégées
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});
