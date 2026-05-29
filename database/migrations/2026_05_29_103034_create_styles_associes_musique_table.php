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
        Schema::create('styles_associes_musique', function (Blueprint $table) {
            $table->foreignId("musique_id")->constrained("Musique")->cascadeOnDelete();
            $table->foreignId("style_id")->constrained("Style")->cascadeOnDelete();

            $table->primary(["musique_id", "style_id"]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('styles_associes_musique');
    }
};
