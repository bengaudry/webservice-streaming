<?php

namespace Database\Factories;

use App\Models\Album;
use App\Models\Musique;
use App\Models\StyleMusique;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Musique>
 */
class MusiqueFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $album = Album::inRandomOrder()->firstOrFail();
        return [
            'nom' => implode(' ', $this->faker->words($this->faker->numberBetween(1, 3))),
            'duree_secondes' => $this->faker->numberBetween(30, 600),
            'prix' => $this->faker->randomFloat(2, 0, 10),
            'album_id' => $album->id,
            'artiste_id' => $album->artiste_id,
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function (Musique $musique) {
            $styles = StyleMusique::inRandomOrder()
                ->limit($this->faker->numberBetween(1, 3))
                ->pluck('id');
            $musique->styles()->attach($styles);
        });
    }

    /**
     * État pour les musiques gratuites
     */
    public function free(): static
    {
        return $this->state(fn (array $attributes) => [
            'prix' => 0,
        ]);
    }

    /**
     * État pour les musiques payantes
     */
    public function paid(): static
    {
        return $this->state(fn (array $attributes) => [
            'prix' => $this->faker->randomFloat(2, 0.99, 9.99),
        ]);
    }
}
