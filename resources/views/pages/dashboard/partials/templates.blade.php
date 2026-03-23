<!-- Template pour le conteneur global des résultats de temps de réponse -->
<template id="template-resultats-temps-reponse">
    <div class="border-t border-white/10 pt-8 mt-12 animate-fade-in-up">
        <h3 class="text-2xl font-bold text-white mb-6 flex items-center gap-3 pt-6">
            <span class="bg-indigo-500/20 text-indigo-400 p-3 rounded-xl shadow-inner">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            </span> 
            <span>Résultats du Temps de Réponse</span>
        </h3>
        
        <!-- Zone où seront injectées les cartes des participants -->
        <div class="flex flex-col md:flex-row gap-6 mb-10 zone-cartes-auteurs"></div>

        <!-- Zone du Top 5 -->
        <div>
            <h4 class="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 px-2">🏆 Top 5 des records d'attente (nuits exclues)</h4>
            <div class="bg-black/20 rounded-2xl border border-white/5 overflow-hidden zone-top5"></div>
        </div>
    </div>
</template>

<!-- Template pour une carte de statistiques d'un participant -->
<template id="template-carte-auteur">
    <div class="bg-black/20 rounded-xl p-5 border border-white/5 flex-1 relative overflow-hidden group">
        <div class="absolute -top-10 -right-10 size-20 bg-indigo-500/10 blur-3xl rounded-full group-hover:bg-indigo-500/30 transition-all"></div>
        
        <div class="flex items-center gap-3 mb-4">
            <div class="size-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                <span class="initiales-auteur"></span>
            </div>
            <h5 class="text-xl font-bold text-white nom-auteur"></h5>
        </div>
        
        <div class="space-y-2 relative z-10">
            <div class="flex justify-between items-center bg-white/5 border border-white/5 hover:bg-white/10 transition px-3 py-2 rounded-lg">
                <span class="text-sm text-slate-400">Moyenne</span>
                <span class="font-bold text-indigo-400 text-lg moyenne-formatee"></span>
            </div>
            
            <div class="flex justify-between items-center bg-white/5 px-3 py-2 rounded-lg border border-white/5 hover:bg-white/10 transition">
                <span class="text-sm text-slate-400">Temps total</span>
                <span class="font-bold text-white total-formate"></span>
            </div>
            
            <div class="flex justify-between items-center bg-white/5 px-3 py-2 rounded-lg border border-white/5 hover:bg-white/10 transition">
                <span class="text-sm text-slate-400">Réponses</span>
                <span class="font-bold text-slate-200 nombre-reponses"></span>
            </div>
        </div>
    </div>
</template>

<!-- Template pour une ligne du Top 5 -->
<template id="template-ligne-top5">
    <div class="flex items-center justify-between hover:bg-white/10 transition px-4 py-3 rounded-lg border-b border-white/5 last:border-0">
        <div class="flex items-center gap-3">
            <span class="font-bold text-slate-500 w-4 tracking-tighter rang-top5"></span>
            <span class="font-bold text-slate-200 text-lg nom-auteur-top5"></span>
            <span class="text-slate-500 text-sm">a fait poireauter... l'autre</span>
        </div>
        <span class="font-bold text-red-400/90 bg-red-400/10 px-4 py-1.5 rounded-full text-sm duree-formatee-top5"></span>
    </div>
</template>