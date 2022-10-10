<?php

namespace Database\Seeders;

use App\Models\CashUp;
use Illuminate\Database\Seeder;

class CashUpSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        CashUp::factory()->count(500)->create();
    }
}
