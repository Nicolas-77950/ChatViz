<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contact; 
use App\Services\Contact\PhoneNormalizer; 

class ContactController extends Controller
{
    public function index() {
        return view('contact-us');
    }

    public function store(Request $request, PhoneNormalizer $normalizer) {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'phone' => 'required',
            'message' => 'required',
        ]);

        // On nettoie le téléphone avec ton service
        $cleanPhone = $normalizer->toE164($request->phone);

        if (!$cleanPhone) {
            return back()->withErrors(['phone' => 'Numéro invalide'])->withInput();
        }

        // On enregistre en base de données via le Modèle
        Contact::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'message' => $validated['message'],
            'status' => 'pending',
        ]);

        return back()->with('success', 'Message envoyé avec succès !');
    }
}
