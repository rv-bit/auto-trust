<?php

use App\Enum\VehicleListingsEnum;

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('home/page');
})->name('home');

Route::get('vehicles/{listing}', function (string $listing) {
    // Lazily import the enum
    $enumClass = VehicleListingsEnum::class;

    // Check if the provided listing value exists in the enum
    if (!in_array($listing, array_column($enumClass::cases(), 'value'), true)) {
        abort(404);
    }

    return Inertia::render('vehicles/listing/page', [
        'listing' => $listing,
    ]);
})->name('vehicles.listing');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard/page');
    })->name('dashboard');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/chat.php';
require __DIR__ . '/notifications.php';