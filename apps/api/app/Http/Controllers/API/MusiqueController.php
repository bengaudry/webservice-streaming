<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\AchatUtilisateur;
use App\Models\Musique;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MusiqueController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Musique::query();

        // Gérer les includes optionnels
        $includes = array_filter(explode(',', $request->query('include', '')));

        // Ajouter les relations demandées
        if (in_array('album', $includes)) {
            $query->with('album');
        }
        if (in_array('styles', $includes)) {
            $query->with('styles');
        }
        if (in_array('artiste', $includes)) {
            $query->with('artiste');
        }

        return response()->json($query->paginate(50));
    }

    public function index_free(Request $request)
    {
        $query = Musique::filter(['prix' => 0]);

        // Gérer les includes optionnels
        $includes = array_filter(explode(',', $request->query('include', '')));

        // Ajouter les relations demandées
        if (in_array('album', $includes)) {
            $query->with('album');
        }
        if (in_array('styles', $includes)) {
            $query->with('styles');
        }
        if (in_array('artiste', $includes)) {
            $query->with('artiste');
        }

        return response()->json($query->paginate(50));
    }

    public function buy(Request $request)
    {
        $request->validate([
            'musique_id' => 'required|integer',
        ]);

        $musique = Musique::find($request->musique_id);
        $user = Auth::user();

        $achat = AchatUtilisateur::create([
            'user_id' => $user->id,
            'musique_id' => $musique->id,
            'date_achat' => now(),
        ]);

        return response()->json(['success' => true, 'details' => $achat]);
    }

    public function owns(Request $request, int $musique_id)
    {
        $user = Auth::user();
        $musique = Musique::find($musique_id);

        $achat = AchatUtilisateur::where(['user_id' => $user->id, 'musique_id' => $musique->id])->first();

        if (!$achat) {
            return response()->json(['owns' => false]);
        }

        return response()->json(['owns' => true, 'details' => $achat]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, int $id)
    {
        $musique = Musique::findOrFail($id);

        $includes = array_filter(explode(',', $request->query('include', '')));

        $allowedIncludes = ['album', 'styles', 'artiste'];
        $relationsToLoad = array_intersect($includes, $allowedIncludes);

        if (!empty($relationsToLoad)) {
            $musique->load($relationsToLoad);
        }

        return response()->json($musique);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
