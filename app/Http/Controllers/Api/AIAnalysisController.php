<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use App\Actions\Dashboard\RecupererFichiersRecentsAction;

class AIAnalysisController extends Controller
{
    /**
     * Affiche la page Analyse (interface IA locale)
     */
    public function index(RecupererFichiersRecentsAction $action)
    {
        $files = $action->execute();
        return view('analyse', ['files' => $files]); 
    }

    /**
     * Traitement de l'IA Locale (Ollama - Llama 3)
     * 100% Hors-ligne et privé.
     */
    public function generateVerdict(Request $request)
    {
        $messages = $request->input('messages', []);
        $userQuestion = $request->input('user_message', "Analyse la dynamique de ce groupe.");

        if (empty($messages)) {
            return response()->json(['error' => 'Aucun message reçu pour analyse'], 400);
        }

        // On limite à 80 messages pour rester rapide sur une IA locale (8B paramètres)
        $slice = array_slice($messages, -80);
        $chatHistory = "";

        // Format condensé : on retire la date/heure pour économiser des tokens
        foreach ($slice as $m) {
            $auteur = $m['auteur'] ?? 'Anonyme';
            $texte = $m['message'] ?? '';
            // On tronque les messages trop longs pour éviter d'exploser le contexte
            if (mb_strlen($texte) > 200) {
                $texte = mb_substr($texte, 0, 200) . '...';
            }
            $chatHistory .= "{$auteur}: {$texte}\n";
        }

        $fullPrompt = "Tu es ChatViz, un expert en analyse de relations. Voici un extrait de conversation WhatsApp :\n\n" . 
                      $chatHistory . 
                      "\n\n" . $userQuestion . 
                      "\nRéponds UNIQUEMENT en Français. Sois CONCIS (maximum 200 mots).";

        // URL du serveur Ollama local (host.docker.internal est nécessaire pour Laravel Sail / Docker)
        $url = env('OLLAMA_URL', "http://host.docker.internal:11434/api/generate");

        try {
            $response = Http::withoutVerifying()
                ->timeout(300) // 5 minutes max pour laisser le temps à l'IA locale
                ->post($url, [
                    'model' => 'llama3',
                    'prompt' => $fullPrompt,
                    'stream' => false,
                    'options' => [
                        'num_predict' => 300,   // Limite la longueur de la réponse (concision)
                        'temperature' => 0.7,   // Réponses directes et cohérentes
                        'num_ctx' => 2048,      // Réduit la fenêtre de contexte pour accélérer le traitement
                    ]
                ]);

            if ($response->failed()) {
                Log::error('Erreur Ollama API', [
                    'status' => $response->status(),
                    'error' => $response->body()
                ]);

                return response()->json([
                    'error' => "Impossible de contacter l'IA locale Ollama. Vérifie qu'elle tourne dans ton terminal.", 
                ], 500);
            }

            $data = $response->json();
            $verdict = $data['response'] ?? "Désolé, je n'ai pas pu compiler le verdict.";

            return response()->json([
                'verdict' => $verdict
            ]);

        } catch (\Exception $e) {
            Log::error('Exception Ollama', ['msg' => $e->getMessage()]);
            
            // Message d'erreur plus clair selon le type de problème
            $messageErreur = "Erreur de connexion avec l'IA locale.";
            if (str_contains($e->getMessage(), 'timed out')) {
                $messageErreur = "L'IA locale a mis trop de temps à répondre. Réessaie avec moins de messages ou vérifie qu'Ollama n'est pas surchargé.";
            } elseif (str_contains($e->getMessage(), 'connect')) {
                $messageErreur = "Impossible de joindre Ollama. Lance 'ollama serve' dans ton terminal.";
            }
            
            return response()->json(['error' => $messageErreur], 500);
        }
    }
}