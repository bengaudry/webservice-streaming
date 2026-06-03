<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Musique extends Model
{
    use HasFactory;

    protected $fillable = ['nom', 'duree_secondes', 'prix', 'album_id'];

    public function scopeFilter($query, $filters = [])
    {
        foreach ($filters as $key => $value) {
            $query->where($key, $value);
        }
        return $query;
    }

    public function album() {
        return $this->belongsTo(Album::class);
    }

    public function styles() {
        return $this->belongsToMany(StyleMusique::class, 'styles_associes_musique', 'musique_id', 'style_id');
    }
}
