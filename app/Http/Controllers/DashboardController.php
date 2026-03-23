<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\DTOs\AnalyseFichierDTO;
use App\DTOs\SuppressionFichierDTO;
use App\Actions\Dashboard\RecupererFichiersRecentsAction;
use App\Actions\Dashboard\EnregistrerFichierChatAction;
use App\Actions\Dashboard\SupprimerFichierChatAction;

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
}
