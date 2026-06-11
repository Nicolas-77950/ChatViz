<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class WelcomeEmail extends Mailable
{
    use Queueable, SerializesModels;

    // Propriété publique pour stocker les infos de l'utilisateur
    public $user;

    /**
     * Crée une nouvelle instance de message en acceptant l'utilisateur.
     */
    public function __construct($user)
    {
        $this->user = $user;
    }

    /**
     * Définit l'enveloppe du message (Sujet de l'e-mail).
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Bienvenue sur ChatViz ! ✨',
        );
    }

    /**
     * Définit le contenu du message en HTML direct.
     */
    public function content(): Content
    {
        return new Content(
            htmlString: "<h1>Bonjour " . e($this->user->name) . " !</h1>
                         <p>Merci de t'être inscrit sur <strong>ChatViz</strong>.</p>
                         <p>Ton compte est désormais actif et configuré pour envoyer des e-mails via l'API Mailtrap !</p>",
        );
    }

    /**
     * Pièces jointes (vide par défaut).
     */
    public function attachments(): array
    {
        return [];
    }
}