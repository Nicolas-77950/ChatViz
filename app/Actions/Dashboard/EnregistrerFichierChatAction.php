<?php

namespace App\Actions\Dashboard;

use App\DTOs\AnalyseFichierDTO;
use Illuminate\Support\Facades\Auth;

class EnregistrerFichierChatAction
{
    /**
     * Traite et stocke le fichier chat importé.
     * @param AnalyseFichierDTO $dto
     * @return string - Le chemin du fichier stocké.
     */
    public function execute(AnalyseFichierDTO $dto): string
    {
        $nomFichier = 'chat_' . Auth::id() . '_' . time() . '.txt';
        $dto->fichier->storeAs('chats', $nomFichier);
        
        return 'chats/' . $nomFichier;
    }
}
