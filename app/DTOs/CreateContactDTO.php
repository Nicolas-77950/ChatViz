<?php

namespace App\DTOs;

use Illuminate\Http\Request;

class CreateContactDTO
{
    public function __construct(
        
    ) {}

    public static function depuisRequete(Request $request): self
    {
        // On récupère les données avec des valeurs par défaut vides pour éviter les erreurs de type
        return new self(
            nom: $request->input('name', ''),
            email: $request->input('email', ''),
            message: $request->input('message', '')
        );
    }
  }

    