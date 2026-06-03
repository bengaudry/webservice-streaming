<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StylesAssociesMusique extends Model
{
    protected $table = "styles_associes_musique";
    protected $fillable = ['style_id', 'musique_id'];
}
