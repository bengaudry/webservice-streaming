<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Musique;
use Illuminate\Http\Request;

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
    public function show(string $id)
    {
        //
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
