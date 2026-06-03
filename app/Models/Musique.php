<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

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

    public function album(): BelongsTo {
        return $this->belongsTo(Album::class);
    }

    public function artiste(): BelongsTo {
        return $this->belongsTo(Artiste::class);
    }

    public function styles(): BelongsToMany {
        return $this->belongsToMany(StyleMusique::class, 'styles_associes_musique', 'musique_id', 'style_id');
    }
}
