<?php

namespace App\Actions\Fichier;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

class RecupererFichiersRecentsAction
{
    /**
     * Récupère et filtre les fichiers importés par l'utilisateur connecté.
     * @return array
     */
    public function execute(): array
    {
        $fichiers = [];
        $idUtilisateur = Auth::id();

        if (Storage::exists('chats')) {
            $tousLesFichiers = Storage::files('chats');
            $prefixeUtilisateur = 'chats/chat_' . $idUtilisateur . '_';

            foreach ($tousLesFichiers as $fichier) {
                if (str_starts_with($fichier, $prefixeUtilisateur)) {
                    $fichiers[] = [
                        'name' => basename($fichier),
                        'path' => $fichier,
                        'date' => date('d/m/Y H:i', Storage::lastModified($fichier)),
                        'size' => round(Storage::size($fichier) / 1024, 2) . ' KB'
                    ];
                }
            }
        }

        // Tri par date décroissante
        usort($fichiers, fn($a, $b) => strcmp($b['date'], $a['date']));

        return $fichiers;
    }
}
