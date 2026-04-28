<x-app-layout>
    <div class="py-24 relative overflow-hidden">
        {{-- Décorations de fond --}}
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
            <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px]"></div>
            <div class="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-purple-600/10 rounded-full blur-[100px]"></div>
        </div>

        <div class="max-w-4xl mx-auto px-6 space-y-12 relative z-10">

            {{-- Titre de la page --}}
            <div class="text-center mb-16">
                <h1 class="text-5xl font-extrabold tracking-tighter mb-4">
                    À propos de <span class="gradient-text">ChatViz</span>
                </h1>
                <p class="text-slate-400 text-lg max-w-2xl mx-auto">
                    Découvrez comment nous transformons vos conversations WhatsApp en tableaux de bord visuels et intelligents. 🚀
                </p>
            </div>

            {{-- Présentation principale --}}
            <div class="bg-white/5 backdrop-blur-xl border border-white/5 p-10 rounded-[2.5rem] shadow-2xl">
                <div class="flex flex-col md:flex-row items-center gap-8">
                    <div class="size-20 flex-shrink-0 bg-indigo-500/10 rounded-3xl flex items-center justify-center border border-indigo-500/20">
                         <img src="{{ asset('assets/images/logo.png') }}" alt="ChatViz" class="h-12 w-auto">
                    </div>
                    <div>
                        <h2 class="text-2xl font-bold text-white mb-3 tracking-tight">C'est quoi ChatViz ?</h2>
                        <p class="text-slate-400 leading-relaxed text-lg">
                            <strong>ChatViz</strong> est un outil d'analyse privé conçu pour décrypter vos conversations WhatsApp. 
                            Importez votre fichier <code class="bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded-lg border border-indigo-500/20 text-sm font-mono">_chat.txt</code>, 
                            visualisez vos statistiques d'échanges et laissez notre IA locale vous donner un verdict percutant sur votre dynamique de relation.
                        </p>
                    </div>
                </div>
            </div>

            {{-- Comment ça fonctionne --}}
            <div class="space-y-6">
                <h3 class="text-2xl font-bold text-white px-4 flex items-center gap-3">
                    <span class="size-2 bg-indigo-500 rounded-full animate-pulse"></span>
                    Comment ça fonctionne ?
                </h3>
                <div class="grid gap-4">
                    @foreach ([
                        ['num' => '1', 'title' => 'Créez un compte', 'desc' => 'Inscrivez-vous pour sécuriser votre historique d\'analyses.'],
                        ['num' => '2', 'title' => 'Exportez depuis WhatsApp', 'desc' => 'Dans un chat, allez dans Plus > Exporter discussion > Sans fichiers médias.'],
                        ['num' => '3', 'title' => 'Glissez-déposez le fichier', 'desc' => 'L\'analyse démarre instantanément, 100% en local dans votre navigateur.'],
                        ['num' => '4', 'title' => 'Consultez les visualisations', 'desc' => 'Découvrez qui répond le plus vite, les emojis préférés et vos heures de pointe.'],
                        ['num' => '5', 'title' => 'Lancer l\'analyse par l\'IA', 'desc' => 'Générez un verdict intelligent (amour ou engagement) via notre IA locale.'],
                    ] as $step)
                    <div class="bg-white/5 hover:bg-white/10 transition-colors border border-white/5 p-6 rounded-3xl flex items-start gap-6 group">
                        <div class="size-10 rounded-2xl bg-indigo-500 text-white font-black flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                            {{ $step['num'] }}
                        </div>
                        <div>
                            <p class="font-bold text-white text-lg tracking-tight group-hover:text-indigo-400 transition-colors">{{ $step['title'] }}</p>
                            <p class="text-slate-400 mt-1 leading-relaxed">{{ $step['desc'] }}</p>
                        </div>
                    </div>
                    @endforeach
                </div>
            </div>

            {{-- Confidentialité --}}
            <div class="bg-white/5 backdrop-blur-xl border border-white/5 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                <div class="absolute top-0 right-0 p-6 opacity-10">
                    <svg class="size-24 text-indigo-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z"/></svg>
                </div>
                
                <h3 class="text-2xl font-bold text-white mb-6">Confidentialité Maximale 🔒</h3>
                <p class="text-slate-400 text-lg leading-relaxed mb-10">
                    La confidentialité est notre priorité absolue. Vos messages privés <strong>ne quittent jamais votre ordinateur</strong>. L'intégralité du traitement s'effectue localement.
                </p>

                <div class="grid sm:grid-cols-3 gap-6">
                    @foreach ([
                        ['icon' => '🛡️', 'title' => 'Traitement Local', 'desc' => 'Tout est analysé directement dans votre navigateur.'],
                        ['icon' => '🧩', 'title' => 'Anonymisé', 'desc' => 'Seules des stats mathématiques anonymes sortent du navigateur.'],
                        ['icon' => '💎', 'title' => 'Zéro Stockage', 'desc' => 'Aucun de vos messages n\'est enregistré sur nos serveurs.'],
                    ] as $item)
                    <div class="bg-white/5 rounded-3xl p-6 border border-white/5 hover:border-indigo-500/30 transition-all text-center">
                        <div class="text-3xl mb-3">{{ $item['icon'] }}</div>
                        <p class="font-bold text-white mb-1 text-sm">{{ $item['title'] }}</p>
                        <p class="text-slate-500 text-xs leading-relaxed">{{ $item['desc'] }}</p>
                    </div>
                    @endforeach
                </div>
            </div>

            {{-- CTA --}}
            <div class="bg-gradient-to-tr from-indigo-600 to-purple-600 p-1 rounded-[2.5rem] shadow-2xl">
                <div class="bg-slate-900/90 backdrop-blur-md p-12 rounded-[2.4rem] text-center">
                    <h2 class="text-3xl font-extrabold text-white mb-4 tracking-tighter">Prêt à voir clair dans vos discussions ?</h2>
                    <p class="text-slate-400 text-lg mb-10">Analysez votre premier fichier en moins de 30 secondes.</p>
                    <a href="{{ route('dashboard') }}" class="btn-primary inline-flex items-center px-10 py-5 text-white font-black text-lg rounded-2xl shadow-2xl tracking-tight uppercase">
                        Explorer mon Dashboard
                        <svg class="size-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
                    </a>
                </div>
            </div>

        </div>
    </div>
</x-app-layout>
