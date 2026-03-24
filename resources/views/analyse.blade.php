<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>

<x-app-layout>
    @vite(['resources/css/features/analyse.css', 'resources/js/features/dashboard/analyse-ia.js'])

    <div id="drop-overlay" class="fixed inset-0 z-[100] flex items-center justify-center bg-indigo-600/20 backdrop-blur-md border-4 border-dashed border-indigo-500 m-6 rounded-3xl pointer-events-none opacity-0 transition-opacity duration-300">
        <div class="text-center">
            <div class="bg-indigo-500 text-white p-6 rounded-full shadow-2xl mb-4 inline-block animate-bounce">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-12 h-12">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 7.5 7.5M12 3v13.5" />
                </svg>
            </div>
            <h2 class="text-4xl font-bold text-white text-shadow-lg">Lâchez votre fichier ici</h2>
            <p class="text-indigo-200 mt-2 text-lg">Analysez cette conversation immédiatement</p>
        </div>
    </div>

    <div class="py-12 relative z-10">
        <div class="max-w-7xl mx-auto px-6">
            
            <div class="mb-12">
                <h2 class="text-4xl font-bold tracking-tight mb-2 text-white">
                    Analyse <span class="text-indigo-500">Intelligente</span> 👋
                </h2>
                <p class="text-slate-400 text-lg">Prêt à décrypter vos conversations ?</p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                <div class="lg:col-span-1 space-y-6">
                    <div class="bg-white/5 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/5 shadow-2xl">
                        <h3 class="text-xl font-bold mb-6 flex items-center gap-3 text-white">
                            <span class="size-2 bg-indigo-500 rounded-full animate-pulse"></span>
                            Configuration
                        </h3>

                        <div class="mb-6">
                            <label class="block text-sm font-medium text-slate-400 mb-2">1. Importez votre export (.txt)</label>
                            <input type="file" id="chat_file" class="hidden" accept=".txt">
                            <label for="chat_file" class="flex items-center justify-center w-full p-4 border-2 border-dashed border-white/10 rounded-2xl cursor-pointer hover:border-indigo-500/50 hover:bg-white/5 transition-all group">
                                <span id="file-name" class="text-slate-500 group-hover:text-indigo-400 transition-colors text-sm text-center">Choisir un fichier...</span>
                            </label>
                        </div>

                        <div class="mb-8">
                            <label for="user-question" class="block text-sm font-medium text-slate-400 mb-2">2. Une question spécifique ?</label>
                            <input type="text" id="user-question" 
                                class="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder-slate-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                                placeholder="Ex: Qui est le plus râleur ?">
                        </div>

                        <button id="btn-analyze" disabled class="w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-3 bg-indigo-600 text-white opacity-30 cursor-not-allowed transition-all shadow-xl hover:scale-[1.02] active:scale-95">
                            <span id="loader" class="hidden animate-spin size-5 border-2 border-white/30 border-t-white rounded-full"></span>
                            <span id="btn-text">Lancer l'analyse par l'IA</span>
                        </button>
                    </div>
                </div>

                <div class="lg:col-span-2">
                    <div id="result-area" class="bg-white/5 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/5 shadow-2xl min-h-[450px] flex flex-col">
                        <h4 class="text-xl font-bold mb-6 text-indigo-400">Le Verdict de ChatViz</h4>
                        <div id="verdict-content" class="text-slate-400 leading-relaxed italic grow flex items-center justify-center text-center">
                            Le résultat de l'analyse s'affichera ici dès que l'IA aura terminé.
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

    @vite(['resources/js/features/dashboard/analyse-ia.js'])
</x-app-layout>