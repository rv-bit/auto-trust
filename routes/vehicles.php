<?php

use App\Enum\VehicleListingsEnum;

use App\Http\Middleware\HandleVehicleRequests;

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified', HandleVehicleRequests::class])->group(function () {
    Route::get('vehicles/dashboard', function () {
        return Inertia::render('vehicles/showroom/page');
    })->name('vehicles.dashboard');
});

Route::get('vehicles/{listing}', function (string $listing) {
    // Lazily import the enum
    $enumClass = VehicleListingsEnum::class;

    // Check if the provided listing value exists in the enum
    if (!in_array($listing, array_column($enumClass::cases(), 'value'), true)) {
        abort(404);
    }

    return Inertia::render('vehicles/listings/page', [
        'listing' => $listing,
    ]);
})->name('vehicles.listing');