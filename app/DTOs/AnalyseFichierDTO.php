<?php

namespace App\DTOs;

use Illuminate\Http\UploadedFile;

class AnalyseFichierDTO
{
    public function __construct(
        public readonly UploadedFile $fichier
    ) {}

    /**
     * Crée un DTO à partir de la requête.
     */
    public static function depuisRequete(\Illuminate\Http\Request $request): self
    {
        return new self($request->file('chat_file'));
    }
}
