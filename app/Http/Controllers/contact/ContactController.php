<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contact; 
use App\Services\Contact\PhoneNormalizer; 
use App\Mail\ContactMessage; 
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function index() {
        return view('contact-us');
    }

    public function store(Request $request, PhoneNormalizer $normalizer) {
        // Validation 
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

        try {
            Mail::to('ton-email@exemple.com')->send(new ContactMessage($validated));
        } catch (\Exception $e) {
            report($e);
        }

        return back()->with('success', 'Message envoyé avec succès !');
    }
}