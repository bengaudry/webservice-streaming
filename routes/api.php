<?php

use App\Http\Controllers\MusiqueController;
use App\Http\Controllers\UserController;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\ValidationException;

// routes protégées
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [UserController::class, 'show']);
    Route::post('/user/logout', [UserController::class, 'logout']);
});

Route::get("/musics", [MusiqueController::class, 'index']);
Route::get("/musics/free", [MusiqueController::class, 'index_free']);

# authentification
Route::post('/login', [UserController::class, 'login']);
Route::post('/user/create', [UserController::class, 'store']);
