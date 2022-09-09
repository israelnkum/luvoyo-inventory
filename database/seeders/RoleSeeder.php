<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $roles = [
            'Super Admin','Admin'
        ];

        foreach ($roles as $role){
            Role::firstOrCreate(['name' => $role],[
                'name' => $role
            ]);
        }
    }
}
