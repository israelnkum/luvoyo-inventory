<?php

namespace Database\Seeders;

use App\Models\DispatchOrder;
use App\Models\TerminationReason;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            UserSeeder::class,
            RoleSeeder::class,
            CompanySeeder::class,
//            ExpenseSeeder::class,
            DispatchOrderSeeder::class,
            CashUpSeeder::class
        ]);
    }
}
