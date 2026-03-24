/**
 * renduEmojis.js
 * Gère l'affichage des émojis favoris.
 */

/**
 * Affiche les résultats des émojis favoris.
 * @param {Object} resultats - Top émojis par auteur.
 * @param {string} idCible - ID du conteneur.
 */
export function afficherEmojis(resultats, idCible) {
    const conteneurPrincipal = document.getElementById(idCible);
    if (!conteneurPrincipal) return;

    conteneurPrincipal.innerHTML = '';

    const templateGlobal = document.querySelector('#template-resultats-emojis');
    const cloneGlobal = templateGlobal.content.cloneNode(true);
    
    const zoneCards = cloneGlobal.querySelector('.zone-cartes-emojis');
    const templateCarte = document.querySelector('#template-carte-emoji-auteur');

    Object.entries(resultats).forEach(([auteur, tops]) => {
        const cloneAuteur = templateCarte.content.cloneNode(true);
        cloneAuteur.querySelector('.nom-auteur-emojis').textContent = auteur;
        
        const zoneLignes = cloneAuteur.querySelector('.zone-lignes-emojis');
        const templateLigne = document.querySelector('#template-ligne-emoji');

        tops.forEach((item, index) => {
            const cloneLigne = templateLigne.content.cloneNode(true);
            cloneLigne.querySelector('.l-emoji').textContent = item.emoji;
            cloneLigne.querySelector('.l-count').textContent = `${item.count} fois`;
            
            // Surligner le top 1
            if (index === 0) {
                cloneLigne.querySelector('div').classList.add('bg-indigo-500/5', 'border-indigo-500/20');
            }

            zoneLignes.appendChild(cloneLigne);
        });

        zoneCards.appendChild(cloneAuteur);
    });

    conteneurPrincipal.appendChild(cloneGlobal);
    conteneurPrincipal.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
