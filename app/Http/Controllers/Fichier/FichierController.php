<?php

namespace App\Http\Controllers\Fichier;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

// DTOs
use App\DTOs\Fichier\ImportFichierDTO;
use App\DTOs\Fichier\SuppressionFichierDTO;
use App\DTOs\Fichier\LectureFichierDTO;
use App\DTOs\Fichier\RenommageFichierDTO;

// Actions
use App\Actions\Fichier\EnregistrerFichierAction;
use App\Actions\Fichier\SupprimerFichierAction;
use App\Actions\Fichier\LireContenuFichierAction;
use App\Actions\Fichier\RenommerFichierAction;

// Requests
use App\Http\Requests\Fichier\ImportFichierRequest;
use App\Http\Requests\Fichier\RenommageFichierRequest;
use App\Http\Requests\Fichier\SuppressionFichierRequest;
use App\Http\Requests\Fichier\LectureFichierRequest;

/**
 * FichierController
 * Gère tout le cycle de vie des fichiers de discussion .txt (CRUD).
 */
class FichierController extends Controller
{
    /**
     * Enregistre un nouveau fichier via son DTO après validation.
     */
    public function store(ImportFichierRequest $request, EnregistrerFichierAction $action)
    {
        $dto = ImportFichierDTO::depuisRequete($request);
        $action->execute($dto);

        if ($request->wantsJson()) {
            return response()->json(['message' => 'Fichier enregistré.'], 200);
        }

        return redirect()->route('dashboard')->with('success', 'Fichier prêt.');
    }

    /**
     * Supprime un fichier après vérification.
     */
    public function destroy(SuppressionFichierRequest $request, SupprimerFichierAction $action)
    {
        $dto = SuppressionFichierDTO::depuisRequete($request);

        if ($action->execute($dto)) {
            return back()->with('success', 'Nettoyé.');
        }

        return back()->with('error', 'Action non autorisée.');
    }

    /**
     * Retourne le contenu brut pour l'analyse JS (API).
     */
    public function show(LectureFichierRequest $request, LireContenuFichierAction $action)
    {
        $dto = LectureFichierDTO::depuisRequete($request);
        $contenu = $action->execute($dto);

        if ($contenu === null) {
            return response()->json(['error' => 'Non trouvé.'], 404);
        }

        return response($contenu, 200)->header('Content-Type', 'text/plain');
    }

    /**
     * Renomme physiquement le fichier sur le disque.
     */
    public function updateName(RenommageFichierRequest $request, RenommerFichierAction $action)
    {
        $dto = RenommageFichierDTO::depuisRequete($request);
        $action->execute($dto);

        return back()->with('success', 'Nom mis à jour.');
    }
}
