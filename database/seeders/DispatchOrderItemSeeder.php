<?php

namespace Database\Seeders;

use App\Models\DispatchOrderItem;
use Illuminate\Database\Seeder;

class DispatchOrderItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        DispatchOrderItem::factory()->count(2000)->create();
    }
}
