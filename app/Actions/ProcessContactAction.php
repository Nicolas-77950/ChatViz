<?php

namespace App\Actions;

use App\DTOs\CreateContactDTO;
use App\Models\Contact;
use App\Mail\ContactMessage;
use Illuminate\Support\Facades\Mail;

class ProcessContactAction
{
    public function execute(CreateContactDTO $dto): void
    {
        // 1. Enregistrer en base pour garder une trace
        Contact::create([
            'name' => $dto->name,
            'email' => $dto->email,
            'message' => $dto->message,
            'status' => 'pending',
        ]);

        // 2. Envoyer le mail UNIQUEMENT à la boîte de ChatViz
        try {
            // L'adresse de réception de ChatViz (configurable dans le .env)
            $chatvizInbox = env('MAIL_RECEIVE_ADDRESS', 'chatviz@gmail.com');
            
            Mail::to($chatvizInbox)->send(new ContactMessage($dto));
        } catch (\Exception $e) {
            report($e);
        }
    }
}

