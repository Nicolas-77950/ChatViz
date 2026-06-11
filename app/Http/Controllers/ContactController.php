<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateContactRequest;
use App\DTOs\CreateContactDTO;
use App\Actions\ProcessContactAction;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;

class ContactController extends Controller
{
    public function index(): View
    {
        return view('contact.contact-us');
    }

    public function store(CreateContactRequest $request, ProcessContactAction $action): RedirectResponse
    {
        // On récupère le DTO depuis la requête validée
        $dto = CreateContactDTO::fromRequest($request);

        // On délègue la logique métier à l'Action
        $action->execute($dto);

        return back()->with('success', 'Message envoyé avec succès ! Notre équipe vous répondra très prochainement.');
    }
}