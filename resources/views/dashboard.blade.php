<x-app-layout>
    <x-slot name="header">
        <h2 class="font-bold text-3xl text-white leading-tight">
            {{ __('Tableau de bord') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="glass overflow-hidden sm:rounded-3xl">
                <div class="p-8 text-white">
                    <h3 class="text-xl font-semibold mb-4">Bienvenue, {{ Auth::user()->name }} !</h3>
                    <p class="text-slate-400">
                        {{ __("Vous êtes connecté. Vous pouvez maintenant commencer à analyser vos conversations WhatsApp en toute sécurité.") }}
                    </p>
                    
                    <!-- Placeholder pour l'analyse -->
                    <div class="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="p-6 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
                            <h4 class="font-bold mb-2">Nouvelle Analyse</h4>
                            <p class="text-sm text-slate-400 mb-4">Importez un fichier .txt exporté de WhatsApp.</p>
                            <button class="btn-primary px-6 py-2 rounded-full text-sm font-bold">Lancer l'importation</button>
                        </div>
                        <div class="p-6 rounded-2xl bg-slate-800/50 border border-white/5">
                            <h4 class="font-bold mb-2">Historique</h4>
                            <p class="text-sm text-slate-400">Vous n'avez pas encore d'analyses sauvegardées.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
