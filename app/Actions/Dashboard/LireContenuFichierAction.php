<?php

namespace App\Actions\Dashboard;

use App\DTOs\FichierHistoriqueDTO;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

class LireContenuFichierAction
{
    /**
     * Lit et retourne le contenu d'un fichier chat appartenant à l'utilisateur.
     * @param FichierHistoriqueDTO $dto
     * @return string|null
     */
    public function execute(FichierHistoriqueDTO $dto): ?string
    {
        $nomFichier = basename($dto->chemin);
        $prefixeUtilisateur = 'chat_' . Auth::id() . '_';

        // Vérification de sécurité
        if (str_starts_with($nomFichier, $prefixeUtilisateur)) {
            $cheminSur = 'chats/' . $nomFichier;

            if (Storage::exists($cheminSur)) {
                return Storage::get($cheminSur);
            }
        }

        return null;
    }
}
