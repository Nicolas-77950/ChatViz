<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::post('/analyze', [DashboardController::class, 'store'])->name('analyze');
    Route::post('/delete-chat', [DashboardController::class, 'destroy'])->name('delete-chat');
    Route::get('/chat-content', [DashboardController::class, 'show'])->name('chat-content');
});
