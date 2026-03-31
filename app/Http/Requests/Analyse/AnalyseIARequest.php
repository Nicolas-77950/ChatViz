<?php

namespace App\Http\Requests\Analyse;

use Illuminate\Foundation\Http\FormRequest;

class AnalyseIARequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'messages' => ['required', 'array', 'min:1'],
            'file_name' => ['required', 'string'],
            'type_analyse' => ['required', 'string', 'in:amour,engagement'],
        ];
    }

    public function messages(): array
    {
        return [
            'messages.required' => 'Aucun message à analyser.',
            'type_analyse.in' => 'Type d\'analyse non reconnu.',
            'file_name.required' => 'Le nom du fichier est indispensable.',
        ];
    }
}
