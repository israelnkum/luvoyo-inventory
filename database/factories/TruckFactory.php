<?php

namespace Database\Factories;

use App\Models\Truck;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Truck>
 */
class TruckFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'truck_code' => 'TAA112'.$this->faker->randomDigit(),
            'vehicle_type' => $this->faker->firstName,
            'vin_number' => $this->faker->numberBetween(1000, 9000),
            'license_plate' => $this->faker->name,
            'description' => $this->faker->realText(100),
            'user_id' => 1
        ];
    }
}
