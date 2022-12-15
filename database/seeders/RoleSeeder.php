<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        $roles = ['Staff', 'Admin'];

        foreach ($roles as $role){
            Role::firstOrCreate(['name' => $role],[
                'name' => $role
            ]);
        }
    }
}
