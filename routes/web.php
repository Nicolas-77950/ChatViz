<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ContactController; 
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});


Route::get('/contact', [ContactController::class, 'index'])->name('contact.index');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');


require __DIR__ . '/web/dashboard.php';

Route::get('/menu', function () { return view('welcome'); })->name('menu');
Route::get('/a-propos', function () { return view('welcome'); })->name('about');
Route::get('/safe-zone', function () { return view('welcome'); })->name('safe-zone');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';