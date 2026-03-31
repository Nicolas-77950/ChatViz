<?php

use Illuminate\Support\Facades\Route;

// Controllers réorganisés (Expertises séparées par domaine)
use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\Fichier\FichierController;
use App\Http\Controllers\Analyse\IAController;

/**
 * Routes du tableau de bord (authentifiées).
 * Cette structure allège chaque contrôleur en lui attribuant un domaine métier clair.
 */
Route::middleware(['auth', 'verified'])->group(function () {

    // --- Vue Principale (Dashboard) ---
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // --- Gestion brute des Fichiers (Import, CRUD) ---
    Route::controller(FichierController::class)->group(function () {
        Route::post('/analyze', 'store')->name('analyze');
        Route::post('/delete-chat', 'destroy')->name('delete-chat');
        Route::get('/chat-content', 'show')->name('chat-content');
        Route::post('/update-name', 'updateName')->name('update-name');
    });

    // --- Services d'IA Locale (Analyse Ollama) ---
    Route::controller(IAController::class)->group(function () {
        Route::post('/analyze-ai', 'generateVerdict')->name('analyze-ai');
    });

});
