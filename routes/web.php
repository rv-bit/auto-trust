<?php

use App\Enum\PermissionsEnum;
use App\Enum\RolesEnum;

use App\Http\Controllers\root\RootController;

use App\Http\Controllers\profile\ProfileController;
use App\Http\Controllers\profile\DashboardController;
use App\Http\Controllers\admin\AdminController;

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [RootController::class, 'index'])->name('root');

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('profile.dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::middleware('verified', 'role:' . RolesEnum::Admin->value)->group(function () { // Only verified admins can access these routes
        Route::get('/admin-dashboard', [AdminController::class, 'index'])->name('admin.dashboard');
    });
});

require __DIR__ . '/auth.php';
