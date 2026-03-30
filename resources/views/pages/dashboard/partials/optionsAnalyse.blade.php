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

        <!-- ====== SECTION 1 : Analyses Algorithmiques ====== -->
        <div class="mb-10">
            <div class="flex items-center gap-3 mb-5">
                <span class="bg-emerald-500/10 text-emerald-400 p-2 rounded-lg text-lg">📊</span>
                <div>
                    <p class="text-white font-bold">Analyses Algorithmiques</p>
                    <p class="text-slate-500 text-xs">Instantanées · 100% côté navigateur</p>
                </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <!-- Bouton Volume-Meter -->
                <div id="btn-volume-meter" class="bg-white/5 border border-white/10 hover:border-emerald-500/50 hover:bg-white/10 p-6 rounded-2xl transition cursor-pointer flex flex-col group">
                    <span class="text-3xl mb-3">📊</span>
                    <h4 class="text-lg font-bold text-white group-hover:text-emerald-400 transition">Volume-Meter</h4>
                    <p class="text-slate-400 text-sm mt-2 mb-4">Répartition de la parole entre les participants.</p>
                    <div class="mt-auto bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full text-sm font-bold w-max mx-auto">Lancer</div>
                </div>

                <!-- Bouton Temps de réponse -->
                <div id="btn-temps-reponse" class="bg-white/5 border border-white/10 hover:border-emerald-500/50 hover:bg-white/10 p-6 rounded-2xl transition cursor-pointer flex flex-col group">
                    <span class="text-3xl mb-3">⏱️</span>
                    <h4 class="text-lg font-bold text-white group-hover:text-emerald-400 transition">Temps de réponse</h4>
                    <p class="text-slate-400 text-sm mt-2 mb-4">Analyse des délais de réponse entre les participants.</p>
                    <div class="mt-auto bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full text-sm font-bold w-max mx-auto">Lancer</div>
                </div>
                
                <!-- Bouton Activité -->
                <div id="btn-activite" class="bg-white/5 border border-white/10 hover:border-emerald-500/50 hover:bg-white/10 p-6 rounded-2xl transition cursor-pointer flex flex-col group">
                    <span class="text-3xl mb-3">📈</span>
                    <h4 class="text-lg font-bold text-white group-hover:text-emerald-400 transition">Activité</h4>
                    <p class="text-slate-400 text-sm mt-2 mb-4">Statistiques sur les périodes d'activité et d'échange.</p>
                    <div class="mt-auto bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full text-sm font-bold w-max mx-auto">Lancer</div>
                </div>

                <!-- Bouton Émojis -->
                <div id="btn-emojis" class="bg-white/5 border border-white/10 hover:border-emerald-500/50 hover:bg-white/10 p-6 rounded-2xl transition cursor-pointer flex flex-col group">
                    <span class="text-3xl mb-3">😂</span>
                    <h4 class="text-lg font-bold text-white group-hover:text-emerald-400 transition">Émojis</h4>
                    <p class="text-slate-400 text-sm mt-2 mb-4">Le top 5 des émojis les plus utilisés par chacun.</p>
                    <div class="mt-auto bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full text-sm font-bold w-max mx-auto">Lancer</div>
                </div>
            </div>
        </div>

        <!-- ====== SECTION 2 : Analyses par IA ====== -->
        <div>
            <div class="flex items-center justify-between mb-5">
                <div class="flex items-center gap-3">
                    <span class="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 text-indigo-400 p-2 rounded-lg text-lg">🧠</span>
                    <div>
                        <p class="text-white font-bold">Analyses par IA</p>
                        <p class="text-slate-500 text-xs">Propulsé par Ollama · 100% local · RGPD 🔒</p>
                    </div>
                </div>
                <span class="text-[10px] font-bold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">IA Locale</span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Bouton Chances Amoureuses -->
                <div id="btn-ia-amour" class="bg-gradient-to-br from-pink-500/5 to-indigo-500/5 border border-white/10 hover:border-pink-500/50 hover:from-pink-500/10 hover:to-indigo-500/10 p-6 rounded-2xl transition-all cursor-pointer flex flex-col group relative overflow-hidden">
                    <div class="absolute -top-8 -right-8 size-24 bg-pink-500/5 blur-2xl rounded-full group-hover:bg-pink-500/15 transition-all"></div>
                    <span class="text-3xl mb-3 relative z-10">💘</span>
                    <h4 class="text-lg font-bold text-white group-hover:text-pink-400 transition relative z-10">Chances Amoureuses</h4>
                    <p class="text-slate-400 text-sm mt-2 mb-4 relative z-10">Évalue les signaux amoureux entre les participants.</p>
                    <div class="mt-auto btn-primary px-4 py-2 rounded-full text-sm font-bold w-max mx-auto relative z-10">Analyser</div>
                </div>

                <!-- Bouton Engagement -->
                <div id="btn-ia-engagement" class="bg-gradient-to-br from-orange-500/5 to-amber-500/5 border border-white/10 hover:border-orange-500/50 hover:from-orange-500/10 hover:to-amber-500/10 p-6 rounded-2xl transition-all cursor-pointer flex flex-col group relative overflow-hidden">
                    <div class="absolute -top-8 -right-8 size-24 bg-orange-500/5 blur-2xl rounded-full group-hover:bg-orange-500/15 transition-all"></div>
                    <span class="text-3xl mb-3 relative z-10">🔥</span>
                    <h4 class="text-lg font-bold text-white group-hover:text-orange-400 transition relative z-10">Niveau d'Engagement</h4>
                    <p class="text-slate-400 text-sm mt-2 mb-4 relative z-10">Mesure l'investissement émotionnel de chacun.</p>
                    <div class="mt-auto btn-primary px-4 py-2 rounded-full text-sm font-bold w-max mx-auto relative z-10">Analyser</div>
                </div>
            </div>
        </div>
        
        <!-- Zone de rendu spécifique -->
        <div id="conteneur-resultat-specifique" class="mt-8"></div>
    </div>
</template>
