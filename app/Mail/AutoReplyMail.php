<?php

namespace App\Mail;

use App\DTOs\CreateContactDTO;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class AutoReplyMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public readonly CreateContactDTO $dto,
        public readonly array $autoReplyContent
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: $this->autoReplyContent['subject'],
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.contact.auto-reply',
            with: [
                'name' => $this->dto->name,
                'replyBody' => $this->autoReplyContent['body'],
            ],
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
