<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Actions\Fichier\RecupererFichiersRecentsAction;

/**
 * DashboardController
 * Ne s'occupe plus que du rendu de la vue principale du tableau de bord.
 */
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
}
