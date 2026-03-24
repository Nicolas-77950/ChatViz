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
     * Affiche la page Analyse (interface IA)
     */
    public function index(RecupererFichiersRecentsAction $action)
    {
        $files = $action->execute();
        return view('analyse', ['files' => $files]); 
    }

    /**
     * Affiche le Dashboard (historique)
     */
    public function dashboard(RecupererFichiersRecentsAction $action)
    {
        $files = $action->execute();
        return view('analyse.analyse', ['files' => $files]);
    }

    /**
     * Traitement de l'IA (Mistral)
     */
    public function generateVerdict(Request $request)
    {
        $messages = $request->input('messages', []);
        $userQuestion = $request->input('user_message', "Analyse la dynamique de ce groupe.");

        if (empty($messages)) {
            return response()->json(['error' => 'Aucun message reçu pour analyse'], 400);
        }

        $apiKey = config('services.google.gemini_api_key');
        if (empty($apiKey)) {
            return response()->json(['error' => 'La clé API Gemini est manquante dans votre fichier .env'], 500);
        }

        $slice = array_slice($messages, -500); // Gemini gère plus de contexte
        $chatHistory = "";

        foreach ($slice as $m) {
            $date = $m['date'] ?? 'Inconnue';
            $heure = $m['heure'] ?? '--:--';
            $auteur = $m['auteur'] ?? 'Anonyme';
            $texte = $m['message'] ?? '';
            $chatHistory .= "[{$date} {$heure}] {$auteur}: {$texte}\n";
        }

        $fullPrompt = "Tu es ChatViz, une IA experte en analyse de relations humaines. Voici un extrait de conversation WhatsApp :\n\n" . 
                      $chatHistory . 
                      "\n\nQuestion de l'utilisateur : " . $userQuestion . 
                      "\nRéponds avec précision, humour si nécessaire, et un regard d'expert.";

        $url = "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=" . config('services.google.gemini_api_key');

        $response = Http::withoutVerifying()
            ->post($url, [
                'contents' => [
                    [
                        'parts' => [
                            ['text' => $fullPrompt]
                        ]
                    ]
                ],
                'generationConfig' => [
                    'temperature' => 0.7,
                    'maxOutputTokens' => 2048,
                ]
            ]);

        if ($response->failed()) {
            Log::error('Erreur Gemini API', [
                'status' => $response->status(),
                'response' => $response->json()
            ]);

            return response()->json([
                'error' => 'L\'IA Gemini n\'a pas pu répondre', 
                'details' => $response->json()
            ], $response->status());
        }

        $data = $response->json();
        $verdict = $data['candidates'][0]['content']['parts'][0]['text'] ?? "Désolé, je n'ai pas pu compiler le verdict.";

        return response()->json([
            'verdict' => $verdict
        ]);
    }
}