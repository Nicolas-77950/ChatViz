<?php

namespace App\Actions\Fichier;

use App\DTOs\Fichier\LectureFichierDTO;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

class LireContenuFichierAction
{
    /**
     * Lit et retourne le contenu d'un fichier chat appartenant à l'utilisateur.
     * @param LectureFichierDTO $dto
     * @return string|null
     */
    public function execute(LectureFichierDTO $dto): ?string
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
