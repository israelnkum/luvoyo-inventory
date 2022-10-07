<?php

namespace Database\Factories;

use App\Models\DispatchOrder;
use App\Models\Employee;
use App\Models\Truck;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DispatchOrder>
 */
class DispatchOrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $order = new DispatchOrder();
        return [
            'order_no' => $order->generateReferenceNumber('order_no'),
            'truck_id' => Truck::first()->id,
            'total' => $this->faker->numberBetween(200, 1000),
            'qty' => $this->faker->numberBetween(50, 100),
            'date_time'  => $this->faker->dateTimeBetween('2005-01-01'),
            'return_time' => $this->faker->time,
            'employee_id' => Employee::first()->id,
            'user_id' => User::first()->id
        ];
    }
}
