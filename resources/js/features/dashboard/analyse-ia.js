import { analyserFichier } from './parser.js';

// Stockage des messages en mémoire après le décodage
let messagesDeLaDiscussion = [];

/**
 * Gère l'affichage de l'overlay bleu lors du Drag & Drop.
 */
function reglerVisibiliteOverlay(estVisible) {
    const elementOverlay = document.getElementById('drop-overlay');
    if (!elementOverlay) return;
    if (estVisible) {
        elementOverlay.classList.remove('opacity-0', 'pointer-events-none');
        elementOverlay.classList.add('opacity-100');
    } else {
        elementOverlay.classList.remove('opacity-100');
        elementOverlay.classList.add('opacity-0', 'pointer-events-none');
    }
}

/**
 * Analyse le fichier texte et prépare les données pour l'IA.
 * @param {File} fichierImporte
 */
async function traiterLeFichier(fichierImporte) {
    if (!fichierImporte.name.toLowerCase().endsWith('.txt')) {
        alert('Seuls les fichiers .txt sont acceptés.');
        return;
    }

    try {
        // Décodage du texte via le parser commun
        messagesDeLaDiscussion = await analyserFichier(fichierImporte);
        
        // Mise à jour de l'affichage du nom
        const labelNomFichier = document.getElementById('file-name');
        if (labelNomFichier) {
            labelNomFichier.innerText = fichierImporte.name;
            labelNomFichier.classList.replace('text-slate-500', 'text-indigo-400');
        }

        // Activation du bouton d'analyse par l'IA
        const boutonAnalyse = document.getElementById('btn-analyze');
        if (boutonAnalyse && messagesDeLaDiscussion.length > 0) {
            boutonAnalyse.disabled = false;
            boutonAnalyse.classList.remove('opacity-30', 'cursor-not-allowed');
            boutonAnalyse.classList.add('bg-indigo-600', 'hover:bg-indigo-500');
        }

        console.log(`[ChatViz] ${messagesDeLaDiscussion.length} messages chargés pour l'IA.`);
    } catch (erreur) {
        console.error('[ChatViz] Erreur de préparation :', erreur);
        alert('Erreur lors de la lecture du fichier.');
    }
}

/**
 * Envoie la discussion au serveur pour obtenir le verdict de Gemini.
 */
async function envoyerALIntelligenceArtificielle() {
    const zoneVerdict = document.getElementById('verdict-content');
    const champQuestion = document.getElementById('user-question');
    const boutonAnalyse = document.getElementById('btn-analyze');
    const elementLoader = document.getElementById('loader');
    const texteBouton = document.getElementById('btn-text');

    if (messagesDeLaDiscussion.length === 0) return;

    // Mise en place de l'état de chargement
    if (zoneVerdict) {
        zoneVerdict.classList.remove('italic', 'text-slate-400', 'text-left', 'items-start');
        zoneVerdict.classList.add('flex', 'items-center', 'justify-center');
        zoneVerdict.innerHTML = `
            <div class="flex flex-col items-center justify-center space-y-4 text-indigo-400 animate-pulse">
                <svg class="animate-spin h-8 w-8" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span class="font-medium">ChatViz analyse votre conversation...</span>
            </div>`;
    }
    
    if (elementLoader) elementLoader.classList.remove('hidden');
    if (texteBouton) texteBouton.innerText = "IA en réflexion...";
    if (boutonAnalyse) boutonAnalyse.disabled = true;

    try {
        const reponseAi = await fetch('/analyze-ai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            body: JSON.stringify({
                messages: messagesDeLaDiscussion, 
                user_message: champQuestion?.value || "" 
            })
        });

        const donneesRecues = await reponseAi.json();

        if (reponseAi.ok && donneesRecues.verdict) {
            if (zoneVerdict) {
                zoneVerdict.classList.remove('flex', 'items-center', 'justify-center');
                zoneVerdict.classList.add('text-left', 'items-start', 'block', 'w-full');
                
                // Rendu final en Markdown
                zoneVerdict.innerHTML = `<div class="prose prose-invert max-w-none w-full">${marked.parse(donneesRecues.verdict)}</div>`;
            }
        } else {
            const messageErreur = donneesRecues.error || "L'IA Locale n'a pas pu répondre.";
            const detailsErreur = donneesRecues.details ? JSON.stringify(donneesRecues.details, null, 2) : "";
            throw new Error(messageErreur + (detailsErreur ? "\n" + detailsErreur : ""));
        }

    } catch (erreur) {
        console.error('[ChatViz] Erreur API :', erreur);
        if (zoneVerdict) {
            zoneVerdict.classList.remove('flex', 'items-center', 'justify-center');
            zoneVerdict.innerHTML = `<p class="text-red-500 italic font-medium">⚠️ Erreur: ${erreur.message}</p>`;
        }
    } finally {
        if (boutonAnalyse) boutonAnalyse.disabled = false;
        if (elementLoader) elementLoader.classList.add('hidden');
        if (texteBouton) texteBouton.innerText = "Lancer l'Analyse";
    }
}

/**
 * Initialise les détecteurs d'événements pour la page d'IA.
 */
export function initialiserLAnalyseIA() {
    const selecteurFichier = document.getElementById('chat_file');
    const boutonLancerAnalyse = document.getElementById('btn-analyze');

    if (!selecteurFichier) return;

    // --- Glisser-Déposer ---
    let compteurSaisie = 0;
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(nomAction => {
        window.addEventListener(nomAction, (e) => { e.preventDefault(); e.stopPropagation(); });
    });

    window.addEventListener('dragenter', () => {
        compteurSaisie++;
        if (compteurSaisie === 1) reglerVisibiliteOverlay(true);
    });

    window.addEventListener('dragleave', () => {
        compteurSaisie--;
        if (compteurSaisie <= 0) {
            compteurSaisie = 0;
            reglerVisibiliteOverlay(false);
        }
    });
    
    window.addEventListener('drop', (e) => {
        compteurSaisie = 0;
        reglerVisibiliteOverlay(false);
        const fichiersRecus = e.dataTransfer.files;
        if (fichiersRecus.length > 0) traiterLeFichier(fichiersRecus[0]);
    });

    // --- Sélection manuelle ---
    selecteurFichier.addEventListener('change', () => {
        if (selecteurFichier.files.length > 0) traiterLeFichier(selecteurFichier.files[0]);
    });

    if (boutonLancerAnalyse) {
        boutonLancerAnalyse.addEventListener('click', envoyerALIntelligenceArtificielle);
    }
}

// Initialisation automatique au chargement du script
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('btn-analyze')) {
        initialiserLAnalyseIA();
    }
});
