<?php

namespace App\DTOs\Fichier;

use Illuminate\Http\UploadedFile;

class ImportFichierDTO
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
