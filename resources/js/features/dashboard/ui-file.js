/**
 * ui-file.js
 * Gère l'affichage des options d'analyse après l'importation d'un fichier.
 */

import { calculerTempsReponse } from './analysis/algo/responseTime/logiqueTempsReponse.js';
import { afficherTempsReponse } from './analysis/algo/responseTime/renduTempsReponse.js';
import { calculerActivite } from './analysis/algo/activity/logiqueActivite.js';
import { afficherActivite } from './analysis/algo/activity/renduActivite.js';
import { calculerEmojis } from './analysis/algo/emojis/logiqueEmojis.js';
import { afficherEmojis } from './analysis/algo/emojis/renduEmojis.js';
import { calculerVolumeMeter } from './analysis/algo/volumeMeter/logiqueVolumeMeter.js';
import { afficherVolumeMeter } from './analysis/algo/volumeMeter/renduVolumeMeter.js';
import { CONFIG_AMOUR, lancerAnalyseAmour } from './analysis/IA/amour/logiqueAmour.js';
import { CONFIG_ENGAGEMENT, lancerAnalyseEngagement } from './analysis/IA/engagement/logiqueEngagement.js';
import { afficherChargementIA, afficherVerdictIA, afficherErreurIA } from './analysis/IA/renduIA.js';
import { genererImageWrapped } from './export/wrapped/renduWrapped.js';
import { compterBriques } from './export/wrapped/logiqueWrapped.js';

/**
 * Objet global accumulant les résultats d'analyse pour l'export Wrapped.
 * Chaque propriété est remplie au moment où l'utilisateur lance l'analyse correspondante.
 */
let resultatsWrapped = {
    nomFichier: null,
    nombreMessages: 0,
    volumeMeter: null,
    tempsReponse: null,
    activite: null,
    emojis: null,
    verdictAmour: null,
    verdictEngagement: null,
};

/**
 * Met à jour le compteur de briques et la visibilité du bouton Wrapped.
 */
function mettreAJourCompteurWrapped() {
    const sectionExport = document.getElementById('section-export-wrapped');
    const compteurElement = document.getElementById('compteur-briques');
    if (!sectionExport || !compteurElement) return;

    const nbBriques = compterBriques(resultatsWrapped);
    compteurElement.textContent = `${nbBriques}/6`;

    if (nbBriques > 0) {
        sectionExport.classList.remove('hidden');
    }
}

/**
 * Affiche l'interface de sélection d'analyse pour le fichier chargé.
 * @param {string} nomFichier - Nom du fichier.
 * @param {Array} listeMessages - Liste des messages.
 */
export function afficherCarteFichier(nomFichier, listeMessages) {
    const conteneurDirect = document.getElementById('results-container');
    const conteneurHistorique = document.getElementById('history-container');

    if (!conteneurDirect) return;

    // Réinitialisation de l'objet Wrapped pour ce nouveau fichier
    resultatsWrapped = {
        nomFichier: nomFichier,
        nombreMessages: listeMessages.length,
        volumeMeter: null,
        tempsReponse: null,
        activite: null,
        emojis: null,
        verdictAmour: null,
        verdictEngagement: null,
    };

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

    // --- Boutons Algorithmiques (avec stockage pour le Wrapped) ---
    instanceOptions.querySelector('#btn-volume-meter').addEventListener('click', () => {
        const resultatsDuVolume = calculerVolumeMeter(listeMessages);
        resultatsWrapped.volumeMeter = resultatsDuVolume;
        mettreAJourCompteurWrapped();
        afficherVolumeMeter(resultatsDuVolume, 'conteneur-resultat-specifique');
    });

    instanceOptions.querySelector('#btn-temps-reponse').addEventListener('click', () => {
        const resultatsDuTemps = calculerTempsReponse(listeMessages);
        resultatsWrapped.tempsReponse = resultatsDuTemps;
        mettreAJourCompteurWrapped();
        afficherTempsReponse(resultatsDuTemps, 'conteneur-resultat-specifique');
    });

    instanceOptions.querySelector('#btn-activite').addEventListener('click', () => {
        const resultatsDeLActivite = calculerActivite(listeMessages);
        resultatsWrapped.activite = resultatsDeLActivite;
        mettreAJourCompteurWrapped();
        afficherActivite(resultatsDeLActivite, 'conteneur-resultat-specifique');
    });

    instanceOptions.querySelector('#btn-emojis').addEventListener('click', () => {
        const resultatsDesEmojis = calculerEmojis(listeMessages);
        resultatsWrapped.emojis = resultatsDesEmojis;
        mettreAJourCompteurWrapped();
        afficherEmojis(resultatsDesEmojis, 'conteneur-resultat-specifique');
    });

    // --- Boutons d'Analyse par IA (chacun lance directement l'analyse) ---
    const correspondanceBoutonsIA = {
        '#btn-ia-amour': 'amour',
        '#btn-ia-engagement': 'engagement',
    };

    Object.entries(correspondanceBoutonsIA).forEach(([selecteur, typeAnalyse]) => {
        instanceOptions.querySelector(selecteur).addEventListener('click', () => {
            lancerAnalyseIADirecte(listeMessages, typeAnalyse, nomFichier);
        });
    });

    // --- Bouton Wrapped ---
    instanceOptions.querySelector('#btn-generer-wrapped')?.addEventListener('click', () => {
        genererImageWrapped(resultatsWrapped);
    });

    // 4. Injection finale dans le navigateur
    conteneurDirect.innerHTML = '';
    conteneurDirect.appendChild(instanceOptions);
}

/**
 * Lance directement une analyse IA sentimentale (chargement → appel Ollama → verdict).
 * @param {Array} listeMessages - Messages de la conversation.
 * @param {string} identifiantType - ID du type d'analyse choisi (ex: 'amour', 'toxicite').
 * @param {string} nomFichier - Nom du fichier analysé
 */
async function lancerAnalyseIADirecte(listeMessages, identifiantType, nomFichier) {
    const idCible = 'conteneur-resultat-specifique';
    
    let configType, fonctionLancement;

    if (identifiantType === 'amour') {
        configType = CONFIG_AMOUR;
        fonctionLancement = lancerAnalyseAmour;
    } else if (identifiantType === 'engagement') {
        configType = CONFIG_ENGAGEMENT;
        fonctionLancement = lancerAnalyseEngagement;
    } else {
        return;
    }

    // 1. Affichage du chargement
    afficherChargementIA(idCible, configType.label);

    try {
        // 2. Appel à l'IA locale via le backend Laravel (100% local)
        const resultat = await fonctionLancement(listeMessages, nomFichier);

        // 2.5 Stockage du verdict pour le Wrapped
        if (identifiantType === 'amour') {
            resultatsWrapped.verdictAmour = resultat.verdict;
        } else if (identifiantType === 'engagement') {
            resultatsWrapped.verdictEngagement = resultat.verdict;
        }
        mettreAJourCompteurWrapped();

        // 3. Affichage du verdict
        afficherVerdictIA(resultat, idCible, () => {
            // Retour : vider la zone de résultat pour pouvoir relancer
            const conteneur = document.getElementById(idCible);
            if (conteneur) conteneur.innerHTML = '';
        });

    } catch (erreur) {
        console.error('[ChatViz] Erreur analyse IA :', erreur);
        afficherErreurIA(erreur.message, idCible, () => {
            const conteneur = document.getElementById(idCible);
            if (conteneur) conteneur.innerHTML = '';
        });
    }
}
