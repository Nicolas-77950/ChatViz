/**
 * import.js
 * Responsabilité : Gérer uniquement l'interface utilisateur du Drag & Drop
 * et du bouton d'importation. Délègue l'analyse à parser.js.
 */

import { analyserFichier } from './parser.js';
import { afficherCarteFichier } from './ui-file.js';

/**
 * Affiche ou cache l'overlay bleu lors du survol d'un fichier.
 */
function reglerAffichageOverlay(element, estVisible) {
    if (estVisible) {
        element.classList.remove('opacity-0', 'pointer-events-none');
        element.classList.add('opacity-100');
    } else {
        element.classList.remove('opacity-100');
        element.classList.add('opacity-0', 'pointer-events-none');
    }
}

/**
 * @function gererFichier
 * Lit le fichier, l'analyse et lance l'affichage de l'interface d'analyse.
 */
async function gererFichier(fichier) {
    if (!fichier.name.endsWith('.txt')) {
        alert("Oups ! Seuls les fichiers .txt (export WhatsApp) sont acceptés.");
        return;
    }

    const messages = await analyserFichier(fichier);
    
    // Affichage de l'interface de choix d'analyse
    afficherCarteFichier(fichier.name, messages);
}

/**
 * @function initImport
 * Point d'entrée pour activer l'importation (Drag&Drop + Clic).
 */
export function initImport() {
    const overlayDeDepot = document.getElementById('drop-overlay');
    const champFichier = document.getElementById('chat_file');

    if (!overlayDeDepot || !champFichier) return;

    let compteurDrag = 0;

    // Blocage des comportements par défaut du navigateur
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(nomEvenement => {
        window.addEventListener(nomEvenement, (e) => {
            e.preventDefault();
            e.stopPropagation();
        }, false);
    });

    // Apparition de l'overlay au survol
    window.addEventListener('dragenter', () => {
        compteurDrag++;
        if (compteurDrag === 1) reglerAffichageOverlay(overlayDeDepot, true);
    });

    window.addEventListener('dragleave', () => {
        compteurDrag--;
        if (compteurDrag <= 0) {
            compteurDrag = 0;
            reglerAffichageOverlay(overlayDeDepot, false);
        }
    });

    // Indique que le fichier peut être copié
    window.addEventListener('dragover', (e) => {
        e.dataTransfer.dropEffect = 'copy';
    });

    // Réception du fichier par glisser-déposer
    window.addEventListener('drop', (e) => {
        compteurDrag = 0;
        reglerAffichageOverlay(overlayDeDepot, false);

        const fichiers = e.dataTransfer.files;
        if (fichiers && fichiers.length > 0) {
            gererFichier(fichiers[0]);
        }
    });

    // Réception du fichier via le bouton classique
    champFichier.addEventListener('change', () => {
        if (champFichier.files.length > 0) {
            gererFichier(champFichier.files[0]);
        }
    });
}