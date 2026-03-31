<?php

namespace App\Http\Controllers\Analyse;

use App\Http\Controllers\Controller;
use App\DTOs\Analyse\AnalyseIADTO;
use App\Actions\Analyse\IA\Amour\GenererVerdictAmourAction;
use App\Actions\Analyse\IA\Engagement\GenererVerdictEngagementAction;
use App\Http\Requests\Analyse\AnalyseIARequest;

/**
 * IAController
 */
class IAController extends Controller
{
    public function generateVerdict(AnalyseIARequest $request)
    {
        $dto = AnalyseIADTO::depuisRequete($request);

        // Sélection par simple chaîne de caractères (plus compréhensible)
        $action = match($dto->typeAnalyse) {
            'amour' => app(GenererVerdictAmourAction::class),
            'engagement' => app(GenererVerdictEngagementAction::class),
            default => null
        };

        if (!$action) {
            return response()->json(['error' => 'Analyse inconnue.'], 400);
        }

        try {
            $resultat = $action->execute($dto);
            return response()->json($resultat);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
