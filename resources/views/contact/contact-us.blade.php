<x-app-layout>
    <div class="py-12 relative z-10">
        <div class="max-w-7xl mx-auto px-6">
            
            <div class="mb-12 text-center lg:text-left">
                <h2 class="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                    Une question ? <span class="gradient-text">Contactez-nous</span> ✉️
                </h2>
                <p class="text-slate-400 text-lg">L'équipe ChatViz est à votre écoute pour vous aider.</p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                <div class="lg:col-span-2">
                    <div class="glass p-8 md:p-10 rounded-[2.5rem] border border-white/5 shadow-2xl transition-all">
                        <h3 class="text-xl font-bold mb-8 flex items-center gap-3">
                            <span class="size-2 bg-indigo-500 rounded-full animate-pulse"></span>
                            Envoyer un message
                        </h3>

                        @if(session('success'))
                            <div class="mb-8 p-4 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 rounded-2xl text-center text-sm font-medium animate-bounce">
                                {{ session('success') }}
                            </div>
                        @endif

                        <form method="POST" action="{{ route('contact.store') }}" class="space-y-6">
                            @csrf 

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div class="space-y-2">
                                    <label class="text-xs font-bold uppercase tracking-widest text-slate-500 ml-2">Nom complet</label>
                                    <input type="text" name="name" required value="{{ old('name') }}"
                                        class="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder-slate-700"
                                        placeholder="John Doe">
                                    @error('name') <span class="text-red-500 text-xs mt-1">{{ $message }}</span> @enderror
                                </div>

                                <div class="space-y-2">
                                    <label class="text-xs font-bold uppercase tracking-widest text-slate-500 ml-2">Email</label>
                                    <input type="email" name="email" required value="{{ old('email') }}"
                                        class="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder-slate-700"
                                        placeholder="john@example.com">
                                </div>
                            </div>

                            <div class="space-y-2">
                                <label class="text-xs font-bold uppercase tracking-widest text-slate-500 ml-2">Votre Message</label>
                                <textarea name="message" rows="5" required
                                    class="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder-slate-700"
                                    placeholder="Comment pouvons-nous vous aider ?">{{ old('message') }}</textarea>
                            </div>

                            <button type="submit" 
                                class="btn-primary w-full md:w-auto px-12 py-4 rounded-full font-bold flex items-center justify-center gap-3 hover:scale-105 transition transform shadow-xl shadow-indigo-500/20">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="size-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                                </svg>
                                Envoyer le message
                            </button>
                        </form>
                    </div>
                </div>

                <div class="space-y-8">
                    <div class="glass p-8 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden group">
                        <div class="absolute -top-10 -right-10 size-40 bg-indigo-500/10 blur-3xl rounded-full group-hover:bg-indigo-500/20 transition-all"></div>
                        
                        <h4 class="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6 font-mono">Disponibilité</h4>
                        
                        <div class="space-y-4">
                            <div class="flex items-center gap-4 text-slate-300">
                                <div class="size-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                </div>
                                <div>
                                    <p class="font-bold">Réponse rapide</p>
                                    <p class="text-xs text-slate-500">Sous 24h ouvrées</p>
                                </div>
                            </div>
                        </div>

                        <div class="mt-8 pt-8 border-t border-white/5">
                            <h5 class="text-xs font-bold text-slate-400 mb-4 uppercase italic">Note de sécurité</h5>
                            <p class="text-sm text-slate-500 italic">
                                "Toutes les communications via ce formulaire sont chiffrées."
                            </p>
                        </div>
                    </div>

                    <div class="glass p-8 rounded-[2.5rem] border border-white/5 shadow-2xl bg-indigo-600/5">
                        <h4 class="font-bold text-slate-200 mb-4">Besoin d'aide technique ?</h4>
                        <p class="text-sm text-slate-500 mb-6 leading-relaxed">
                            Vérifiez d'abord notre guide d'importation pour WhatsApp.
                        </p>
                        <a href="{{ route('about') }}" class="text-indigo-400 text-sm font-bold hover:underline flex items-center gap-2 group">
                            Voir le guide
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-4 group-hover:translate-x-1 transition-transform">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </a>
                    </div>
                </div>
                    <div class="glass p-8 rounded-[2.5rem] border border-red-500/30 bg-red-500/10 shadow-2xl shadow-red-500/10">
                    <div class="flex items-center gap-3 mb-4">
                     <span class="size-3 bg-red-500 rounded-full animate-ping"></span>
                     <h4 class="font-bold text-red-400">Besoin d'aide urgente ?</h4>
                </div>
    
                    <p class="text-sm text-slate-400 mb-6 leading-relaxed">
                    Victime de cyberharcèlement ou de violences en ligne ? Ne restez pas seul(e).</p>
   
    
                    <div class="bg-red-500 text-white p-4 rounded-2xl text-center">
                    <p class="text-xs uppercase font-black tracking-widest mb-1">Appelez le</p>
                    <a href="tel:3018" class="text-3xl font-black hover:scale-105 transition-transform block">3018</a>
                    <p class="text-[10px] mt-1 opacity-80">Gratuit, anonyme et confidentiel</p>
                </div>
            </div>

            </div>
        </div>
    </div>
</x-app-layout>