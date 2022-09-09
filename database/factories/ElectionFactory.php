<?php

namespace Database\Factories;

use App\Models\Election;
use App\Models\Group;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

class ElectionFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Election::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition(): array
    {
        return [
            'groupId' => Group::query()->inRandomOrder()->first()->id,
            'name' => $this->faker->name,
            'startTime' => Carbon::now(),
            'endTime' => Carbon::tomorrow(),
            'userId' => User::query()->inRandomOrder()->first()->id,
        ];
    }
}
