<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AchatUtilisateur extends Model
{
    protected $table = "achats_utilisateurs";
    protected $fillable = ['user_id', 'musique_id', 'date_achat'];

    public $timestamps = false;
}
