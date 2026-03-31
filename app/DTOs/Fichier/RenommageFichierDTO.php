<?php

namespace App\DTOs\Fichier;

use Illuminate\Http\Request;

class RenommageFichierDTO
{
    public string $path;
    public string $name;

    public static function depuisRequete(Request $request): self
    {
        $dto = new self();
        $dto->path = $request->input('path');
        $dto->name = $request->input('name');
        return $dto;
    }
}
