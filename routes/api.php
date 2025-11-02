
<?php
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Vehicles\VehicleController;
use App\Http\Controllers\Vehicles\VehicleMakeController;
use App\Http\Controllers\Vehicles\VehicleModelController;

Route::get('vehicles/makes', [VehicleMakeController::class, 'index']);
Route::get('vehicles/models', [VehicleModelController::class, 'index']);
Route::get('vehicles/makes/{make}', [VehicleMakeController::class, 'show']);
Route::get('vehicles/makes/{make}/models', [VehicleModelController::class, 'byMake']);

Route::get('vehicles/search', [VehicleController::class, 'search']);
Route::get('vehicles/all-from-filters', [VehicleController::class, 'allFromFilters']);
Route::get('vehicles/filter-counts', [VehicleController::class, 'filterCounts']);
Route::get('vehicles/geocode', [VehicleController::class, 'geocodePostcode']);

Route::apiResource('vehicles', VehicleController::class);
