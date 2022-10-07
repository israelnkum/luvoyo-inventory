<?php

namespace Database\Factories;

use App\Models\Cashup;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Cashup>
 */
class CashUpFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $cashUp = new Cashup();
        return [
            'ref_id' => $cashUp->generateReferenceNumber('ref_id'),
            'dispatch_order_id' => $this->faker->numberBetween(1, 500),
            'expected_amount'=> $this->faker->numberBetween(100, 5000),
            'received_amount' => $this->faker->numberBetween(100, 5000),
            'balance' => $this->faker->numberBetween(100, 5000),
            'date_time' => $this->faker->dateTimeBetween('2005-01-01'),
            'user_id'=> User::first()->id
        ];
    }
}
