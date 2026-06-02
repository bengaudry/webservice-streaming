<?php

use App\Http\Controllers\UserController;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\ValidationException;

// routes protégées
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [UserController::class, 'show']);
    Route::post('/user/logout', [UserController::class, 'logout']);
});

# authentification
Route::post('/login', function(Request $request) {
    $request->validate([
        'email' => 'required|email|max:50',
        'password' => 'required|string|min:8',
    ]);
    try {
        $user = User::where('email', $request->email)->first();
        if(!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => 'The provided credentials are erroneous.'
            ]);
        }
        return $user->createToken('auth_token')->plainTextToken;
    }
    catch(\Illuminate\Database\QueryException $e) {
        Log::error('Erreur accès base de données');
        return response()->json([
            'message' => 'Ressource indisponible.'], 500);
    }
});

Route::post('/user/create', [UserController::class, 'store']);
