<?php

namespace App\Http\Requests\Fichier;

use Illuminate\Foundation\Http\FormRequest;

class ImportFichierRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Déjà géré par le middleware auth
    }

    public function rules(): array
    {
        return [
            'chat_file' => ['required', 'file', 'mimes:txt', 'max:5000'], // max 5MB
        ];
    }

    public function messages(): array
    {
        return [
            'chat_file.required' => 'Veuillez sélectionner un fichier.',
            'chat_file.mimes' => 'Seuls les fichiers .txt sont acceptés.',
            'chat_file.max' => 'Le fichier est trop volumineux (max 5 Mo).',
        ];
    }
}
