
<?php
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Vehicles\VehicleController;
use App\Http\Controllers\Vehicles\VehicleMakeController;
use App\Http\Controllers\Vehicles\VehicleModelController;

Route::middleware(['auth'])->group(function () {
    Route::get('vehicles/makes', [VehicleMakeController::class, 'index']);
    Route::get('vehicles/models', [VehicleModelController::class, 'index']);
    Route::get('vehicles/makes/{make}', [VehicleMakeController::class, 'show']);
    Route::get('vehicles/makes/{make}/models', [VehicleModelController::class, 'byMake']);

    Route::get('vehicles/search', [VehicleController::class, 'search'])->name('vehicles.search');
    Route::get('vehicles/all-from-filters', [VehicleController::class, 'allFromFilters'])->name('vehicles.all-from-filters');
    Route::get('vehicles/filter-counts', [VehicleController::class, 'filterCounts'])->name('vehicles.filter-counts');
    Route::get('vehicles/geocode/{postcode}', [VehicleController::class, 'geocodePostcode'])->name('vehicles.geocode');
    
    // API resource routes for vehicles (CRUD operations)
    Route::apiResource('vehicles', VehicleController::class);
});
