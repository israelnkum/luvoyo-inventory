<?php

use App\Models\DispatchOrder;
use App\Models\Employee;
use App\Models\Truck;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cash_ups', function (Blueprint $table) {
            $table->id();
            $table->string('ref_id');
            $table->foreignIdFor(Truck::class)->constrained();
            $table->foreignIdFor(Employee::class)->constrained();
            $table->foreignIdFor(DispatchOrder::class)->constrained();
            $table->string('expected_amount');
            $table->string('received_amount');
            $table->string('balance');
            $table->dateTime('date_time');
            $table->foreignIdFor(User::class)->constrained();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cash_ups');
    }
};
