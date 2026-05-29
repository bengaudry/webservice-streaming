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
        Schema::create('musiques', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string("nom");
            $table->integer("duree_secondes");
            $table->decimal("prix", 6, 2);
            $table->foreignId("album_id")->constrained();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('musiques');
    }
};
