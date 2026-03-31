<?php

namespace App\DTOs\Fichier;

class LectureFichierDTO
{
    public function __construct(
        public readonly string $chemin
    ) {}

    /**
     * Crée un DTO à partir des paramètres de la requête.
     */
    public static function depuisRequete(\Illuminate\Http\Request $request): self
    {
        return new self($request->query('path'));
    }
}
