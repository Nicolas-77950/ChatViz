<?php

namespace App\Http\Requests\Fichier;

use Illuminate\Foundation\Http\FormRequest;

class LectureFichierRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'path' => ['required', 'string'],
        ];
    }
}
