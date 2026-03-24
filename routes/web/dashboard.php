<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Api\AIAnalysisController;

Route::controller(DashboardController::class)->group(function () {

    Route::get('/dashboard', 'index')->name('dashboard');
    Route::post('/analyze', 'store')->name('analyze');
    Route::post('/delete-chat', 'destroy')->name('delete-chat');
    Route::get('/chat-content', 'show')->name('chat-content');
});


Route::controller(AIAnalysisController::class)
    ->group(function () {

    // Nouvelles routes pour l'analyse IA
    Route::get('/analyse', 'index')->name('analyse');
    Route::post('/analyze-ai', 'generateVerdict')->name('analyze-ai');

});
