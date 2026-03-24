/**
 * ui-file.js
 * Gère l'affichage des options d'analyse après l'importation d'un fichier.
 */

import { calculerTempsReponse } from './analysis/responseTime/logiqueTempsReponse.js';
import { afficherTempsReponse } from './analysis/responseTime/renduTempsReponse.js';
import { calculerActivite } from './analysis/activity/logiqueActivite.js';
import { afficherActivite } from './analysis/activity/renduActivite.js';
import { calculerEmojis } from './analysis/emojis/logiqueEmojis.js';
import { afficherEmojis } from './analysis/emojis/renduEmojis.js';
import { calculerVolumeMeter } from './analysis/volumeMeter/logiqueVolumeMeter.js';
import { afficherVolumeMeter } from './analysis/volumeMeter/renduVolumeMeter.js';

/**
 * Affiche l'interface de sélection d'analyse pour le fichier chargé.
 * @param {string} nomFichier - Nom du fichier.
 * @param {Array} listeMessages - Liste des messages.
 */
export function afficherCarteFichier(nomFichier, listeMessages) {
    const conteneurDirect = document.getElementById('results-container');
    const conteneurHistorique = document.getElementById('history-container');

    if (!conteneurDirect) return;

    // Gestion de l'affichage global de l'interface
    conteneurDirect.classList.remove('hidden');
    if (conteneurHistorique) conteneurHistorique.classList.add('hidden');

    // 1. Clonage du template des options (Blade partial)
    const modeleOptions = document.querySelector('#template-options-analyse');
    const instanceOptions = modeleOptions.content.cloneNode(true);

    // 2. Remplissage des informations de base
    instanceOptions.querySelector('.label-nom-fichier').textContent = `Fichier prêt : ${nomFichier}`;
    instanceOptions.querySelector('.label-nombre-messages').textContent = `${listeMessages.length} messages lus.`;

    // 3. Gestion des événements du menu via les IDs
    instanceOptions.querySelector('#btn-fermer-analyse').addEventListener('click', () => {
        conteneurDirect.innerHTML = '';
        conteneurDirect.classList.add('hidden');
        if (conteneurHistorique) conteneurHistorique.classList.remove('hidden');
    });

    instanceOptions.querySelector('#btn-volume-meter').addEventListener('click', () => {
        const resultatsDuVolume = calculerVolumeMeter(listeMessages);
        afficherVolumeMeter(resultatsDuVolume, 'conteneur-resultat-specifique');
    });

    instanceOptions.querySelector('#btn-temps-reponse').addEventListener('click', () => {
        const resultatsDuTemps = calculerTempsReponse(listeMessages);
        afficherTempsReponse(resultatsDuTemps, 'conteneur-resultat-specifique');
    });

    instanceOptions.querySelector('#btn-activite').addEventListener('click', () => {
        const resultatsDeLActivite = calculerActivite(listeMessages);
        afficherActivite(resultatsDeLActivite, 'conteneur-resultat-specifique');
    });

    instanceOptions.querySelector('#btn-emojis').addEventListener('click', () => {
        const resultatsDesEmojis = calculerEmojis(listeMessages);
        afficherEmojis(resultatsDesEmojis, 'conteneur-resultat-specifique');
    });

    // 4. Injection finale dans le navigateur
    conteneurDirect.innerHTML = '';
    conteneurDirect.appendChild(instanceOptions);
}
