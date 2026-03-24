/**
 * renduActivite.js
 * Gère l'affichage des résultats d'activité par cartes.
 */

export function afficherActivite(resultats, idCible) {
    const conteneurPrincipal = document.getElementById(idCible);
    if (!conteneurPrincipal) return;

    conteneurPrincipal.innerHTML = '';

    const templateGlobal = document.querySelector('#template-resultats-activite');
    const cloneGlobal = templateGlobal.content.cloneNode(true);

    // 1. Remplir les stats globales
    cloneGlobal.querySelector('.val-jour-actif').textContent = resultats.jourPlusActif;
    cloneGlobal.querySelector('.val-moment-pointe').textContent = formaterPeriode(resultats.momentLePlusActif);
    cloneGlobal.querySelector('.val-total-messages').textContent = resultats.totalMessages;

    // 2. Remplir les périodes
    const zoneCartes = cloneGlobal.querySelector('.zone-cartes-activite');
    const periodesData = [
        { id: 'matin', nom: 'Matin', icone: '☀️', count: resultats.periodes.matin },
        { id: 'apresmidi', nom: 'Après-midi', icone: '🌆', count: resultats.periodes.apresmidi },
        { id: 'soiree', nom: 'Soirée', icone: '🌙', count: resultats.periodes.soiree },
        { id: 'nuit', nom: 'Nuit', icone: '😴', count: resultats.periodes.nuit }
    ];

    const templateCarte = document.querySelector('#template-carte-periode');

    periodesData.forEach(p => {
        const cloneCarte = templateCarte.content.cloneNode(true);
        cloneCarte.querySelector('.icon-periode').textContent = p.icone;
        cloneCarte.querySelector('.nom-periode').textContent = p.nom;
        cloneCarte.querySelector('.count-periode').textContent = p.count;
        
        // Surligner le moment le plus actif
        if (p.id === resultats.momentLePlusActif) {
            cloneCarte.querySelector('div').classList.add('border-indigo-500/50', 'bg-indigo-500/5', 'ring-1', 'ring-indigo-500/20');
        }

        zoneCartes.appendChild(cloneCarte);
    });

    conteneurPrincipal.appendChild(cloneGlobal);
    conteneurPrincipal.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function formaterPeriode(id) {
    const noms = {
        matin: 'Le Matin',
        apresmidi: 'L\'Après-midi',
        soiree: 'La Soirée',
        nuit: 'La Nuit'
    };
    return noms[id] || id;
}
