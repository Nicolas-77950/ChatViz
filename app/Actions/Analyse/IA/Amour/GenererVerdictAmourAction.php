<?php

namespace App\Actions\Analyse\IA\Amour;

use App\Actions\Analyse\IA\Base\ActionIABase;

/**
 * GenererVerdictAmourAction
 * Analyseur spécialisé dans la détection de sentiments amoureux.
 */
class GenererVerdictAmourAction extends ActionIABase
{
    /**
     * Retourne la consigne spécifique pour l'analyse des sentiments amoureux.
     * @return string
     */
    protected function getConsigneSpecifique(): string
    {
        return "Analyse cette conversation WhatsApp et donne un SCORE DE CHANCES AMOUREUSES sur 100.
                IMPORTANT : Commence toujours ta réponse par le score au format '## 💘 Score : XX/100'.
                Analyse les emojis affectueux, les compliments, qui initie la conversation, surnoms, propositions de rendez-vous.
                Donne les 3 indices les plus marquants et un verdict final court.";
    }
}
