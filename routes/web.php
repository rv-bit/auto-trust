<?php
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    if (auth()->check()) {
        return redirect()->route('home.auth');
    }
    return Inertia::render('home/page');
})->name('home.index');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('home', function () {
        return Inertia::render('home/auth/page');
    })->name('home.auth');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/chat.php';
require __DIR__ . '/vehicles.php';
require __DIR__ . '/notifications.php';