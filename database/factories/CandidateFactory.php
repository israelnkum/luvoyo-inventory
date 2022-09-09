<?php

namespace Database\Factories;

use App\Models\Candidate;
use App\Models\Election;
use Illuminate\Database\Eloquent\Factories\Factory;

class CandidateFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Candidate::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition(): array
    {
        $election = Election::query()->inRandomOrder()->first();
        $portfolio = $election->portfolios->random()->first()->portfolioId;
        $gender =$this->faker->randomElement(['Male', 'Female']);
        return [
            'title' => $this->faker->title($gender),
            'surName' => $this->faker->name($gender),
            'otherNames' => $this->faker->name($gender),
            'dateOfBirth' => $this->faker->date(),
            'placeOfBirth' => $this->faker->city,
            'gender' => $gender,
            'nationality' => $this->faker->country,
            'homeTown' => $this->faker->city,
            'region' => $this->faker->state,
            'homeAddress' => $this->faker->address,
            'telephone' => $this->faker->phoneNumber,
            'email' => $this->faker->unique()->safeEmail(),
            'faculty' => $this->faker->name,
            'programme' => $this->faker->name,
            'cgpa' => $this->faker->numberBetween(1.0,5.0),
            'year' => $this->faker->year('now'),
            'indexNumber' => $this->faker->userName,
            'hall' => $this->faker->randomElement(['Ahanta','Nzema','Getfund','Ghacem']),
            'portfolioId' => $portfolio,
            'previousPosition'  => 'Ahanta',
            'formerInstitution'  => 'Ahanta',
            'formerPosition'  => '',
            'statementOfPurpose' => $this->faker->realTextBetween(300,350),
            'vision' => $this->faker->realTextBetween(300,350),
            'mission' => $this->faker->realTextBetween(300,350),
            'planOfAction' => $this->faker->realTextBetween(300,350),
            'electionId' => $election->id,
            'isNominee' => 1,
            'vettingScore' => 0,
            'userId' => 'osikaniisrael',
            'cv' => 0,
            'academicRecords'  => 0,
            'payInSlip'  => 0,
            'studentId'  => 0,
            'completed'  => 0,
        ];
    }
}
