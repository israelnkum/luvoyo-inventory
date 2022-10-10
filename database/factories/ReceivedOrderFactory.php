<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ReceivedOrder>
 */
class ReceivedOrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'invoice_no' => $this->faker->text(10),
            'date' => $this->faker->date,
            'total' => $this->faker->numberBetween(200, 500),
            'user_id' => 1,
            'supplier_id' => $this->faker->numberBetween(1, 500)
        ];
    }
}
