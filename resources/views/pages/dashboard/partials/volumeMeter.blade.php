<!-- Templates pour l'Analyse du Volume de Parole -->
<template id="template-resultats-volume">
    <div class="border-t border-white/10 pt-12 mt-12 animate-fade-in-up">
        
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
            <div class="flex items-center gap-4">
                <span class="bg-indigo-500/20 text-indigo-400 p-4 rounded-2xl shadow-inner border border-indigo-500/20">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
                    </svg>
                </span> 
                <div>
                    <h3 class="text-2xl font-bold text-white">Répartition de la parole</h3>
                    <p class="text-slate-400 text-sm">Analyse visuelle du volume de messages</p>
                </div>
            </div>
            <div class="bg-indigo-500/10 border border-indigo-500/20 px-6 py-3 rounded-2xl shadow-lg">
                <span class="text-indigo-400 font-black text-2xl val-total-messages">0</span>
                <span class="text-indigo-300/60 text-xs font-bold uppercase tracking-widest ml-2">Total messages</span>
            </div>
        </div>

        <!-- Grille de graphiques -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            
            <!-- Bloc A : Le Donut (SVG) -->
            <div class="bg-black/20 rounded-[2.5rem] p-8 border border-white/5 flex flex-col items-center">
                <h4 class="text-xs font-bold uppercase tracking-widest text-slate-500 mb-10 self-start px-2 flex items-center gap-2">
                    <span class="size-1.5 bg-indigo-500 rounded-full animate-pulse"></span>
                    Graphique en anneau (Donut)
                </h4>
                <div class="flex flex-col xl:flex-row items-center justify-center w-full gap-12">
                    <!-- SVG Donut -->
                    <div class="relative size-64 flex-shrink-0">
                        <svg viewBox="0 0 100 100" class="w-full h-full -rotate-90">
                            <!-- Background circle -->
                            <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="12" />
                            <g class="zone-donut-segments"></g>
                        </svg>
                        <!-- Center Label -->
                        <div class="absolute inset-0 flex flex-col items-center justify-center rotate-0">
                            <span class="text-white font-black text-3xl">VS</span>
                            <span class="text-slate-500 text-[10px] uppercase font-bold tracking-widest">Part de voix</span>
                        </div>
                    </div>

                    <!-- Légende Donut -->
                    <div class="flex-1 w-full flex flex-col gap-3">
                        <div class="flex items-center gap-2 mb-2">
                             <span class="size-1.5 bg-slate-600 rounded-full"></span>
                             <h5 class="text-[10px] font-black uppercase tracking-widest text-slate-500">Légende des couleurs</h5>
                        </div>
                        <div class="grid grid-cols-1 gap-2 zone-legende-donut">
                            <!-- Les légendes seront ici -->
                        </div>
                    </div>
                </div>
            </div>

            <!-- Bloc B : Barres de Comparaison -->
            <div class="bg-black/20 rounded-[2.5rem] p-8 border border-white/5">
                <h4 class="text-xs font-bold uppercase tracking-widest text-slate-500 mb-10 px-2 flex items-center gap-2">
                    <span class="size-1.5 bg-pink-500 rounded-full"></span>
                    Comparaison directe
                </h4>
                <div class="space-y-10 zone-fgraphique-barres">
                    <!-- Les barres seront ici -->
                </div>
            </div>

        </div>

        <!-- Résumé Brut -->
        <div class="bg-indigo-500/5 rounded-[2rem] p-8 border border-indigo-500/20">
            <div class="flex items-center gap-3 mb-8">
                <div class="size-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
                    </svg>
                </div>
                <div>
                    <h4 class="text-lg font-bold text-white">Chiffres bruts par auteur</h4>
                    <p class="text-slate-500 text-xs">Données exactes calculées à partir du fichier</p>
                </div>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 zone-chiffres-bruts">
                <!-- Les mini-cartes brutes seront ici -->
            </div>
        </div>

    </div>
</template>

<!-- Sous-template pour une barre de comparaison -->
<template id="template-barre-volume">
    <div class="group">
        <div class="flex justify-between items-center text-sm mb-2">
            <div class="flex items-center gap-2">
                <span class="font-bold text-slate-200 group-hover:text-indigo-400 transition nom-auteur"></span>
                <span class="text-[10px] font-black text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-md label-pourcentage">0%</span>
            </div>
            <span class="text-slate-500 font-mono text-xs label-messages"></span>
        </div>
        <div class="h-7 w-full bg-white/5 rounded-full p-1 border border-white/5 group-hover:border-white/10 transition relative overflow-hidden">
            <div class="h-full rounded-full shadow-lg transition-all duration-1000 ease-out flex items-center bar-progress" style="width: 0%; min-width: 8px">
                <!-- La barre elle-même -->
            </div>
        </div>
    </div>
</template>

<!-- Sous-template pour une carte brute -->
<template id="template-carte-brute-volume">
    <div class="bg-white/5 p-5 rounded-2xl border border-white/5 hover:border-indigo-500/30 transition-all text-center">
        <p class="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2 nom-auteur"></p>
        <p class="text-white font-black text-2xl count-messages"></p>
        <p class="text-slate-600 text-[10px] font-bold mt-1 uppercase">MESSAGES</p>
    </div>
</template>

<!-- Sous-template pour une ligne de légende -->
<template id="template-legende-volume">
    <div class="flex items-center gap-4 bg-white/5 p-3 rounded-2xl border border-white/5 transition hover:bg-white/10 hover:border-indigo-500/20 group/legende">
        <div class="size-3 rounded-full bullet-couleur flex-shrink-0"></div>
        <div class="flex-1 min-w-0">
            <p class="text-sm font-bold text-slate-200 truncate nom-auteur"></p>
            <p class="text-[10px] text-indigo-400/70 font-black uppercase tracking-widest label-activite"></p>
        </div>
    </div>
</template>
