<?php

namespace App\Actions\Analyse\IA\Engagement;

use App\Actions\Analyse\IA\Base\ActionIABase;

/**
 * GenererVerdictEngagementAction
 * Analyseur spécialisé dans la mesure de l'investissement émotionnel pur.
 */
class GenererVerdictEngagementAction extends ActionIABase
{
    /**
     * Retourne la consigne spécifique pour l'analyse du niveau d'engagement.
     * @return string
     */
    protected function getConsigneSpecifique(): string
    {
        return "Analyse cette conversation WhatsApp et donne un SCORE D'ENGAGEMENT EMOTIONNEL sur 100 par participant.
                Regarde la longueur des messages, les questions posées, qui relance la discussion, les projets futurs.
                Donne les scores par personne, les 3 moments forts et un verdict final en une phrase.";
    }
}
