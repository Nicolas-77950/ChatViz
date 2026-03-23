<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

class AIAnalysisController extends Controller
{
    /**
     * Affiche la page Analyse (interface IA)
     */
    public function index()
    {
        $files = $this->getUserFiles();
        return view('analyse', ['files' => $files]); 
    }

    /**
     * Affiche le Dashboard (historique)
     */
    public function dashboard()
    {
        $files = $this->getUserFiles();
        return view('analyse.analyse', ['files' => $files]);
    }

    /**
     * Méthode privée pour centraliser la récupération des fichiers
     */
    private function getUserFiles()
    {
        $files = [];
        if (Storage::exists('chats')) {
            $allFiles = Storage::files('chats');
            $userPrefix = 'chats/chat_' . auth()->id() . '_';
            
            foreach ($allFiles as $file) {
                if (str_starts_with($file, $userPrefix)) {
                    $files[] = [
                        'name' => basename($file),
                        'path' => $file,
                        'date' => date('d/m/Y H:i', Storage::lastModified($file)),
                        'size' => round(Storage::size($file) / 1024, 2) . ' KB'
                    ];
                }
            }
        }
        return $files;
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

        $slice = array_slice($messages, -200); 
        $chatHistory = "";

        foreach ($slice as $m) {
            $date = $m['date'] ?? 'Inconnue';
            $heure = $m['heure'] ?? '--:--';
            $auteur = $m['auteur'] ?? 'Anonyme';
            $texte = $m['message'] ?? '';
            $chatHistory .= "[{$date} {$heure}] {$auteur}: {$texte}\n";
        }

        $fullPrompt = "Voici un extrait de conversation WhatsApp :\n\n" . 
                      $chatHistory . 
                      "\n\nQuestion de l'utilisateur : " . $userQuestion . 
                      "\nRéponds de manière précise en tant qu'expert ChatViz.";

        $response = Http::withoutVerifying()
            ->withToken(config('services.mistral.api_key'))
            ->post('https://api.mistral.ai/v1/chat/completions', [
                'model' => 'mistral-tiny',
                'messages' => [
                    [
                        'role' => 'system', 
                        'content' => 'Tu es ChatViz, une IA experte en analyse de relations humaines.'
                    ],
                    [
                        'role' => 'user', 
                        'content' => $fullPrompt
                    ],
                ],
            ]);

        if ($response->failed()) {
            return response()->json([
                'error' => 'L\'IA n\'a pas pu répondre', 
                'details' => $response->json()
            ], $response->status());
        }

        return response()->json([
            'verdict' => $response->json()['choices'][0]['message']['content']
        ]);
    }
}