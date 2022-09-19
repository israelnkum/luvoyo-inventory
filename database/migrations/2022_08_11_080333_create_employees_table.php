<?php

use App\Models\Department;
use App\Models\Rank;
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
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->string('surname');
            $table->string('other_names');
            $table->string('dob')->nullable();
            $table->string('gender');
            $table->string('telephone');
            $table->string('home_address')->nullable();
            $table->string('id_type')->nullable();
            $table->string('id_number')->nullable();
            $table->text('remarks')->nullable();
            $table->string('email')->unique();
            $table->foreignIdFor(User::class)->constrained();
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
        Schema::dropIfExists('employees');
    }
};
