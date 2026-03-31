<?php

namespace App\Actions\Fichier;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

class RenommerFichierAction
{
    /**
     * Renomme un fichier chat de façon sécurisée.
     */
    public function execute($dto): void
    {
        $idUtilisateur = Auth::id();
        $ancienChemin = $dto->path;
        
        // Vérification de sécurité : s'assurer que le fichier appartient bien à l'utilisateur
        if (!str_starts_with($ancienChemin, 'chats/chat_' . $idUtilisateur . '_')) {
            abort(403, "Accès non autorisé à ce fichier.");
        }

        if (!Storage::exists($ancienChemin)) {
            abort(404, "Le fichier à renommer n'existe pas.");
        }

        // Construire le nouveau chemin avec le nouveau nom
        $nouveauNom = preg_replace('/[^a-zA-Z0-9_\-\.]/', '_', $dto->name);
        if (!str_ends_with($nouveauNom, '.txt')) {
            $nouveauNom .= '.txt';
        }
        
        $nouveauChemin = 'chats/chat_' . $idUtilisateur . '_' . $nouveauNom;

        Storage::move($ancienChemin, $nouveauChemin);
    }
}
