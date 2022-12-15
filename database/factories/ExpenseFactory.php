<?php

namespace Database\Factories;

use App\Models\Expense;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Expense>
 */
class ExpenseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $expense = new Expense();
        return [
            'transaction_no' => $expense->generateReferenceNumber('transaction_no'),
            'category' => $this->faker->randomElement(['Fuel', 'Salary', 'Utility', 'Bills']),
            'date_time' => $this->faker->dateTimeBetween('2005-01-01'),
            'amount' => $this->faker->numberBetween(500,10000),
            'description' => $this->faker->realText(50),
            'user_id'=> User::first()->id
        ];
    }
}
