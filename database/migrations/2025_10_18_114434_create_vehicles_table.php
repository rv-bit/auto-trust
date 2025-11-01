<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('vehicles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('make_id')->constrained('vehicle_makes');
            $table->foreignId('model_id')->constrained('vehicle_models');
            $table->foreignId('seller_id')->constrained('users')->cascadeOnDelete();

            $table->enum('body_style', ['suv', 'hatchback', 'saloon', 'estate', 'coupe', 'mpv', 'convertible']);
            $table->enum('fuel_type', ['petrol', 'hybrid', 'diesel', 'electric']);
            $table->enum('gearbox', ['automatic', 'manual']);
            $table->enum('color', ['black', 'blue', 'brown', 'gold', 'green', 'grey', 'multi_colour', 'orange', 'beige']);

            $table->integer('year');
            $table->integer('mileage');
            $table->integer('price');
            $table->integer('doors');
            $table->integer('seats')->nullable();

            $table->string('boot_space')->nullable();
            $table->string('engine')->nullable();

            $table->decimal('latitude', 10, 8)->nullable();
            $table->decimal('longitude', 11, 8)->nullable();
            $table->string('postcode');

            $table->json('extras')->nullable();
            $table->json('specification')->nullable();

            $table->integer('safety_rating')->nullable();
            $table->json('images')->nullable();

            $table->enum('status', ['active', 'sold', 'inactive'])->default('active');
            $table->enum('condition', ['new', 'used', 'nearly-new'])->default('used');

            $table->softDeletes();
            $table->timestamps();

            // Indexes for performance
            $table->index('make_id');
            $table->index('model_id');
            $table->index('seller_id');
            $table->index('price');
            $table->index('year');
            $table->index('postcode');
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehicles');
    }
};
