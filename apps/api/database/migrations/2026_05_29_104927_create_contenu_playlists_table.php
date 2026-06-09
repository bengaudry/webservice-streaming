<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('contenu_playlists', function (Blueprint $table) {
            $table->foreignId("musique_id")->constrained("musiques")->cascadeOnDelete();
            $table->foreignId("playlist_id")->constrained("playlists")->cascadeOnDelete();

            $table->primary(["musique_id", "playlist_id"]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contenu_playlists');
    }
};
