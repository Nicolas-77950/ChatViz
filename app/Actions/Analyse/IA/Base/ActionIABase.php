<?php

namespace App\Actions\Analyse\IA\Base;

use App\DTOs\Analyse\AnalyseIADTO;
use App\Models\Analysis;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

/**
 * ActionIABase
 * Classe parente pour les analyses IA.
 * Stocke les verdicts dans le cache classique SQL.
 */
abstract class ActionIABase
{
    abstract protected function getConsigneSpecifique(): string;

    public function execute(AnalyseIADTO $dto): array
    {
        // 1. Recherche dans le cache classique (Nom de fichier + Type)
        // Système simple et direct.
        $existing = Analysis::where('user_id', Auth::id())
            ->where('title', $dto->nomFichier)
            ->where('type_analyse', $dto->typeAnalyse)
            ->first();

        if ($existing) {
            return [
                'verdict' => $existing->resultats['verdict'],
                'cached' => true
            ];
        }

        // 2. Préparation du contexte (tronqué pour la rapidité locale)
        if (empty($dto->messages)) {
            throw new \InvalidArgumentException('Aucun message reçu pour analyse.');
        }

        $slice = array_slice($dto->messages, -80);
        $chatHistory = "";

        foreach ($slice as $m) {
            $auteur = $m['auteur'] ?? 'Anonyme';
            $texte = $m['message'] ?? '';
            if (mb_strlen($texte) > 150) {
                $texte = mb_substr($texte, 0, 150) . '...';
            }
            $chatHistory .= "{$auteur}: {$texte}\n";
        }

        // 3. Construction et Appel à l'IA locale (Ollama)
        $fullPrompt = "Extrait de discussion WhatsApp :\n\n" . 
                      $chatHistory . 
                      "\n\n" . $this->getConsigneSpecifique() . 
                      "\nRéponds UNIQUEMENT en Français. Sois CONCIS.";

        $url = env('OLLAMA_URL', "http://host.docker.internal:11434/api/generate");

        try {
            $response = Http::withoutVerifying()->timeout(300)->post($url, [
                'model' => 'mistral',
                'prompt' => $fullPrompt,
                'stream' => false,
                'options' => [
                    'num_predict' => 250,
                    'temperature' => 0.7,
                ]
            ]);

            if ($response->failed()) {
                throw new \RuntimeException("Impossible de contacter l'IA locale.");
            }

            $verdict = $response->json()['response'] ?? 'Verdict indisponible.';

            // 4. Persistence en base de données pour le cache
            Analysis::updateOrCreate(
                [
                    'user_id' => Auth::id(),
                    'title' => $dto->nomFichier,
                    'type_analyse' => $dto->typeAnalyse
                ],
                [
                    'resultats' => ['verdict' => $verdict]
                ]
            );

            return [
                'verdict' => $verdict,
                'cached' => false
            ];

        } catch (\Exception $e) {
            Log::error('IA Error: ' . $e->getMessage());
            throw $e;
        }
    }
}
