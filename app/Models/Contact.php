<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Modèle représentant un message de contact ou une demande de support.
 */
class Contact extends Model
{
    protected $fillable = [
        'name',
        'email',
        'message',
        'status',
    ];
}
