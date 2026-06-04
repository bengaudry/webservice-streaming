<?php

namespace Database\Seeders;

use App\Models\Musique;
use Illuminate\Database\Seeder;

class MusiqueSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Musique::factory(500)->free()->create();
        Musique::factory(1500)->paid()->create();
    }
}
