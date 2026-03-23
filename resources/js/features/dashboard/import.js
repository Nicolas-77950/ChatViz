
import { parseChat } from './parser.js';

// Stockage des messages en mémoire après le parsing
let chatMessages = [];

/**
 * Gère l'affichage de l'overlay de drag & drop
 */
function setOverlayVisible(visible) {
    const overlay = document.getElementById('drop-overlay');
    if (!overlay) return;
    if (visible) {
        overlay.classList.remove('opacity-0', 'pointer-events-none');
        overlay.classList.add('opacity-100');
    } else {
        overlay.classList.remove('opacity-100');
        overlay.classList.add('opacity-0', 'pointer-events-none');
    }
}

/**
 * Analyse le fichier texte et prépare les données
 */
async function handleFile(file) {
    if (!file.name.toLowerCase().endsWith('.txt')) {
        alert('Seuls les fichiers .txt sont acceptés.');
        return;
    }

    try {
        // On utilise ton parser.js pour transformer le texte en objets
        chatMessages = await parseChat(file);
        
        // Mise à jour visuelle du nom du fichier
        const fileNameLabel = document.getElementById('file-name');
        if (fileNameLabel) {
            fileNameLabel.innerText = file.name;
            fileNameLabel.classList.replace('text-slate-500', 'text-indigo-400');
        }

        // Activation du bouton d'analyse
        const analyzeBtn = document.getElementById('btn-analyze');
        if (analyzeBtn && chatMessages.length > 0) {
            analyzeBtn.disabled = false;
            analyzeBtn.classList.remove('opacity-30', 'cursor-not-allowed');
            analyzeBtn.classList.add('bg-indigo-600', 'hover:bg-indigo-500');
        }

        console.log(`[ChatViz] ${chatMessages.length} messages chargés.`);
    } catch (error) {
        console.error('[ChatViz] Erreur de parsing:', error);
        alert('Erreur lors de la lecture du fichier.');
    }
}

/**
 * Envoie les données au contrôleur Laravel
 */
async function sendToAI() {
    const resultArea = document.getElementById('verdict-content');
    const userQuestionInput = document.getElementById('user-question');
    const analyzeBtn = document.getElementById('btn-analyze');
    const loader = document.getElementById('loader');
    const btnText = document.getElementById('btn-text');

    if (chatMessages.length === 0) return;

    // Préparation de l'interface (chargement)
    if (resultArea) {
        resultArea.classList.remove('italic', 'text-slate-400', 'text-left', 'items-start');
        resultArea.classList.add('flex', 'items-center', 'justify-center'); // Centre le loader
        resultArea.innerHTML = `
            <div class="flex flex-col items-center justify-center space-y-4 text-indigo-400 animate-pulse">
                <svg class="animate-spin h-8 w-8" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span class="font-medium">ChatViz analyse votre conversation...</span>
            </div>`;
    }
    
    if (loader) loader.classList.remove('hidden');
    if (btnText) btnText.innerText = "IA en réflexion...";
    if (analyzeBtn) analyzeBtn.disabled = true;

    try {
        const response = await fetch('/analyze-ai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            body: JSON.stringify({
                messages: chatMessages, 
                user_message: userQuestionInput?.value || "" 
            })
        });

        const data = await response.json();

        if (response.ok && data.verdict) {
            if (resultArea) {
                // Nettoyage des classes de centrage du loader
                resultArea.classList.remove('flex', 'items-center', 'justify-center');
                resultArea.classList.add('text-left', 'items-start', 'block', 'w-full');
                
                // RENDU MARKDOWN : On utilise marked.parse()
                // On ajoute 'prose prose-invert' pour un style automatique si tu as le plugin Tailwind Typography
                resultArea.innerHTML = `<div class="prose prose-invert max-w-none w-full">${marked.parse(data.verdict)}</div>`;
            }
        } else {
            throw new Error(data.error || "L'IA n'a pas pu répondre.");
        }

    } catch (error) {
        console.error('[ChatViz] Erreur API:', error);
        if (resultArea) {
            resultArea.classList.remove('flex', 'items-center', 'justify-center');
            resultArea.innerHTML = `<p class="text-red-500 italic font-medium">⚠️ Erreur: ${error.message}</p>`;
        }
    } finally {
        if (analyzeBtn) analyzeBtn.disabled = false;
        if (loader) loader.classList.add('hidden');
        if (btnText) btnText.innerText = "Lancer l'Analyse";
    }
}

/**
 * Initialisation des événements
 */
export function initImport() {
    const fileInput = document.getElementById('chat_file');
    const analyzeBtn = document.getElementById('btn-analyze');

    if (!fileInput) return;

    // --- Drag & Drop ---
    let dragCounter = 0;
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(name => {
        window.addEventListener(name, (e) => { e.preventDefault(); e.stopPropagation(); });
    });

    window.addEventListener('dragenter', () => {
        dragCounter++;
        if (dragCounter === 1) setOverlayVisible(true);
    });

    window.addEventListener('dragleave', () => {
        dragCounter--;
        if (dragCounter <= 0) {
            dragCounter = 0;
            setOverlayVisible(false);
        }
    });
    
    window.addEventListener('drop', (e) => {
        dragCounter = 0;
        setOverlayVisible(false);
        const files = e.dataTransfer.files;
        if (files.length > 0) handleFile(files[0]);
    });

    // --- Clics et changement ---
    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) handleFile(fileInput.files[0]);
    });

    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', sendToAI);
    }
}