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
    public function definition()
    {
        $cashUp = new Cashup();
        return [
            'ref_id' => $cashUp->generateReferenceNumber('ref_id'),
            'dispatch_order_id',
            'expected_amount',
            'received_amount',
            'balance',
            'date_time' => $this->faker->dateTimeBetween('2005-01-01'),
            'user_id'=> User::first()->id
        ];
    }
}
