<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DispatchOrderItem>
 */
class DispatchOrderItemFactory extends Factory
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
            'product_id' => $this->faker->numberBetween(1, 500),
            'selling_price' => $price,
            'dispatch_order_id' => $this->faker->numberBetween(1, 500),
            'qty' => $qty,
            'sub_total' => $price * $qty,
        ];
    }
}
