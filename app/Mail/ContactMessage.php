<?php

namespace App\Mail;

use App\DTOs\CreateContactDTO;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ContactMessage extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public readonly CreateContactDTO $dto
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Nouveau message de contact : ' . $this->dto->name,
            replyTo: [$this->dto->email],
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.contact.admin-notification',
            with: [
                'name' => $this->dto->name,
                'email' => $this->dto->email,
                'msg' => $this->dto->message,
            ],
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
