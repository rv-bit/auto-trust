<?php

use App\Enum\VehicleListingsEnum;

use App\Http\Controllers\Vehicles\VehicleController;
use App\Http\Middleware\HandleVehicleRequests;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use Inertia\Inertia;

Route::middleware(['auth', HandleVehicleRequests::class])->group(function () {
    Route::get('vehicles/dashboard', function () {
        return Inertia::render('vehicles/dashboard/page');
    })->name('vehicles.dashboard');
    
    Route::get('vehicles/stock-cars', function (Request $request) {
        // Render the main listings index page, passing all filters as props
        return Inertia::render('vehicles/stock/page', array_merge([
            'title' => 'Stock Cars',
        ], $request->all()));
    })->name('vehicles.stock-cars');

    // Vehicle details page (must come before {listing} route)
    Route::get('vehicles/details/{id}', [VehicleController::class, 'showPage'])
        ->name('vehicles.details');

    Route::get('vehicles/{listing}', function (string $listing) {
        // Lazily import the enum
        $enumClass = VehicleListingsEnum::class;
    
        // Check if the provided listing value exists in the enum
        if (!in_array($listing, array_column($enumClass::cases(), 'value'), true)) {
            abort(404);
        }
    
        return Inertia::render('vehicles/stock/page', [
            'title' => ucfirst(str_replace('-', ' ', $listing)) ,
            'listing' => $listing,
        ]);
    })->name('vehicles.listing');

});