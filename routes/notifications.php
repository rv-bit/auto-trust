<?php

use App\Http\Controllers\NotificationController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->group(function () {
    Route::get('/notifications', [NotificationController::class, 'index'])->name('notifications.index');
    Route::post('/notifications', [NotificationController::class, 'store'])->name('notifications.store');
    Route::post('/notifications/mark-all-seen', [NotificationController::class, 'markAllSeen'])->name('notifications.markAllSeen');
    Route::post('/notifications/{notification}/mark-seen', [NotificationController::class, 'markSeen'])->name('notifications.markSeen');
});
