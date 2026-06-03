<?php

use App\Http\Controllers\API\AlbumController;
use App\Http\Controllers\API\ArtisteController;
use App\Http\Controllers\API\MusiqueController;
use App\Http\Controllers\API\UserController;
use App\Models\AchatUtilisateur;
use App\Models\Musique;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// routes protégées
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [UserController::class, 'show']);
    Route::post('/user/logout', [UserController::class, 'logout']);

    # achat de musique
    Route::post("/musics/buy", function (Request $request) {
       $request->validate([
           'musique_id' => 'required|integer',
       ]);

       $musique = Musique::find($request->musique_id);
       $user = Auth::user();

       AchatUtilisateur::create([
           'user_id' => $user->id,
           'musique_id' => $musique->id,
           'date_achat' => now(),
       ]);
    });
});

# musiques
Route::get("/musics", [MusiqueController::class, 'index']);
Route::get("/musics/free", [MusiqueController::class, 'index_free']);

# albums
Route::get("/albums", [AlbumController::class, 'index']);

# artistes
Route::get("/artists", [ArtisteController::class, 'index']);

# authentification
Route::post('/login', [UserController::class, 'login']);
Route::post('/user/create', [UserController::class, 'store']);
