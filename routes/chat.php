<?php

use App\Http\Controllers\Chat\MessageController;
use App\Http\Middleware\HandleChatsRequests;

use Illuminate\Support\Facades\Route;

use Inertia\Inertia;

Route::middleware(['auth', 'verified', HandleChatsRequests::class])->group(function () {
    Route::get('chat', [MessageController::class, 'show'])->name('chat');
    
    Route::get('chat/{user}', [MessageController::class, 'byUser'])->name('chat.user');
    
    Route::get('/chat/message/older/{message}', [MessageController::class, 'loadOlder'])->name('chat.message.loadOlder');
    Route::post('/chat/message', [MessageController::class, 'store'])->name('chat.message.store');
    Route::delete('/chat/message/{message}', [MessageController::class, 'destroy'])->name('chat.message.destroy');
});