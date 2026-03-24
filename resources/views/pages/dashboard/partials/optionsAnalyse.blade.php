<!-- Template pour la sélection d'analyse après import -->
<template id="template-options-analyse">
    <div class="glass p-8 rounded-[2.5rem] border border-indigo-500/30 shadow-2xl bg-indigo-500/5 mb-8 animate-fade-in-up">
        
        <div class="flex items-center justify-between mb-8 pb-8 border-b border-white/5">
            <div class="flex items-center gap-4">
                <div class="size-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xl">
                    📄
                </div>
                <div>
                    <h3 class="text-xl font-bold text-white label-nom-fichier">Fichier prêt</h3>
                    <p class="text-slate-400 text-sm label-nombre-messages">0 messages lus.</p>
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
            <!-- Bouton Volume-Meter -->
            <div id="btn-volume-meter" class="bg-white/5 border border-white/10 hover:border-indigo-500/50 hover:bg-white/10 p-6 rounded-2xl transition cursor-pointer flex flex-col group">
                <span class="text-3xl mb-3">📊</span>
                <h4 class="text-lg font-bold text-white group-hover:text-indigo-400 transition">Volume-Meter</h4>
                <p class="text-slate-400 text-sm mt-2 mb-4">Répartition de la parole entre les participants.</p>
                <div class="mt-auto btn-primary px-4 py-2 rounded-full text-sm font-bold w-max mx-auto">Lancer</div>
            </div>

            <!-- Bouton Temps de réponse -->
            <div id="btn-temps-reponse" class="bg-white/5 border border-white/10 hover:border-indigo-500/50 hover:bg-white/10 p-6 rounded-2xl transition cursor-pointer flex flex-col group">
                <span class="text-3xl mb-3">⏱️</span>
                <h4 class="text-lg font-bold text-white group-hover:text-indigo-400 transition">Temps de réponse</h4>
                <p class="text-slate-400 text-sm mt-2 mb-4">Analyse des délais de réponse entre les participants.</p>
                <div class="mt-auto btn-primary px-4 py-2 rounded-full text-sm font-bold w-max mx-auto">Lancer</div>
            </div>
            
            <!-- Bouton Activité -->
            <div id="btn-activite" class="bg-white/5 border border-white/10 hover:border-indigo-500/50 hover:bg-white/10 p-6 rounded-2xl transition cursor-pointer flex flex-col group">
                <span class="text-3xl mb-3">📈</span>
                <h4 class="text-lg font-bold text-white group-hover:text-indigo-400 transition">Activité</h4>
                <p class="text-slate-400 text-sm mt-2 mb-4">Statistiques sur les périodes d'activité et d'échange.</p>
                <div class="mt-auto btn-primary px-4 py-2 rounded-full text-sm font-bold w-max mx-auto">Lancer</div>
            </div>

            <!-- Bouton Émojis -->
            <div id="btn-emojis" class="bg-white/5 border border-white/10 hover:border-indigo-500/50 hover:bg-white/10 p-6 rounded-2xl transition cursor-pointer flex flex-col group">
                <span class="text-3xl mb-3">😂</span>
                <h4 class="text-lg font-bold text-white group-hover:text-indigo-400 transition">Émojis</h4>
                <p class="text-slate-400 text-sm mt-2 mb-4">Le top 5 des émojis les plus utilisés par chacun.</p>
                <div class="mt-auto btn-primary px-4 py-2 rounded-full text-sm font-bold w-max mx-auto">Lancer</div>
            </div>
        </div>
        
        <!-- Zone de rendu spécifique -->
        <div id="conteneur-resultat-specifique" class="mt-8"></div>
    </div>
</template>
