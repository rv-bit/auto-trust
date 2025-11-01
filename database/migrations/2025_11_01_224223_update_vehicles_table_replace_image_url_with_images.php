<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Add new images column if it doesn't exist
        if (!Schema::hasColumn('vehicles', 'images')) {
            Schema::table('vehicles', function (Blueprint $table) {
                $table->json('images')->nullable()->after('safety_rating');
            });
        }
        
        // Add condition column if it doesn't exist
        if (!Schema::hasColumn('vehicles', 'condition')) {
            Schema::table('vehicles', function (Blueprint $table) {
                $table->enum('condition', ['new', 'used', 'nearly-new'])->default('used')->after('status');
            });
        }

        // Migrate existing image_url data to images array
        if (Schema::hasColumn('vehicles', 'image_url')) {
            DB::table('vehicles')->whereNotNull('image_url')->get()->each(function ($vehicle) {
                DB::table('vehicles')
                    ->where('id', $vehicle->id)
                    ->update([
                        'images' => json_encode([$vehicle->image_url])
                    ]);
            });
        }

        // Drop old image_url column if it exists
        if (Schema::hasColumn('vehicles', 'image_url')) {
            Schema::table('vehicles', function (Blueprint $table) {
                $table->dropColumn('image_url');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('vehicles', function (Blueprint $table) {
            // Add back image_url column
            $table->string('image_url')->nullable()->after('safety_rating');
        });

        // Migrate first image from images array back to image_url
        DB::table('vehicles')->whereNotNull('images')->get()->each(function ($vehicle) {
            $images = json_decode($vehicle->images, true);
            if (is_array($images) && count($images) > 0) {
                DB::table('vehicles')
                    ->where('id', $vehicle->id)
                    ->update([
                        'image_url' => $images[0]
                    ]);
            }
        });

        // Drop images column
        Schema::table('vehicles', function (Blueprint $table) {
            $table->dropColumn('images');
            
            // Drop condition column if reverting
            if (Schema::hasColumn('vehicles', 'condition')) {
                $table->dropColumn('condition');
            }
        });
    }
};
