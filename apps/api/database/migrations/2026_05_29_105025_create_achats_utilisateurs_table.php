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
        Schema::create('achats_utilisateurs', function (Blueprint $table) {
            $table->foreignId("user_id")->constrained("users")->cascadeOnDelete();
            $table->foreignId("musique_id")->constrained("musiques")->cascadeOnDelete();

            $table->dateTime("date_achat")->useCurrent();

            $table->primary(["user_id", "musique_id"]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('achats_utilisateurs');
    }
};
