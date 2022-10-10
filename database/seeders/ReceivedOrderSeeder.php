<?php

namespace Database\Seeders;

use App\Models\ReceivedOrder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReceivedOrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        ReceivedOrder::factory()->count(500)->create();
    }
}
