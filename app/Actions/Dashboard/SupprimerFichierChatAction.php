<?php

namespace App\Actions\Dashboard;

use App\DTOs\SuppressionFichierDTO;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

class SupprimerFichierChatAction
{
    /**
     * Supprime de façon sécurisée un fichier après vérification d'appartenance.
     */
    public function execute(SuppressionFichierDTO $dto): bool
    {
        // Isolement du nom de fichier pour des raisons de sécurité
        $nomFichier = basename($dto->chemin);
        $prefixeUtilisateur = 'chat_' . Auth::id() . '_';

        // Vérification de la propriété du fichier via le préfixe
        if (str_starts_with($nomFichier, $prefixeUtilisateur)) {
            $cheminSur = 'chats/' . $nomFichier;

            if (Storage::exists($cheminSur)) {
                return Storage::delete($cheminSur);
            }
        }

        return false;
    }
}
