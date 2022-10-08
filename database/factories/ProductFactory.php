<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $product = new Product();
        return [
            'name' => $this->faker->name,
            'code' => $product->generateReferenceNumber('code'),
            'cost_price' => $this->faker->numberBetween(2, 5),
            'selling_price' => $this->faker->numberBetween(2, 5),
            'supplier_id' => $this->faker->numberBetween(1, 500),
            'profit' => $this->faker->numberBetween(300, 500),
            'brand' => $this->faker->name,
            'quantity' =>  $this->faker->numberBetween(220, 9099),
            'user_id' => 1,
        ];
    }
}
