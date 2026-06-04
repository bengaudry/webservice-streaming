<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class StyleMusique extends Model
{
    use HasFactory;

    protected $table = "styles_musique";
    public $timestamps = false;
}
