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
    public function definition()
    {
        $product = new Product();
        return [
            'name' => $this->faker->name,
            'code' => $product->generateReferenceNumber('code'),
            'cost_price' => $this->faker->numberBetween(2, 5),
            'selling_price' => $this->faker->numberBetween(2, 5),
            'supplier_id' => $this->faker->numberBetween(1, 500),
            'profit',
            'brand',
            'quantity',
            'user_id',
        ];
    }
}
