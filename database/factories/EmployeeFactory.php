<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Employee>
 */
class EmployeeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'surname' => $this->faker->lastName,
            'email' => $this->faker->safeEmail,
            'other_names' => $this->faker->lastName,
            'dob' => $this->faker->date,
            'gender' => $this->faker->randomElement(['Male', 'Female']),
            'telephone' => $this->faker->phoneNumber,
            'home_address' => $this->faker->streetAddress,
            'id_type' => $this->faker->lastName,
            'id_number' => $this->faker->numberBetween(5000, 92000),
            'remarks' => $this->faker->text(50),
            'user_id' => 1,
        ];
    }
}
