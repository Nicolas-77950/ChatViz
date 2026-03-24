/**
 * import.js
 * Responsabilité : Gérer l'interface utilisateur du Drag & Drop et du bouton d'importation.
 */

import { analyserFichier } from './parser.js';
import { afficherCarteFichier } from './ui-file.js';

/**
 * Affiche ou cache l'overlav bleu lors du survol d'un fichier.
 * @param {HTMLElement} element - L'overlay cible.
 * @param {boolean} estVisible - L'état de visibilité souhaité.
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
 * Lit le fichier, l'analyse et lance l'affichage de l'interface d'analyse.
 * @param {File|Object} fichierARecevoir - Le fichier sélectionné.
 */
async function gererLeFichier(fichierARecevoir) {
    if (!fichierARecevoir.name || !fichierARecevoir.name.endsWith('.txt')) {
        // En cas de rechargement d'historique, le nom n'est pas forcément dans l'objet File classique
        const nomDuFichier = fichierARecevoir.name || "Discussion WhatsApp";
        if (nomDuFichier !== "Discussion WhatsApp" && !nomDuFichier.endsWith('.txt')) {
            alert("Oups ! Seuls les fichiers .txt sont acceptés.");
            return;
        }
    }

    const tableauMessages = await analyserFichier(fichierARecevoir);
    
    // Affichage immédiat de l'interface (Feedback instantané)
    afficherCarteFichier(fichierARecevoir.name || "Discussion chargée", tableauMessages);

    // Envoi silencieux au serveur pour l'historique (uniquement si c'est un vrai fichier importé)
    if (fichierARecevoir instanceof File) {
        sauvegarderVersLHistorique(fichierARecevoir);
    }
}

/**
 * Envoie le fichier au serveur pour l'ajouter à l'historique utilisateur.
 * @param {File} fichier - Le fichier brut à envoyer.
 */
async function sauvegarderVersLHistorique(fichier) {
    const donneesFormulaire = new FormData();
    donneesFormulaire.append('chat_file', fichier);
    donneesFormulaire.append('_token', document.querySelector('meta[name="csrf-token"]').content);

    try {
        const reponseServeur = await fetch('/analyze', {
            method: 'POST',
            body: donneesFormulaire,
            headers: {
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        });

        if (reponseServeur.ok) {
            console.log("[ChatViz] Fichier sauvegardé dans l'historique.");
        }
    } catch (erreur) {
        console.error("[ChatViz] Erreur de sauvegarde :", erreur);
    }
}

/**
 * Initialise les détecteurs d'événements (Drag&Drop + Clic).
 */
export function initImport() {
    const overlayDeDepot = document.getElementById('drop-overlay');
    const champFichier = document.getElementById('chat_file');

    if (!overlayDeDepot || !champFichier) return;

    let compteurDeDrag = 0;

    // Blocage par défaut
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(nomDAction => {
        window.addEventListener(nomDAction, (e) => {
            e.preventDefault();
            e.stopPropagation();
        }, false);
    });

    // Apparition de l'overlay au survol
    window.addEventListener('dragenter', () => {
        compteurDeDrag++;
        if (compteurDeDrag === 1) reglerAffichageOverlay(overlayDeDepot, true);
    });

    window.addEventListener('dragleave', () => {
        compteurDeDrag--;
        if (compteurDeDrag <= 0) {
            compteurDeDrag = 0;
            reglerAffichageOverlay(overlayDeDepot, false);
        }
    });

    window.addEventListener('dragover', (e) => {
        e.dataTransfer.dropEffect = 'copy';
    });

    window.addEventListener('drop', (e) => {
        compteurDeDrag = 0;
        reglerAffichageOverlay(overlayDeDepot, false);

        const listeFichiers = e.dataTransfer.files;
        if (listeFichiers && listeFichiers.length > 0) {
            gererLeFichier(listeFichiers[0]);
        }
    });

    champFichier.addEventListener('change', () => {
        if (champFichier.files.length > 0) {
            gererLeFichier(champFichier.files[0]);
        }
    });

    explorerLHistorique();
}

/**
 * Attache les événements aux boutons "Voir" de la liste d'historique.
 */
function explorerLHistorique() {
    const tousLesBoutonsVoir = document.querySelectorAll('.btn-voir-historique');
    
    tousLesBoutonsVoir.forEach(bouton => {
        bouton.addEventListener('click', async () => {
            const cheminDuFichier = bouton.getAttribute('data-path');
            const nomDuFichier = bouton.getAttribute('data-name');
            
            if (!cheminDuFichier) return;

            const texteOriginal = bouton.textContent;
            bouton.textContent = '...';
            bouton.disabled = true;

            try {
                const reponseSelection = await fetch(`/chat-content?path=${encodeURIComponent(cheminDuFichier)}`);
                if (!reponseSelection.ok) throw new Error('Impossible de charger le fichier.');
                
                const contenuTexte = await reponseSelection.text();
                
                // Simulation d'un fichier pour réutiliser la même logique
                const fauxFichier = { name: nomDuFichier, content: contenuTexte };
                await gererLeFichier(fauxFichier);
                
            } catch (err) {
                console.error(err);
                alert('Erreur lors du chargement de l\'historique.');
            } finally {
                bouton.textContent = texteOriginal;
                bouton.disabled = false;
            }
        });
    });
}