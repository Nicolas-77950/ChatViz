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
    
    // Affichage immédiat de l'interface d'analyse (Feedback instantané)
    afficherCarteFichier(fichier.name, messages);

    // Envoi silencieux au serveur pour l'historique
    sauvegarderVersHistorique(fichier);
}

/**
 * Envoie le fichier au serveur pour qu'il apparaisse dans l'historique.
 * @param {File} fichier 
 */
async function sauvegarderVersHistorique(fichier) {
    const formData = new FormData();
    formData.append('chat_file', fichier);
    formData.append('_token', document.querySelector('meta[name="csrf-token"]').content);

    try {
        const reponse = await fetch('/analyze', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        });

        if (reponse.ok) {
            console.log("Fichier sauvegardé dans l'historique.");
            // On pourrait rafraîchir la liste de l'historique ici si besoin
        }
    } catch (error) {
        console.error("Erreur lors de la sauvegarde :", error);
    }
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

    // Activation des boutons de l'historique existant
    explorerHistorique();
}

/**
 * Attache les événements aux boutons "Voir" de la liste d'historique (Blade).
 */
function explorerHistorique() {
    const boutonsVoir = document.querySelectorAll('.btn-voir-historique');
    
    boutonsVoir.forEach(bouton => {
        bouton.addEventListener('click', async (e) => {
            const chemin = bouton.getAttribute('data-path');
            const nom = bouton.getAttribute('data-name');
            
            if (!chemin) return;

            // Petit effet de chargement sur le bouton
            const texteOrigine = bouton.textContent;
            bouton.textContent = '...';
            bouton.disabled = true;

            try {
                const reponse = await fetch(`/chat-content?path=${encodeURIComponent(chemin)}`);
                if (!reponse.ok) throw new Error('Erreur lors de la récupération');
                
                const texte = await reponse.text();
                
                // On crée un faux objet File pour réutiliser gererFichier ou on appelle directement l'analyse
                // Option simple : on simule l'objet fichier
                const fauxFichier = { name: nom, content: texte };
                
                // On réutilise la logique avec l'import statique du haut de fichier
                const messages = await analyserFichier(fauxFichier);
                afficherCarteFichier(nom, messages);
                
            } catch (err) {
                console.error(err);
                alert('Impossible de charger ce fichier.');
            } finally {
                bouton.textContent = texteOrigine;
                bouton.disabled = false;
            }
        });
    });
}