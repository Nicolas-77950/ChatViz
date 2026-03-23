<?php

namespace App\DTOs;

class SuppressionFichierDTO
{
    public function __construct(
        public readonly string $chemin
    ) {}

    /**
     * Crée un DTO à partir de la requête.
     */
    public static function depuisRequete(\Illuminate\Http\Request $request): self
    {
        return new self($request->input('path'));
    }
}
