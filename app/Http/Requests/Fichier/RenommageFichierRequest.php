<?php

namespace App\Http\Requests\Fichier;

use Illuminate\Foundation\Http\FormRequest;

class RenommageFichierRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'path' => ['required', 'string'],
            'name' => ['required', 'string', 'min:1', 'max:255', 'regex:/^[a-zA-Z0-9_\-\.]+$/'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.regex' => 'Le nom contient des caractères non autorisés.',
            'name.required' => 'Le nom ne peut pas être vide.',
        ];
    }
}
