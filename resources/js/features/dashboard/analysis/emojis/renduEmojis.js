/**
 * renduEmojis.js
 * Gère l'affichage des émojis favoris.
 */

/**
 * Affiche les résultats des émojis favoris.
 * @param {Object} resultatsAnalyse - Top émojis par participant.
 * @param {string} idElementCible - ID du conteneur HTML.
 */
export function afficherEmojis(resultatsAnalyse, idElementCible) {
    const conteneurPrincipal = document.getElementById(idElementCible);
    if (!conteneurPrincipal) return;

    conteneurPrincipal.innerHTML = '';

    const modeleGlobal = document.querySelector('#template-resultats-emojis');
    const instanceGlobale = modeleGlobal.content.cloneNode(true);
    
    const zonePourLesCartes = instanceGlobale.querySelector('.zone-cartes-emojis');
    const modeleDeCarte = document.querySelector('#template-carte-emoji-auteur');

    Object.entries(resultatsAnalyse).forEach(([nomAuteur, topsEmojis]) => {
        const instanceAuteur = modeleDeCarte.content.cloneNode(true);
        instanceAuteur.querySelector('.nom-auteur-emojis').textContent = nomAuteur;
        
        const zonePourLesLignes = instanceAuteur.querySelector('.zone-lignes-emojis');
        const modeleDeLigne = document.querySelector('#template-ligne-emoji');

        topsEmojis.forEach((emojiItem, index) => {
            const instanceLigne = modeleDeLigne.content.cloneNode(true);
            instanceLigne.querySelector('.l-emoji').textContent = emojiItem.emoji;
            instanceLigne.querySelector('.l-count').textContent = `${emojiItem.count} fois`;
            
            // Surligner le premier émoji (le plus utilisé)
            if (index === 0) {
                instanceLigne.querySelector('div').classList.add('bg-indigo-500/5', 'border-indigo-500/20');
            }

            zonePourLesLignes.appendChild(instanceLigne);
        });

        zonePourLesCartes.appendChild(instanceAuteur);
    });

    conteneurPrincipal.appendChild(instanceGlobale);
    conteneurPrincipal.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
