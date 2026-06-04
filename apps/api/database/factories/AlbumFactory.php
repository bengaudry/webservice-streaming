<?php

namespace Database\Factories;

use App\Models\Album;
use App\Models\Artiste;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Album>
 */
class AlbumFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nom' => implode(' ', $this->faker->words($this->faker->numberBetween(1, 3))),
            'date_sortie' => $this->faker->date(),
            'artiste_id' => Artiste::inRandomOrder()->firstOrFail()->id,
        ];
    }
}
