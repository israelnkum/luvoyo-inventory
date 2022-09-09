<?php

namespace Database\Factories;

use App\Models\Group;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class GroupFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Group::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition(): array
    {
        $userId =  Str::random(10);
        return [
            'groupName' => $this->faker->name,
            'userId' => $userId
        ];
    }
}
