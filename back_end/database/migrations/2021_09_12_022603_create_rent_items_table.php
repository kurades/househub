<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRentItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('rent_items', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('userID');
            $table->bigInteger('price');
            $table->string('type');
            $table->string('name');
            $table->string('imageAddress1');
            $table->string('imageAddress2');
            $table->string('imageAddress3');
            $table->string('address');
            $table->string('province');
            $table->string('description');
            $table->foreign('userID')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('rent_items');
    }
}
