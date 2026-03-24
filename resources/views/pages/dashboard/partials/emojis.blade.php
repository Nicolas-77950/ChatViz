<!-- Templates pour l'Analyse des Émojis -->
<template id="template-resultats-emojis">
    <div class="border-t border-white/10 pt-8 mt-12 animate-fade-in-up">
        <h3 class="text-2xl font-bold text-white mb-8 flex items-center gap-3 pt-6">
            <span class="bg-indigo-500/20 text-indigo-400 p-3 rounded-xl shadow-inner text-3xl">😂</span>
            <span>TOP Émojis Favoris</span>
        </h3>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 zone-cartes-emojis">
            <!-- Les cartes par auteur iront ici -->
        </div>
    </div>
</template>

<template id="template-carte-emoji-auteur">
    <div class="bg-black/20 rounded-[2.5rem] border border-white/5 p-8 relative overflow-hidden group">
        <div class="absolute -top-10 -right-10 size-40 bg-indigo-500/10 blur-3xl rounded-full"></div>
        
        <h4 class="text-xl font-bold text-white mb-6 pb-4 border-b border-white/5 flex items-center gap-3">
            <span class="size-2 bg-indigo-400 rounded-full"></span>
            <span class="nom-auteur-emojis"></span>
        </h4>

        <div class="space-y-3 zone-lignes-emojis">
            <!-- Les lignes d'émojis iront ici -->
        </div>
    </div>
</template>

<template id="template-ligne-emoji">
    <div class="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all">
        <div class="flex items-center gap-4">
            <span class="text-3xl l-emoji"></span>
            <span class="text-slate-400 text-sm font-medium">Favori habituel</span>
        </div>
        <span class="bg-indigo-500/20 text-indigo-300 font-bold px-4 py-1.5 rounded-full text-xs l-count"></span>
    </div>
</template>
