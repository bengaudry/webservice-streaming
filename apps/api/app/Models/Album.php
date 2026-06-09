<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Album extends Model
{
    use HasFactory;

    protected $fillable = ['nom', 'date_sortie', 'artiste_id'];

    public function artiste() {
        return $this->belongsTo(Artiste::class);
    }
}
