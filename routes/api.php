
<?php
use Illuminate\Support\Facades\Route;

use App\Enum\RolesEnum;
use App\Http\Controllers\Vehicles\VehicleController;
use App\Http\Controllers\Vehicles\VehicleMakeController;
use App\Http\Controllers\Vehicles\VehicleModelController;

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('vehicles/makes', [VehicleMakeController::class, 'index']);
    Route::get('vehicles/models', [VehicleModelController::class, 'index']);
    Route::get('vehicles/makes/{make}', [VehicleMakeController::class, 'show']);
    Route::get('vehicles/makes/{make}/models', [VehicleModelController::class, 'byMake']);

    Route::get('vehicles/search', [VehicleController::class, 'search'])->name('vehicles.search');
    Route::get('vehicles/all-from-filters', [VehicleController::class, 'allFromFilters'])->name('vehicles.all-from-filters');
    Route::get('vehicles/filter-counts', [VehicleController::class, 'filterCounts'])->name('vehicles.filter-counts');
    Route::get('vehicles/geocode/{postcode}', [VehicleController::class, 'geocodePostcode'])->name('vehicles.geocode');
    
    // User's own vehicles
    Route::get('vehicles/my-vehicles', [VehicleController::class, 'myVehicles'])->name('vehicles.my-vehicles');
    Route::patch('vehicles/{vehicle}/status', [VehicleController::class, 'updateStatus'])->name('vehicles.update-status');
    
    // API resource routes for vehicles (CRUD operations)
    Route::apiResource('vehicles', VehicleController::class);
});

// Admin only routes
Route::middleware(['auth:sanctum', 'verified', 'role:' . RolesEnum::Admin->value])->group(function () {
    Route::get('admin/vehicles', [VehicleController::class, 'adminIndex'])->name('admin.vehicles.index');
});
