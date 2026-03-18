<?php

use App\Http\Controllers\Api\AIAnalysisController;

//Route::middleware('auth:sanctum')->post('/analyze-ai', [AIAnalysisController::class, 'generateVerdict']);

Route::get('/analyze-ai', [AIAnalysisController::class, 'generateVerdict']);