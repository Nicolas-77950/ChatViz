<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Modèle Analysis
 * Gère le stockage des résultats de l'IA locale (Verdict Ollama).
 * ⚡️ Les résultats sont mis en cache par nom de fichier et type d'analyse.
 */
class Analysis extends Model
{
    protected $fillable = [
        'user_id',
        'title',
        'type_analyse',
        'resultats',
    ];

    /**
     * Cast automatique pour les données structurées.
     * Le type d'analyse est redevenu un simple texte (string).
     */
    protected $casts = [
        'resultats' => 'array',
    ];

    /**
     * Lien vers le propriétaire de l'analyse (User).
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
