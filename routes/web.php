<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ContactController; 
use App\Mail\WelcomeEmail; 
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Mail;

Route::get('/', function () {
    return view('welcome');
});

// Inclusion des routes organisées par fonctionnalités
Route::middleware(['auth', 'verified'])->group(function () {
    require __DIR__ . '/web/dashboard.php';
});

// Routes publiques
Route::get('/contact', [ContactController::class, 'index'])->name('contact-us');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

Route::get('/menu', function () { return view('welcome'); })->name('menu');

Route::get('/about', function () {
    return view('about');
})->middleware(['auth', 'verified'])->name('about');
Route::get('/safe-zone', function () { return view('welcome'); })->name('safe-zone');

// Routes protégées par authentification
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::get('/test-mail', function () {
    
    $fakeUser = (object) [
        'name' => 'Développeur ChatViz 🚀',
        'email' => 'email-de-test@example.com' 
    ];

    
    Mail::to($fakeUser->email)->send(new WelcomeEmail($fakeUser));

    return 'Le superbe e-mail de bienvenue a été envoyé ! Vérifie ton tableau de bord Mailtrap.';
});

require __DIR__.'/auth.php';