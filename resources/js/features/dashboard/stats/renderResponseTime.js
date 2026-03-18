/**
 * renderResponseTime.js
 * Ce code est appelé par "ui.js" juste après le clic.
 * Il récupère les résultats de l'algorithme "responseTime.js" et va dessiner le HTML Final.
 */

// On passe 2 trucs : "les calculs", et "où dessiner"
export function renderResponseTime(resultats, cibleDaffichage) {
    const conteneur = document.getElementById(cibleDaffichage);
    if (!conteneur) return; // Si la div est cassée, on arrête

    // 1. On sépare les deux types de résultats de l'algorithme
    const statsParAuteur = resultats.statsParAuteur; // Moyenne et Totaux de chaque personne
    const top5LongsTemps = resultats.top5LongsTemps; // Le tableau des 5 plus longues attentes

    // 2. On récupère les noms (ex: ["MixOne", "Matheo"])
    const nomsDesAuteurs = Object.keys(statsParAuteur);

    // 3. On génère le HTML des "Cartes" pour chaque personne
    let cartesHTML = '';
    
    nomsDesAuteurs.forEach((auteur) => {
        const statsDeCettePersonne = statsParAuteur[auteur];
        
        // On concatène (+=) le HTML une nouvelle carte pour chaque nom
        cartesHTML += `
            <div class="bg-black/20 rounded-xl p-5 border border-white/5 flex-1 relative overflow-hidden group">
                <div class="absolute -top-10 -right-10 size-20 bg-indigo-500/10 blur-3xl rounded-full group-hover:bg-indigo-500/30 transition-all"></div>
                
                <!-- En-tête de la carte avec l'Auteur -->
                <div class="flex items-center gap-3 mb-4">
                    <div class="size-10 rounded-full bg-gradient-to-r from-indigo-500 hover:scale-105 transition-all to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                        <!-- Pour afficher la première lettre de leur nom -->
                        ${auteur.substring(0, 2).toUpperCase()} 
                    </div>
                    <h5 class="text-xl font-bold text-white">${auteur}</h5>
                </div>
                
                <!-- La ligne de STAT 1 -->
                <div class="space-y-2 relative z-10">
                    <div class="flex justify-between items-center bg-white/5 border border-white/5 hover:bg-white/10 transition px-3 py-2 rounded-lg">
                        <span class="text-sm text-slate-400">Temps de réponse moyen</span>
                        <span class="font-bold text-indigo-400 text-lg">${statsDeCettePersonne.moyenneFormatee}</span>
                    </div>
                    
                    <!-- La ligne de STAT 2 -->
                    <div class="flex justify-between items-center bg-white/5 px-3 py-2 rounded-lg border border-white/5 hover:bg-white/10 transition">
                        <span class="text-sm text-slate-400">Temps total d'attente</span>
                        <span class="font-bold text-white">${statsDeCettePersonne.totalFormate}</span>
                    </div>
                    
                    <!-- La ligne de STAT 3 -->
                    <div class="flex justify-between items-center bg-white/5 px-3 py-2 rounded-lg border border-white/5 hover:bg-white/10 transition">
                        <span class="text-sm text-slate-400">Réponses envoyées</span>
                        <span class="font-bold text-slate-200">${statsDeCettePersonne.nombreDeReponses} fois</span>
                    </div>
                </div>
            </div>
        `;
    });

    // 4. On génère le petit TOP 5 🏆 en bas
    let top5HTML = '';
    
    if (top5LongsTemps.length > 0) {
        // On boucle sur nos objets `item` provenant de la partie algorithme `top5`
        top5LongsTemps.forEach((item, index) => {
            top5HTML += `
                <div class="flex items-center justify-between hover:bg-white/10 transition px-4 py-3 rounded-lg border-b border-white/5 last:border-0">
                    <div class="flex items-center gap-3">
                        <span class="font-bold text-slate-500 w-4 tracking-tighter">#${index + 1}</span>
                        <span class="font-bold text-slate-200 text-lg">${item.auteur}</span>
                        <span class="text-slate-500 text-sm">a fait poireauter... l'autre</span>
                    </div>
                    <span class="font-bold text-red-400/90 bg-red-400/10 px-4 py-1.5 rounded-full text-sm">
                        ⏱️ ${item.dureeFormatee}
                    </span>
                </div>
            `;
        });
    } else {
        top5HTML = '<p class="text-slate-400 italic font-medium p-4">✨ Aucune longue attente détectée, vous répondez vite !</p>';
    }

    // 5. Ooooon met tout ("cartesHTML" et "top5HTML") ensemble pour dessiner le bloc global !
    conteneur.innerHTML = `
        <div class="border-t border-white/10 pt-8 mt-12 animate-fade-in-up">
            
            <h3 class="text-2xl font-bold text-white mb-6 flex items-center gap-3 pt-6">
                <!-- Icon avec un fond premium -->
                <span class="bg-indigo-500/20 text-indigo-400 p-3 rounded-xl shadow-inner">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </span> 
                <span>Résultats du Temps de Réponse</span>
            </h3>
            
            <!-- Injection des cartes d'auteurs par dessus le HTML principal (ici : cartesHTML) -->
            <div class="flex flex-col md:flex-row gap-6 mb-10">
                ${cartesHTML}
            </div>

            <!-- Injection de la liste du TOP 5 (ici : top5HTML)  -->
            <div>
                <h4 class="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 px-2">🏆 Top 5 des records d'attente (nuits exclues)</h4>
                <div class="bg-black/20 rounded-2xl border border-white/5 overflow-hidden">
                    ${top5HTML}
                </div>
            </div>
            
        </div>
    `;
    
    // Ajoute une animation douce en scrollant vers les résultats une fois rendus !
    conteneur.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
