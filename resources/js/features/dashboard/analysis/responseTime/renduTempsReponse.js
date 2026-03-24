/**
 * renduTempsReponse.js
 * Affiche les résultats de l'analyse du temps de réponse (clonage de templates).
 */

/**
 * Affiche les résulats du temps de réponse dans l'interface.
 * @param {Object} resultatsCalculs - Données calculées (moyennes, top 5).
 * @param {string} idElementCible - ID du conteneur HTML.
 */
export function afficherTempsReponse(resultatsCalculs, idElementCible) {
    const conteneurPrincipal = document.getElementById(idElementCible);
    if (!conteneurPrincipal) return;

    // Réinitialisation du conteneur
    conteneurPrincipal.innerHTML = '';

    const statistiquesParAuteur = resultatsCalculs.statsParAuteur;
    const top5PlusLents = resultatsCalculs.top5LongsTemps;
    const nomsDesParticipants = Object.keys(statistiquesParAuteur);

    // Initialisation du modèle global
    const modeleGlobal = document.querySelector('#template-resultats-temps-reponse');
    const instanceGlobale = modeleGlobal.content.cloneNode(true);
    
    const zonePourLesCartes = instanceGlobale.querySelector('.zone-cartes-auteurs');
    const zonePourLeClassement = instanceGlobale.querySelector('.zone-top5');

    // Génération des cartes descriptives pour chaque participant
    nomsDesParticipants.forEach((nomAuteur) => {
        const statsAuteur = statistiquesParAuteur[nomAuteur];
        const modeleDeLaCarte = document.querySelector('#template-carte-auteur');
        const instanceDeCarte = modeleDeLaCarte.content.cloneNode(true);

        instanceDeCarte.querySelector('.initiales-auteur').textContent = nomAuteur.substring(0, 2).toUpperCase();
        instanceDeCarte.querySelector('.nom-auteur').textContent = nomAuteur;
        instanceDeCarte.querySelector('.moyenne-formatee').textContent = statsAuteur.moyenneFormatee;
        instanceDeCarte.querySelector('.total-formate').textContent = statsAuteur.totalFormate;
        instanceDeCarte.querySelector('.nombre-reponses').textContent = `${statsAuteur.nombreDeReponses} fois`;

        zonePourLesCartes.appendChild(instanceDeCarte);
    });

    // Génération du top 5 des délais les plus longs
    if (top5PlusLents.length > 0) {
        top5PlusLents.forEach((itemLent, index) => {
            const modeleDeLaLigne = document.querySelector('#template-ligne-top5');
            const instanceDeLigne = modeleDeLaLigne.content.cloneNode(true);

            instanceDeLigne.querySelector('.rang-top5').textContent = `#${index + 1}`;
            instanceDeLigne.querySelector('.nom-auteur-top5').textContent = itemLent.auteur;
            instanceDeLigne.querySelector('.duree-formatee-top5').textContent = itemLent.dureeFormatee;

            zonePourLeClassement.appendChild(instanceDeLigne);
        });
    } else {
        const messageVide = document.createElement('p');
        messageVide.className = 'text-slate-400 italic font-medium p-4';
        messageVide.textContent = 'Aucun délai notable détecté.';
        zonePourLeClassement.appendChild(messageVide);
    }

    // Injection finale dans le DOM
    conteneurPrincipal.appendChild(instanceGlobale);

    // Défilement fluide vers les résultats
    conteneurPrincipal.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
