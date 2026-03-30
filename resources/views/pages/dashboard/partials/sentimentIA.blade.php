<!-- Templates pour l'Analyse Sentimentale par IA (100% Local / RGPD) -->
<!-- Les boutons de sélection sont dans optionsAnalyse.blade.php -->
<!-- Ici uniquement les templates de chargement, verdict et erreur -->

<!-- ========== ÉCRAN DE CHARGEMENT PENDANT L'ANALYSE IA ========== -->
<template id="template-chargement-analyse-ia">
    <div class="border-t border-white/10 pt-8 mt-12 animate-fade-in-up">
        <div class="flex flex-col items-center justify-center py-20 text-center">
            <!-- Animation de chargement style premium -->
            <div class="relative mb-8">
                <div class="size-20 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin"></div>
                <div class="absolute inset-0 flex items-center justify-center">
                    <span class="text-3xl animate-pulse">🧠</span>
                </div>
            </div>
            
            <h3 class="text-xl font-bold text-white mb-2 label-analyse-en-cours">Analyse en cours...</h3>
            <p class="text-slate-500 text-sm max-w-md">L'IA locale analyse votre conversation en toute confidentialité. Cela peut prendre quelques secondes selon la puissance de votre machine.</p>
            
            <!-- Barre de progression indéterminée -->
            <div class="w-64 h-1.5 bg-white/5 rounded-full mt-8 overflow-hidden">
                <div class="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-indeterminate"></div>
            </div>

            <p class="text-slate-600 text-xs mt-4 italic">🔒 Données 100% locales — RGPD</p>
        </div>
    </div>
</template>

<!-- ========== VERDICT FINAL DE L'IA ========== -->
<template id="template-verdict-analyse-ia">
    <div class="border-t border-white/10 pt-8 mt-12 animate-fade-in-up">
        <!-- En-tête du verdict -->
        <div class="flex items-center justify-between mb-8">
            <h3 class="text-2xl font-bold text-white flex items-center gap-3">
                <span class="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 text-indigo-400 p-3 rounded-xl shadow-inner text-3xl icone-verdict">🔮</span>
                <div>
                    <span class="block label-verdict">Verdict</span>
                    <span class="block text-sm font-normal text-slate-500">Analyse par IA locale 🔒</span>
                </div>
            </h3>

            <button class="btn-retour-menu-ia bg-white/5 border border-white/10 hover:border-indigo-500/50 hover:bg-white/10 text-slate-300 hover:text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                </svg>
                Retour
            </button>
        </div>

        <!-- Corps du verdict en Markdown -->
        <div class="bg-black/20 rounded-2xl border border-white/5 p-8 contenu-verdict-ia prose prose-invert max-w-none w-full">
            <!-- Le contenu Markdown rendu sera injecté ici par JS -->
        </div>

        <!-- Bandeau RGPD -->
        <div class="flex items-center gap-3 mt-6 p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
            <span class="text-emerald-400 text-lg">🛡️</span>
            <p class="text-emerald-400/80 text-xs">Cette analyse a été réalisée entièrement sur votre machine. Aucune donnée n'a été envoyée à un serveur externe. Conforme RGPD.</p>
        </div>
    </div>
</template>

<!-- ========== ÉCRAN D'ERREUR ========== -->
<template id="template-erreur-analyse-ia">
    <div class="border-t border-white/10 pt-8 mt-12 animate-fade-in-up">
        <div class="flex flex-col items-center justify-center py-16 text-center">
            <div class="size-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4">
                <span class="text-3xl">⚠️</span>
            </div>
            <h3 class="text-xl font-bold text-red-400 mb-2">Erreur d'Analyse</h3>
            <p class="text-slate-400 text-sm max-w-md mb-6 message-erreur-ia">Une erreur est survenue.</p>
            
            <button class="btn-retour-erreur-ia btn-primary px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182M2.985 19.644l3.181-3.182" />
                </svg>
                Réessayer
            </button>
        </div>
    </div>
</template>
