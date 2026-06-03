<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
        return new UserResource(auth()->user());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:8'
        ]);

        $user = User::create($validated);
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }

    public function login(Request $request) {
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

            // Supprimer les tokens précédents pour éviter les doublons
            $user->tokens()->where('name', 'auth_token')->delete();

            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'access_token' => $token,
                'token_type' => 'Bearer',
            ]);
        }
        catch(QueryException $e) {
            Log::error('Erreur accès base de données');
            return response()->json([
                'message' => 'Ressource indisponible.'], 500);
        }
    }

    public function logout(Request $request) {
        auth()->user()->tokens()->delete();

        return response()->json([
            'message' => 'Déconnecté avec succès'
        ]);
    }
}
