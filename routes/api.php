<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Vehicles\VehicleController;
use App\Http\Controllers\Vehicles\VehicleMakeController;
use App\Http\Controllers\Vehicles\VehicleModelController;

Route::get('vehicles/search', [VehicleController::class, 'search']);
Route::get('vehicles/makes', [VehicleMakeController::class, 'index']);
Route::get('vehicles/makes/{make}/models', [VehicleModelController::class, 'byMake']);
Route::get('vehicles/makes/{make}', [VehicleMakeController::class, 'show']);
Route::get('vehicles/models', [VehicleModelController::class, 'index']);

Route::apiResource('vehicles', VehicleController::class);
