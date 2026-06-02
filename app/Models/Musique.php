<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Musique extends Model
{
    /**
     * Scope pour filtrer les musiques
     */
    public function scopeFilter($query, $filters = [])
    {
        foreach ($filters as $key => $value) {
            $query->where($key, $value);
        }
        return $query;
    }
}
