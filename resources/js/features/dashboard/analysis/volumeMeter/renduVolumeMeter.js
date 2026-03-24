/**
 * renderVolumeMeter.js
 * Affiche les résultats du Volume-Meter (répartition des messages).
 */

export function afficherVolumeMeter(volumeParAuteur, cibleDaffichage) {
    const conteneur = document.getElementById(cibleDaffichage);
    if (!conteneur) return;

    const auteurs = Object.keys(volumeParAuteur);
    const totalMessages = Object.values(volumeParAuteur).reduce((acc, val) => acc + val, 0);

    // --- CALCUL POUR LE DONUT CHART ---
    let cumulativePercent = 0;
    const donutPaths = auteurs.map((auteur, index) => {
        const nbMessages = volumeParAuteur[auteur];
        const percent = totalMessages > 0 ? (nbMessages / totalMessages) : 0;
        
        // Calcul des points SVG pour un arc (Donut)
        // Rayon 40, centre 50,50
        const startX = 50 + 40 * Math.cos(2 * Math.PI * cumulativePercent);
        const startY = 50 + 40 * Math.sin(2 * Math.PI * cumulativePercent);
        cumulativePercent += percent;
        const endX = 50 + 40 * Math.cos(2 * Math.PI * cumulativePercent);
        const endY = 50 + 40 * Math.sin(2 * Math.PI * cumulativePercent);
        
        const largeArcFlag = percent > 0.5 ? 1 : 0;
        
        const colors = [
            '#6366f1', // Indigo 500
            '#ec4899', // Pink 500
            '#10b981', // Emerald 500
            '#f59e0b', // Amber 500
            '#8b5cf6'  // Violet 500
        ];
        const color = colors[index % colors.length];

        return {
            path: `M ${startX} ${startY} A 40 40 0 ${largeArcFlag} 1 ${endX} ${endY}`,
            color,
            auteur,
            percent: (percent * 100).toFixed(1)
        };
    });

    let htmlCartes = '';
    let htmlGraphiqueBarres = '';
    let htmlDonutSegments = '';
    let htmlLegendeDonut = '';

    auteurs.forEach((auteur, index) => {
        const nbMessages = volumeParAuteur[auteur];
        const pourcentage = totalMessages > 0 ? ((nbMessages / totalMessages) * 100).toFixed(1) : 0;
        
        const tailwindColors = [
            'from-indigo-500 to-purple-600',
            'from-pink-500 to-rose-600',
            'from-emerald-500 to-teal-600',
            'from-amber-500 to-orange-600'
        ];
        const colorClass = tailwindColors[index % tailwindColors.length];
        const rawColor = donutPaths[index].color;

        // 1. Cartes de stats
        htmlCartes += `
            <div class="bg-black/20 rounded-2xl p-6 border border-white/5 flex-1 relative overflow-hidden group hover:border-indigo-500/30 transition-all">
                <div class="absolute -top-10 -right-10 size-24 bg-indigo-500/5 blur-3xl rounded-full group-hover:bg-indigo-500/10 transition-all"></div>
                
                <div class="flex items-center gap-4 mb-4">
                    <div class="size-12 rounded-2xl bg-gradient-to-br ${colorClass} flex items-center justify-center text-white font-bold text-lg shadow-lg transform group-hover:scale-110 transition-transform">
                        ${auteur.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                        <h5 class="text-xl font-bold text-white">${auteur}</h5>
                        <p class="text-slate-500 text-xs uppercase tracking-widest font-bold">Auteur du chat</p>
                    </div>
                </div>

                <div class="space-y-3">
                    <div class="flex justify-between items-end">
                        <span class="text-slate-400 text-sm font-medium">Messages</span>
                        <span class="text-2xl font-black text-white">${nbMessages.toLocaleString()}</span>
                    </div>
                    <div class="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <div class="h-full bg-gradient-to-r ${colorClass} rounded-full" style="width: ${pourcentage}%"></div>
                    </div>
                </div>
            </div>
        `;

        // 2. Barres de comparaison
        htmlGraphiqueBarres += `
            <div class="group">
                <div class="flex justify-between items-center text-sm mb-2">
                    <span class="font-bold text-slate-300 group-hover:text-white transition">${auteur}</span>
                    <span class="text-slate-500 font-mono text-xs">${nbMessages} messages</span>
                </div>
                <div class="h-8 w-full bg-white/5 rounded-xl p-1 border border-white/5 group-hover:border-white/10 transition">
                    <div class="h-full bg-gradient-to-r ${colorClass} rounded-lg shadow-lg transition-all duration-1000 ease-out flex items-center px-3" style="width: ${pourcentage}%">
                        <span class="text-[10px] font-black text-white/80 shadow-sm">${pourcentage}%</span>
                    </div>
                </div>
            </div>
        `;

        // 3. Donut Segments
        htmlDonutSegments += `
            <path d="${donutPaths[index].path}" 
                  fill="none" 
                  stroke="${rawColor}" 
                  stroke-width="12" 
                  stroke-linecap="round"
                  class="transition-all duration-700 hover:stroke-[15px] cursor-help"
                  style="filter: drop-shadow(0 0 8px ${rawColor}33)">
                <title>${auteur} : ${pourcentage}%</title>
            </path>
        `;

        // 4. Légende Donut
        htmlLegendeDonut += `
            <div class="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5 transition hover:bg-white/10">
                <div class="size-3 rounded-full" style="background-color: ${rawColor}; box-shadow: 0 0 10px ${rawColor}55;"></div>
                <div class="flex-1 min-w-0">
                    <p class="text-sm font-bold text-white truncate">${auteur}</p>
                    <p class="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">${pourcentage}% de l'activité</p>
                </div>
            </div>
        `;
    });

    conteneur.innerHTML = `
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
                    <span class="text-indigo-400 font-black text-2xl">${totalMessages.toLocaleString()}</span>
                    <span class="text-indigo-300/60 text-xs font-bold uppercase tracking-widest ml-2">Total messages</span>
                </div>
            </div>

            <!-- Grille de graphiques -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                
                <!-- Bloc A : Le Donut (SVG) -->
                <div class="bg-black/20 rounded-[2.5rem] p-8 border border-white/5 flex flex-col items-center">
                    <h4 class="text-xs font-bold uppercase tracking-widest text-slate-500 mb-10 self-start px-2 flex items-center gap-2">
                        <span class="size-1.5 bg-indigo-500 rounded-full animate-pulse"></span>
                        Graphique en anneau (Donut)
                    </h4>
                    <div class="flex flex-col md:flex-row items-center justify-between w-full gap-8">
                        <!-- SVG Donut -->
                        <div class="relative size-64 flex-shrink-0">
                            <svg viewBox="0 0 100 100" class="w-full h-full -rotate-90">
                                <!-- Background circle -->
                                <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="12" />
                                ${htmlDonutSegments}
                            </svg>
                            <!-- Center Label -->
                            <div class="absolute inset-0 flex flex-col items-center justify-center rotate-0">
                                <span class="text-white font-black text-3xl">VS</span>
                                <span class="text-slate-500 text-[10px] uppercase font-bold tracking-widest">Part de voix</span>
                            </div>
                        </div>

                        <!-- Légende Donut -->
                        <div class="flex-1 w-full flex flex-col gap-3">
                            <h5 class="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Légende des couleurs</h5>
                            <div class="grid grid-cols-1 gap-3">
                                ${htmlLegendeDonut}
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
                    <div class="space-y-10">
                        ${htmlGraphiqueBarres}
                    </div>
                </div>

            </div>

            <!-- Résumé Brut (Explicit requirement: "afficher le nombre de messages envoyés") -->
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
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    ${Object.entries(volumeParAuteur).map(([auteur, count]) => `
                        <div class="bg-white/5 p-5 rounded-2xl border border-white/5 hover:border-indigo-500/30 transition-all text-center">
                            <p class="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">${auteur}</p>
                            <p class="text-white font-black text-2xl">${count.toLocaleString()}</p>
                            <p class="text-slate-600 text-[10px] font-bold mt-1">MESSAGES</p>
                        </div>
                    `).join('')}
                </div>
            </div>

        </div>
    `;

    // Scroll doux vers les résultats
    conteneur.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
