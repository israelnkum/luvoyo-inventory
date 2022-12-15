<?php

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
        Schema::create('dispatch_orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_no');
            $table->foreignIdFor(Truck::class)->constrained();
            $table->string('total');
            $table->string('qty');
            $table->dateTime('date_time');
            $table->time('return_time')->nullable();
            $table->foreignIdFor(Employee::class);
            $table->foreignIdFor(User::class);
            $table->softDeletes();
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
        Schema::dropIfExists('dispatch_orders');
    }
};
