<?php

use App\Models\Product;
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
        Schema::create('received_order_items', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Product::class)->constrained();
            $table->integer('qty');
            $table->string('price');
            $table->string('sub_total');
            $table->boolean('damaged')->default(false);
            $table->integer('qty_damaged')->default(0)->nullable();
            $table->integer('damaged_sub_total')->default(0)->nullable();
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
        Schema::dropIfExists('received_order_items');
    }
};
