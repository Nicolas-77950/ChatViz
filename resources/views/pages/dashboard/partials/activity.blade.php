<!-- Templates pour l'Analyse d'Activité -->
<template id="template-resultats-activite">
    <div class="border-t border-white/10 pt-8 mt-12 animate-fade-in-up">
        <h3 class="text-2xl font-bold text-white mb-8 flex items-center gap-3 pt-6">
            <span class="bg-indigo-500/20 text-indigo-400 p-3 rounded-xl shadow-inner text-3xl">🌙</span>
            <span>Habitudes & Ambiance</span>
        </h3>

        <!-- Grille de Cartes d'Activité -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 zone-cartes-activite">
            <!-- Les cartes (Matin, Midi, Soir, Nuit) seront ici -->
        </div>

        <!-- Statistiques Secondaires -->
        <div class="bg-black/20 rounded-2xl border border-white/5 p-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div class="flex items-center gap-4">
                <div class="size-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-2xl">📅</div>
                <div>
                    <p class="text-xs font-bold text-slate-500 uppercase tracking-widest">Jour le plus actif</p>
                    <p class="text-xl font-bold text-white val-jour-actif">-</p>
                </div>
            </div>
            <div class="size-px bg-white/10 hidden md:block h-10"></div>
            <div class="flex items-center gap-4">
                <div class="size-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-2xl">🔥</div>
                <div>
                    <p class="text-xs font-bold text-slate-500 uppercase tracking-widest">Moment de pointe</p>
                    <p class="text-xl font-bold text-white val-moment-pointe">-</p>
                </div>
            </div>
            <div class="size-px bg-white/10 hidden md:block h-10"></div>
            <div class="flex items-center gap-4">
                <div class="size-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-2xl">✉️</div>
                <div>
                    <p class="text-xs font-bold text-slate-500 uppercase tracking-widest">Messages Analysés</p>
                    <p class="text-xl font-bold text-white val-total-messages">-</p>
                </div>
            </div>
        </div>
    </div>
</template>

<template id="template-carte-periode">
    <div class="bg-white/5 rounded-2xl p-6 border border-white/5 flex flex-col items-center text-center group hover:bg-white/10 transition-all">
        <span class="text-4xl mb-4 icon-periode"></span>
        <h5 class="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1 nom-periode"></h5>
        <p class="text-3xl font-black text-white count-periode"></p>
        <p class="text-[10px] text-slate-500 mt-2">Messages envoyés</p>
    </div>
</template>
