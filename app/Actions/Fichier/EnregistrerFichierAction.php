<?php

namespace App\Actions\Fichier;

use App\DTOs\Fichier\ImportFichierDTO;
use Illuminate\Support\Facades\Auth;

class EnregistrerFichierAction
{
    /**
     * Traite et stocke le fichier chat importé.
     * @param ImportFichierDTO $dto
     * @return string - Le chemin du fichier stocké.
     */
    public function execute(ImportFichierDTO $dto): string
    {
        $nomFichier = 'chat_' . Auth::id() . '_' . time() . '.txt';
        $dto->fichier->storeAs('chats', $nomFichier);
        
        return 'chats/' . $nomFichier;
    }
}
