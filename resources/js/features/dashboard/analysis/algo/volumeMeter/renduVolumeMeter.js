/**
 * renderVolumeMeter.js
 * Affiche les résultats du Volume-Meter (répartition des messages) via des templates.
 */

/**
 * Affiche les graphiques et stats de volume dans l'interface.
 * @param {Object} volumeParAuteur - Données calculées par participant.
 * @param {string} idElementCible - ID du conteneur HTML.
 */
export function afficherVolumeMeter(volumeParAuteur, idElementCible) {
    const conteneurPrincipal = document.getElementById(idElementCible);
    if (!conteneurPrincipal) return;

    const tousLesAuteurs = Object.keys(volumeParAuteur);
    const totalDesMessages = Object.values(volumeParAuteur).reduce((accumulateur, valeur) => accumulateur + valeur, 0);

    // 1. Initialisation du modèle global
    const modeleGlobal = document.querySelector('#template-resultats-volume');
    const instanceGlobale = modeleGlobal.content.cloneNode(true);

    // Remplissage du total global
    instanceGlobale.querySelector('.val-total-messages').textContent = totalDesMessages.toLocaleString();

    const zoneSegmentsDonut = instanceGlobale.querySelector('.zone-donut-segments');
    const zoneLegendeDonut = instanceGlobale.querySelector('.zone-legende-donut');
    const zoneBarresComparaison = instanceGlobale.querySelector('.zone-fgraphique-barres');
    const zoneCartesBrutes = instanceGlobale.querySelector('.zone-chiffres-bruts');

    // 2. Calculs et génération des graphiques
    let pourcentageCumule = 0;
    const paletteCouleursBrutes = ['#818cf8', '#f472b6', '#34d399', '#fbbf24', '#a78bfa'];
    const degradésCSS = [
        'linear-gradient(to right, #818cf8, #a855f7)',
        'linear-gradient(to right, #f472b6, #fb7185)',
        'linear-gradient(to right, #34d399, #2dd4bf)',
        'linear-gradient(to right, #fbbf24, #f97316)'
    ];

    tousLesAuteurs.forEach((nomAuteur, index) => {
        const nbMessagesAuteur = volumeParAuteur[nomAuteur];
        const ratioMessages = totalDesMessages > 0 ? (nbMessagesAuteur / totalDesMessages) : 0;
        const textePourcentage = (ratioMessages * 100).toFixed(1);
        const couleurBrute = paletteCouleursBrutes[index % paletteCouleursBrutes.length];
        const degradéCSS = degradésCSS[index % degradésCSS.length];

        // --- SEGMENT DU DONUT (Format SVG) ---
        // Rayon 40, centre 50,50
        const pointDepartX = 50 + 40 * Math.cos(2 * Math.PI * pourcentageCumule);
        const pointDepartY = 50 + 40 * Math.sin(2 * Math.PI * pourcentageCumule);
        pourcentageCumule += ratioMessages;
        const pointArriveeX = 50 + 40 * Math.cos(2 * Math.PI * pourcentageCumule);
        const pointArriveeY = 50 + 40 * Math.sin(2 * Math.PI * pourcentageCumule);
        const drapeauArcLarge = ratioMessages > 0.5 ? 1 : 0;

        const elementChemin = document.createElementNS("http://www.w3.org/2000/svg", "path");
        elementChemin.setAttribute("d", `M ${pointDepartX} ${pointDepartY} A 40 40 0 ${drapeauArcLarge} 1 ${pointArriveeX} ${pointArriveeY}`);
        elementChemin.setAttribute("fill", "none");
        elementChemin.setAttribute("stroke", couleurBrute);
        elementChemin.setAttribute("stroke-width", "12");
        elementChemin.setAttribute("stroke-linecap", "round");
        elementChemin.setAttribute("class", "transition-all duration-700 hover:stroke-[15px] cursor-help");
        elementChemin.style.filter = `drop-shadow(0 0 8px ${couleurBrute}33)`;
        
        const elementTitre = document.createElementNS("http://www.w3.org/2000/svg", "title");
        elementTitre.textContent = `${nomAuteur} : ${textePourcentage}%`;
        elementChemin.appendChild(elementTitre);
        zoneSegmentsDonut.appendChild(elementChemin);

        // --- LÉGENDE DU DONUT ---
        const modeleLegende = document.querySelector('#template-legende-volume');
        const instanceLegende = modeleLegende.content.cloneNode(true);
        instanceLegende.querySelector('.bullet-couleur').style.backgroundColor = couleurBrute;
        instanceLegende.querySelector('.bullet-couleur').style.boxShadow = `0 0 10px ${couleurBrute}55`;
        instanceLegende.querySelector('.nom-auteur').textContent = nomAuteur;
        instanceLegende.querySelector('.label-activite').textContent = `${textePourcentage}% de l'activité`;
        zoneLegendeDonut.appendChild(instanceLegende);

        // --- BARRE DE COMPARAISON DIRECTE ---
        const modeleDeBarre = document.querySelector('#template-barre-volume');
        const instanceDeBarre = modeleDeBarre.content.cloneNode(true);
        instanceDeBarre.querySelector('.nom-auteur').textContent = nomAuteur;
        instanceDeBarre.querySelector('.label-messages').textContent = `${nbMessagesAuteur.toLocaleString()} messages`;
        const elementBarreProgression = instanceDeBarre.querySelector('.bar-progress');
        elementBarreProgression.style.background = degradéCSS;
        elementBarreProgression.style.boxShadow = `0 4px 15px ${couleurBrute}40`;
        elementBarreProgression.style.width = `${textePourcentage}%`;
        instanceDeBarre.querySelector('.label-pourcentage').textContent = `${textePourcentage}%`;
        zoneBarresComparaison.appendChild(instanceDeBarre);

        // --- CARTE DE CHIFFRES BRUTS ---
        const modeleDeCarteBrute = document.querySelector('#template-carte-brute-volume');
        const instanceDeCarteBrute = modeleDeCarteBrute.content.cloneNode(true);
        instanceDeCarteBrute.querySelector('.nom-auteur').textContent = nomAuteur;
        instanceDeCarteBrute.querySelector('.count-messages').textContent = nbMessagesAuteur.toLocaleString();
        zoneCartesBrutes.appendChild(instanceDeCarteBrute);
    });

    // 3. Injection finale dans le navigateur
    conteneurPrincipal.innerHTML = '';
    conteneurPrincipal.appendChild(instanceGlobale);

    // Défilement fluide vers le nouveau bloc
    conteneurPrincipal.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
