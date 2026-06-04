<?php

namespace Database\Seeders;

use App\Models\StyleMusique;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StyleMusiqueSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        StyleMusique::factory()
            ->count(7)
            ->sequence(
                ['nom' => 'Rock'],
                ['nom' => 'Pop'],
                ['nom' => 'Rap'],
                ['nom' => 'Jazz'],
                ['nom' => 'Hip-Hop'],
                ['nom' => 'Classique'],
                ['nom' => 'House'],
            )
            ->create();
    }
}
