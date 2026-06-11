<?php

namespace App\DTOs;

use App\Http\Requests\CreateContactRequest;

class CreateContactDTO
{
    public function __construct(
        public readonly string $name,
        public readonly string $email,
        public readonly string $message
    ) {}

    public static function fromRequest(CreateContactRequest $request): self
    {
        return new self(
            name: $request->validated('name'),
            email: $request->validated('email'),
            message: $request->validated('message')
        );
    }
}