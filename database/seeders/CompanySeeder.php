<?php

namespace Database\Seeders;

use App\Models\Company;
use Illuminate\Database\Seeder;

class CompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Company::updateOrCreate(['name' => 'LOXION BUSINESS'],[
            'phone_number' => '0213608075',
            'address' => 'ASLA Business Park, Unit 7 Apex Park, Somerset',
            'email' => 'info@lexionbusiness.com'
        ]);
    }
}
