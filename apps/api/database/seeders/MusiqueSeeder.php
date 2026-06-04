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
        $types = array_merge(
            array_fill(0, 150, 'free'),
            array_fill(0, 500, 'paid')
        );

        shuffle($types);

        foreach ($types as $type) {
            Musique::factory()->$type()->create();
        }
    }
}
