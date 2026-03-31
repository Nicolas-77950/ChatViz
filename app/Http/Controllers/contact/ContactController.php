<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contact; 
use App\Services\Contact\PhoneNormalizer; 
use App\Mail\ContactMessage; 
use App\Mail\AutoReplyMail; // <--- Crée ce mail via : php artisan make:mail AutoReplyMail
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function index() {
        return view('contact-us');
    }

    public function store(Request $request, PhoneNormalizer $normalizer) {
         
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'message' => 'required|string|min:5',
        ]);

        
        $contact = Contact::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'message' => $validated['message'],
            'status' => 'pending',
        ]);

        $autoReplyContent = $this->determineAutoReply($validated['message']);

        try {
            //  Notification pour l'administrateur
            Mail::to('ton-email@exemple.com')->send(new ContactMessage($validated));

            // B. envoi de la réponse automatique à l'utilisateur
            Mail::to($validated['email'])->send(new AutoReplyMail($validated, $autoReplyContent));
            
        } catch (\Exception $e) {
            report($e);
        }

        return back()->with('success', 'Message envoyé ! Une réponse automatique vous a été adressée par email.');
    }
     //Analyse le message pour choisir la meilleure réponse automatique
     
    private function determineAutoReply($message)
    {
        $message = strtolower($message);

        if (str_contains($message, 'whatsapp')) {
            return [
                'subject' => 'Aide : Importation WhatsApp 📱',
                'body' => "Il semble que vous ayez une question sur WhatsApp. Voici notre guide rapide d'exportation : Paramètres > Discussions > Exportation de discussion."
            ];
        }

        if (str_contains($message, 'bug') || str_contains($message, 'erreur')) {
            return [
                'subject' => 'Signalement technique reçu 🛠️',
                'body' => "Merci de nous avoir signalé ce problème. Pour nous aider, n'hésitez pas à répondre à ce mail avec une capture d'écran."
            ];
        }

        // Réponse par défaut
        return [
            'subject' => 'Nous avons bien reçu votre message ✉️',
            'body' => "Merci de nous avoir contactés. Notre équipe vous répondra personnellement sous 24h ouvrées."
        ];
    }
}