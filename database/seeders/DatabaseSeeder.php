<?php

namespace Database\Seeders;

use App\Models\Album;
use App\Models\Artiste;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        $this->call(ArtisteSeeder::class);
        $this->call(AlbumSeeder::class);
        $this->call(MusiqueSeeder::class);
    }
}
