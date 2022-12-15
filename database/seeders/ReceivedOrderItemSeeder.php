<?php

namespace Database\Seeders;

use App\Models\ReceivedOrderItem;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReceivedOrderItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ReceivedOrderItem::factory()->count(3000)->create();
    }
}
