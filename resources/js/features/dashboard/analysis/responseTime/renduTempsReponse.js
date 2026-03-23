/**
 * renduTempsReponse.js
 * Affiche les résultats de l'analyse via les templates HTML et le DOM.
 */

/**
 * Affiche les résultats de l'analyse du temps de réponse.
 * @param {Object} resultats - Données statistiques.
 * @param {string} idCible - ID du conteneur HTML.
 */
export function afficherTempsReponse(resultats, idCible) {
    const conteneurPrincipal = document.getElementById(idCible);
    if (!conteneurPrincipal) return;

    // Réinitialisation du conteneur
    conteneurPrincipal.innerHTML = '';

    const statistiquesParAuteur = resultats.statsParAuteur;
    const top5LongsTemps = resultats.top5LongsTemps;
    const nomsDesAuteurs = Object.keys(statistiquesParAuteur);

    // Initialisation du template global
    const templateGlobal = document.querySelector('#template-resultats-temps-reponse');
    const cloneGlobal = templateGlobal.content.cloneNode(true);
    
    const zoneCartes = cloneGlobal.querySelector('.zone-cartes-auteurs');
    const zoneTop5 = cloneGlobal.querySelector('.zone-top5');

    // Génération des cartes descriptives par participant
    nomsDesAuteurs.forEach((auteur) => {
        const stats = statistiquesParAuteur[auteur];
        const templateCarte = document.querySelector('#template-carte-auteur');
        const cloneCarte = templateCarte.content.cloneNode(true);

        cloneCarte.querySelector('.initiales-auteur').textContent = auteur.substring(0, 2).toUpperCase();
        cloneCarte.querySelector('.nom-auteur').textContent = auteur;
        cloneCarte.querySelector('.moyenne-formatee').textContent = stats.moyenneFormatee;
        cloneCarte.querySelector('.total-formate').textContent = stats.totalFormate;
        cloneCarte.querySelector('.nombre-reponses').textContent = `${stats.nombreDeReponses} fois`;

        zoneCartes.appendChild(cloneCarte);
    });

    // Génération du classement des délais les plus longs
    if (top5LongsTemps.length > 0) {
        top5LongsTemps.forEach((item, index) => {
            const templateLigne = document.querySelector('#template-ligne-top5');
            const cloneLigne = templateLigne.content.cloneNode(true);

            cloneLigne.querySelector('.rang-top5').textContent = `#${index + 1}`;
            cloneLigne.querySelector('.nom-auteur-top5').textContent = item.auteur;
            cloneLigne.querySelector('.duree-formatee-top5').textContent = item.dureeFormatee;

            zoneTop5.appendChild(cloneLigne);
        });
    } else {
        const p = document.createElement('p');
        p.className = 'text-slate-400 italic font-medium p-4';
        p.textContent = 'Aucune longue attente détectée.';
        zoneTop5.appendChild(p);
    }

    // Injection dans le DOM
    conteneurPrincipal.appendChild(cloneGlobal);

    // Défilement fluide vers les résultats
    conteneurPrincipal.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
