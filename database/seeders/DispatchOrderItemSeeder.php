<?php

namespace Database\Seeders;

use App\Models\DispatchOrder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DispatchOrderItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DispatchOrder::factory()->count(1000)->create();
    }
}
