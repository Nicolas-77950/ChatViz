<?php

namespace App\DTOs\Analyse;

use Illuminate\Http\Request;

/**
 * AnalyseIADTO
 * Objet de transfert de données pour les requêtes IA (Format simple).
 */
class AnalyseIADTO
{
    public array $messages;
    public string $nomFichier;
    public string $typeAnalyse;

    /**
     * Factory pour créer le DTO depuis la requête.
     * @param Request $request
     * @return self
     */
    public static function depuisRequete(Request $request): self
    {
        $dto = new self();
        $dto->messages = $request->input('messages', []);
        $dto->nomFichier = $request->input('file_name', '');
        $dto->typeAnalyse = $request->input('type_analyse', 'amour');

        return $dto;
    }
}
