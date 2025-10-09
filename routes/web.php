<?php

use App\Enum\PermissionsEnum;
use App\Enum\RolesEnum;

use App\Http\Controllers\root\RootController;

use App\Http\Controllers\chat\ChatController;
use App\Http\Controllers\profile\ProfileController;
use App\Http\Controllers\profile\DashboardController;
use App\Http\Controllers\admin\AdminController;
use App\Http\Controllers\stripe\CheckoutController;

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [RootController::class, 'index'])->name('root');

// Payments
Route::post('/api/payment/check-products', [CheckoutController::class, "check"])->name('payment.check');
Route::middleware('auth')->group(
    function () {
        Route::post('/payment/checkout', [CheckoutController::class, "checkout"])->name('payment.checkout');
        Route::get('/payment/success', [CheckoutController::class, "success"])->name('payment.success');
    }
);

// Chat
Route::get('/chat', [ChatController::class, 'index'])->name('index');

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
