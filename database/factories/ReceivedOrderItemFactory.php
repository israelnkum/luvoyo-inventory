<?php

namespace Database\Factories;

use App\Models\ReceivedOrderItem;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ReceivedOrderItem>
 */
class ReceivedOrderItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $qty = $this->faker->numberBetween(1, 500);
        $price =$this->faker->numberBetween(2, 60);
        return [
            'received_order_id' => $this->faker->numberBetween(1, 500),
            'product_id' => $this->faker->numberBetween(1, 500),
            'qty' => $qty,
            'price' => $price,
            'sub_total' => $price * $qty,
            'damaged' => 0,
            'qty_damaged' => 0,
            'damaged_sub_total' => 0,
        ];
    }
}
