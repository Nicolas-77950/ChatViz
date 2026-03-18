/**
 * ui.js
 * Ce fichier gère l'affichage à l'écran UNE FOIS que le fichier txt est importé.
 * Au lieu de voir l'historique, on va voir le fichier chargé et choisir notre analyse !
 */

import { calculateResponseTime } from './stats/responseTime.js';
import { renderResponseTime } from './stats/renderResponseTime.js';

export function showFileCard(filename, messages) {
    // On cherche la grande div vide qu'on a créée dans dashboard.blade.php
    const container = document.getElementById('results-container');
    const historyContainer = document.getElementById('history-container');

    if (!container) return; // Si la div n'existe pas, on arrête tout.

    // On la rend visible (on retire la classe "hidden" de Tailwind)
    container.classList.remove('hidden');

    // On cache l'historique
    if (historyContainer) historyContainer.classList.add('hidden');

    // On injecte du code HTML directement dedans avec .innerHTML
    container.innerHTML = `
        <div class="glass p-8 rounded-[2.5rem] border border-indigo-500/30 shadow-2xl bg-indigo-500/5 mb-8">
            
            <!-- A. CARTE DU FICHIER CHARGÉ -->
            <div class="flex items-center justify-between mb-8 pb-8 border-b border-white/5">
                <div class="flex items-center gap-4">
                    <div class="size-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xl">
                        📄
                    </div>
                    <div>
                        <h3 class="text-xl font-bold text-white">Fichier prêt : ${filename}</h3>
                        <p class="text-slate-400 text-sm">${messages.length} messages ont été lus avec succès.</p>
                    </div>
                </div>
                
                <!-- Bouton Croix pour tout fermer -->
                <button id="btn-fermer-analyse" class="bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white p-2 rounded-xl transition">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <!-- B. CHOIX DE L'ANALYSE -->
            <p class="text-slate-300 font-medium mb-4">Choisissez l'analyse que vous voulez lancer :</p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <!-- Le bouton pour "Temps de Réponse" -->
                <div id="btn-temps-reponse" class="bg-white/5 border border-white/10 hover:border-indigo-500/50 hover:bg-white/10 p-6 rounded-2xl transition cursor-pointer flex flex-col group">
                    <span class="text-3xl mb-3">⏱️</span>
                    <h4 class="text-lg font-bold text-white group-hover:text-indigo-400 transition">Temps de réponse</h4>
                    <p class="text-slate-400 text-sm mt-2 mb-4">Découvrez qui fait le plus patienter l'autre avec les temps d'attente moyens.</p>
                    <div class="mt-auto btn-primary px-4 py-2 rounded-full text-sm font-bold w-max mx-auto">Lancer l'analyse</div>
                </div>
                
                <!-- Une fausse carte pour montrer qu'on pourra en faire d'autres (désactivée) -->
                <div class="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col items-start opacity-50 cursor-not-allowed">
                    <span class="text-3xl mb-3">📊</span>
                    <h4 class="text-lg font-bold text-white">Activité (Prochainement)</h4>
                    <p class="text-slate-400 text-sm mt-2 mb-4">Savoir à quelle heure vous parlez le plus, qui parle le plus, etc.</p>
                    <div class="mt-auto bg-white/10 text-white/50 px-4 py-2 rounded-full text-sm font-bold w-max mx-auto">Bientôt 🔒</div>
                </div>
            </div>
            
            <!-- C. Conteneur final où on affichera le résultat quand on cliquera sur "Lancer l'analyse" -->
            <div id="conteneur-resultat-specifique" class="mt-8"></div>

        </div>
    `;

    // On ajoute les clics 

    // Si on clique sur la croix "Fermer" -> on efface tout, on recache la zone et on remet l'historique
    document.getElementById('btn-fermer-analyse').addEventListener('click', () => {
        container.innerHTML = ''; // on vide le HTML
        container.classList.add('hidden'); // on recache notre zone
        
        // On réaffiche la grande case d'historique (les "importations récentes")
        if (historyContainer) historyContainer.classList.remove('hidden');
    });

    // Si on clique sur la carte "Temps de réponse" -> on lance notre algo !
    document.getElementById('btn-temps-reponse').addEventListener('click', () => {
        // A. On lance notre algorithme mathématique fraîchement codé !
        const resultats = calculateResponseTime(messages);

        // B. On le dessine à l'écran dans le "conteneur-resultat-specifique"
        renderResponseTime(resultats, 'conteneur-resultat-specifique');
    });
}
