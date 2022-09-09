<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       $user = User::updateOrcreate([ 'username' => 'techlineafrica'],[
            'firstName' => 'Techline',
            'lastName' => 'Africa',
            'username' => 'techlineafrica',
            'email' => 'info@techlineafrica.com',
            'password' => Hash::make('techlineafrica'),
            'phoneNumber' => '0249051415',
        ]);


        $role = Role::firstOrCreate(['name' => 'Admin'])->first();

        $user->roles()->attach($role->id);
    }
}
