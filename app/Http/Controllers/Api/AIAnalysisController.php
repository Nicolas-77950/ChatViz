<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class AIAnalysisController extends Controller
{
    public function generateVerdict(Request $request)
    {
        // $userQuestion = $request->input('user_message'); 
        // $stats = $request->input('stats'); 

        //test
        $stats = [
        'total_messages' => 1540,
        'most_active_user' => 'Alex',
        'night_messages_percentage' => '45%',
        'top_emoji' => '💀',
        'average_delay' => '2 heures'
        ];

        //test
        $userQuestion = "Analyse notre dynamique de groupe.";

        $context = "Données de la conversation : " . json_encode($stats) . ". ";
        $instruction = "En te basant UNIQUEMENT sur ces stats, réponds à la question suivante de l'utilisateur : ";

        $fullPrompt = $context . $instruction . $userQuestion;

        $response = Http::withoutVerifying()
        ->withToken('YHHH5cof1J2VlHq56mDj5eduuC9kaVSX')
        ->post('https://api.mistral.ai/v1/chat/completions', [ 
            'model' => 'mistral-tiny', 
            'messages' => [
                [
                    'role' => 'system', 
                    'content' => 'Tu es ChatViz, une IA experte en analyse de relations.'
                ],
                [
                    'role' => 'user', 
                    'content' => $fullPrompt
                ],
            ],
        ]);

    if ($response->failed()) {
        return response()->json([
            'error' => 'Erreur de connexion à l\'IA',
            'details' => $response->json(),
            'status' => $response->status()
        ], $response->status());
    }

    return response()->json([
        'verdict' => $response->json()['choices'][0]['message']['content']
    ]);
    }
}