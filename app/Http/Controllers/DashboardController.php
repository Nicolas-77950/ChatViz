<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\DTOs\AnalyseFichierDTO;
use App\DTOs\SuppressionFichierDTO;
use App\Actions\Dashboard\RecupererFichiersRecentsAction;
use App\Actions\Dashboard\EnregistrerFichierChatAction;
use App\Actions\Dashboard\SupprimerFichierChatAction;
use App\Actions\Dashboard\LireContenuFichierAction;
use App\DTOs\FichierHistoriqueDTO;

class DashboardController extends Controller
{
    /**
     * Affiche l'historique récent des importations.
     */
    public function index(RecupererFichiersRecentsAction $action)
    {
        $fichiers = $action->execute();

        return view('pages.dashboard.index', ['files' => $fichiers]);
    }

    /**
     * Enregistre un nouveau fichier via son DTO.
     */
    public function store(Request $request, EnregistrerFichierChatAction $action)
    {
        $dto = AnalyseFichierDTO::depuisRequete($request);
        $action->execute($dto);

        if ($request->wantsJson()) {
            return response()->json(['message' => 'Fichier enregistré avec succès.'], 200);
        }

        return redirect()->route('dashboard')->with('success', 'Fichier prêt pour l\'analyse.');
    }

    /**
     * Supprime un fichier d'analyse de façon sécurisée.
     */
    public function destroy(Request $request, SupprimerFichierChatAction $action)
    {
        $dto = SuppressionFichierDTO::depuisRequete($request);

        if ($action->execute($dto)) {
            return back()->with('success', 'Historique nettoyé avec succès.');
        }

        return back()->with('error', 'Action non autorisée sur ce fichier.');
    }

    /**
     * Retourne le contenu d'un fichier chat pour relecture/analyse.
     */
    public function show(Request $request, LireContenuFichierAction $action)
    {
        $dto = FichierHistoriqueDTO::depuisRequete($request);
        $contenu = $action->execute($dto);

        if ($contenu === null) {
            return response()->json(['error' => 'Fichier non trouvé.'], 404);
        }

        return response($contenu, 200)
            ->header('Content-Type', 'text/plain');
    }
}
