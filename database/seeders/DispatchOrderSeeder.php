<?php

namespace Database\Seeders;

use App\Models\DispatchOrder;
use Illuminate\Database\Seeder;

class DispatchOrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        DispatchOrder::factory()->count(500)->create();
    }
}
