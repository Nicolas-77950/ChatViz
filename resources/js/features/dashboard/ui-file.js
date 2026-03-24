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
 * @param {Array} messages - Liste des messages.
 */
export function afficherCarteFichier(nomFichier, messages) {
    const conteneurDirect = document.getElementById('results-container');
    const conteneurHistorique = document.getElementById('history-container');

    if (!conteneurDirect) return;

    conteneurDirect.classList.remove('hidden');
    if (conteneurHistorique) conteneurHistorique.classList.add('hidden');

    conteneurDirect.innerHTML = `
        <div class="glass p-8 rounded-[2.5rem] border border-indigo-500/30 shadow-2xl bg-indigo-500/5 mb-8">
            
            <div class="flex items-center justify-between mb-8 pb-8 border-b border-white/5">
                <div class="flex items-center gap-4">
                    <div class="size-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xl">
                        📄
                    </div>
                    <div>
                        <h3 class="text-xl font-bold text-white">Fichier prêt : ${nomFichier}</h3>
                        <p class="text-slate-400 text-sm">${messages.length} messages lus.</p>
                    </div>
                </div>
                
                <button id="btn-fermer-analyse" class="bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white p-2 rounded-xl transition">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <p class="text-slate-300 font-medium mb-4">Analyse disponible :</p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div id="btn-volume-meter" class="bg-white/5 border border-white/10 hover:border-indigo-500/50 hover:bg-white/10 p-6 rounded-2xl transition cursor-pointer flex flex-col group">
                    <span class="text-3xl mb-3">📊</span>
                    <h4 class="text-lg font-bold text-white group-hover:text-indigo-400 transition">Volume-Meter</h4>
                    <p class="text-slate-400 text-sm mt-2 mb-4">Répartition de la parole entre les participants.</p>
                    <div class="mt-auto btn-primary px-4 py-2 rounded-full text-sm font-bold w-max mx-auto">Lancer</div>
                </div>

                <div id="btn-temps-reponse" class="bg-white/5 border border-white/10 hover:border-indigo-500/50 hover:bg-white/10 p-6 rounded-2xl transition cursor-pointer flex flex-col group">
                    <span class="text-3xl mb-3">⏱️</span>
                    <h4 class="text-lg font-bold text-white group-hover:text-indigo-400 transition">Temps de réponse</h4>
                    <p class="text-slate-400 text-sm mt-2 mb-4">Analyse des délais de réponse entre les participants.</p>
                    <div class="mt-auto btn-primary px-4 py-2 rounded-full text-sm font-bold w-max mx-auto">Lancer</div>
                </div>
                
                <div id="btn-activite" class="bg-white/5 border border-white/10 hover:border-indigo-500/50 hover:bg-white/10 p-6 rounded-2xl transition cursor-pointer flex flex-col group">
                    <span class="text-3xl mb-3">📈</span>
                    <h4 class="text-lg font-bold text-white group-hover:text-indigo-400 transition">Activité</h4>
                    <p class="text-slate-400 text-sm mt-2 mb-4">Statistiques sur les périodes d'activité et d'échange.</p>
                    <div class="mt-auto btn-primary px-4 py-2 rounded-full text-sm font-bold w-max mx-auto">Lancer</div>
                </div>

                <div id="btn-emojis" class="bg-white/5 border border-white/10 hover:border-indigo-500/50 hover:bg-white/10 p-6 rounded-2xl transition cursor-pointer flex flex-col group">
                    <span class="text-3xl mb-3">😂</span>
                    <h4 class="text-lg font-bold text-white group-hover:text-indigo-400 transition">Émojis</h4>
                    <p class="text-slate-400 text-sm mt-2 mb-4">Le top 5 des émojis les plus utilisés par chacun.</p>
                    <div class="mt-auto btn-primary px-4 py-2 rounded-full text-sm font-bold w-max mx-auto">Lancer</div>
                </div>
            </div>
            
            <div id="conteneur-resultat-specifique" class="mt-8"></div>
        </div>
    `;

    document.getElementById('btn-fermer-analyse').addEventListener('click', () => {
        conteneurDirect.innerHTML = '';
        conteneurDirect.classList.add('hidden');
        if (conteneurHistorique) conteneurHistorique.classList.remove('hidden');
    });

    document.getElementById('btn-volume-meter').addEventListener('click', () => {
        const resultats = calculerVolumeMeter(messages);
        afficherVolumeMeter(resultats, 'conteneur-resultat-specifique');
    });

    document.getElementById('btn-temps-reponse').addEventListener('click', () => {
        const resultats = calculerTempsReponse(messages);
        afficherTempsReponse(resultats, 'conteneur-resultat-specifique');
    });

    document.getElementById('btn-activite').addEventListener('click', () => {
        const resultats = calculerActivite(messages);
        afficherActivite(resultats, 'conteneur-resultat-specifique');
    });

    document.getElementById('btn-emojis').addEventListener('click', () => {
        const resultats = calculerEmojis(messages);
        afficherEmojis(resultats, 'conteneur-resultat-specifique');
    });
}

