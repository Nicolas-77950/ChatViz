/**
 * renduActivite.js
 * Gère l'affichage des résultats d'activité par cartes.
 */

/**
 * Affiche les cartes d'activité dans le conteneur spécifié.
 * @param {Object} resultatsAnalyse - Données calculées.
 * @param {string} idElementCible - ID du conteneur HTML.
 */
export function afficherActivite(resultatsAnalyse, idElementCible) {
    const conteneurPrincipal = document.getElementById(idElementCible);
    if (!conteneurPrincipal) return;

    conteneurPrincipal.innerHTML = '';

    const modeleGlobal = document.querySelector('#template-resultats-activite');
    const instanceGlobale = modeleGlobal.content.cloneNode(true);

    // 1. Remplissage des statistiques globales
    instanceGlobale.querySelector('.val-jour-actif').textContent = resultatsAnalyse.jourPlusActif;
    instanceGlobale.querySelector('.val-moment-pointe').textContent = formaterLeMoment(resultatsAnalyse.momentLePlusActif);
    instanceGlobale.querySelector('.val-total-messages').textContent = resultatsAnalyse.totalMessages;

    // 2. Remplissage des cartes de périodes
    const zonePourLesCartes = instanceGlobale.querySelector('.zone-cartes-activite');
    const donneesPeriodes = [
        { id: 'matin', nom: 'Matin', icone: '☀️', nombre: resultatsAnalyse.periodes.matin },
        { id: 'apresmidi', nom: 'Après-midi', icone: '🌆', nombre: resultatsAnalyse.periodes.apresmidi },
        { id: 'soiree', nom: 'Soirée', icone: '🌙', nombre: resultatsAnalyse.periodes.soiree },
        { id: 'nuit', nom: 'Nuit', icone: '😴', nombre: resultatsAnalyse.periodes.nuit }
    ];

    const modeleCarte = document.querySelector('#template-carte-periode');

    donneesPeriodes.forEach(donnee => {
        const instanceCarte = modeleCarte.content.cloneNode(true);
        instanceCarte.querySelector('.icon-periode').textContent = donnee.icone;
        instanceCarte.querySelector('.nom-periode').textContent = donnee.nom;
        instanceCarte.querySelector('.count-periode').textContent = donnee.nombre;
        
        // Surligner le moment le plus actif
        if (donnee.id === resultatsAnalyse.momentLePlusActif) {
            instanceCarte.querySelector('div').classList.add('border-indigo-500/50', 'bg-indigo-500/5', 'ring-1', 'ring-indigo-500/20');
        }

        zonePourLesCartes.appendChild(instanceCarte);
    });

    conteneurPrincipal.appendChild(instanceGlobale);
    conteneurPrincipal.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/**
 * Retourne le libellé français d'un moment de la journée.
 */
function formaterLeMoment(identifiant) {
    const libelles = {
        matin: 'Le Matin',
        apresmidi: 'L\'Après-midi',
        soiree: 'La Soirée',
        nuit: 'La Nuit'
    };
    return libelles[identifiant] || identifiant;
}
