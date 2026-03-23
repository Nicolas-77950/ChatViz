<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AIAnalysisController;

Route::post('/analyze-ai', [AIAnalysisController::class, 'generateVerdict']);