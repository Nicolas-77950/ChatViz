/**
 * renduSentimentIA.js
 * Gère l'affichage des résultats de l'analyse sentimentale IA.
 * Utilise les templates Blade pour un rendu cohérent avec le reste du projet.
 */

/**
 * Affiche l'état de chargement pendant que l'IA réfléchit.
 * @param {string} idElementCible - ID du conteneur HTML.
 * @param {string} labelAnalyse - Nom du type d'analyse en cours.
 */
export function afficherChargementIA(idElementCible, labelAnalyse) {
    const conteneurPrincipal = document.getElementById(idElementCible);
    if (!conteneurPrincipal) return;

    const modeleChargement = document.querySelector('#template-chargement-analyse-ia');
    if (!modeleChargement) return;

    const instanceChargement = modeleChargement.content.cloneNode(true);
    instanceChargement.querySelector('.label-analyse-en-cours').textContent = `Analyse "${labelAnalyse}" en cours...`;

    conteneurPrincipal.innerHTML = '';
    conteneurPrincipal.appendChild(instanceChargement);

    // Défilement fluide vers la zone de chargement
    conteneurPrincipal.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/**
 * Affiche le verdict final de l'IA après l'analyse.
 * @param {Object} resultatAnalyse - Objet { verdict, typeAnalyse }
 * @param {string} idElementCible - ID du conteneur HTML.
 * @param {Function} callbackRetour - Fonction appelée quand l'utilisateur veut revenir au menu.
 */
export function afficherVerdictIA(resultatAnalyse, idElementCible, callbackRetour) {
    const conteneurPrincipal = document.getElementById(idElementCible);
    if (!conteneurPrincipal) return;

    const modeleVerdict = document.querySelector('#template-verdict-analyse-ia');
    if (!modeleVerdict) return;

    const instanceVerdict = modeleVerdict.content.cloneNode(true);

    // En-tête du verdict
    instanceVerdict.querySelector('.icone-verdict').textContent = resultatAnalyse.typeAnalyse.icone;
    instanceVerdict.querySelector('.label-verdict').textContent = resultatAnalyse.typeAnalyse.label;

    // Contenu Markdown du verdict rendu par marked.js
    const zoneContenuVerdict = instanceVerdict.querySelector('.contenu-verdict-ia');
    if (typeof marked !== 'undefined') {
        zoneContenuVerdict.innerHTML = marked.parse(resultatAnalyse.verdict);
    } else {
        // Fallback si marked.js n'est pas chargé
        zoneContenuVerdict.textContent = resultatAnalyse.verdict;
    }

    // Bouton retour
    instanceVerdict.querySelector('.btn-retour-menu-ia').addEventListener('click', () => {
        callbackRetour();
    });

    conteneurPrincipal.innerHTML = '';
    conteneurPrincipal.appendChild(instanceVerdict);
    conteneurPrincipal.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/**
 * Affiche un message d'erreur dans la zone de résultat.
 * @param {string} messageErreur - Le message d'erreur à afficher.
 * @param {string} idElementCible - ID du conteneur HTML.
 * @param {Function} callbackRetour - Fonction appelée pour revenir au menu.
 */
export function afficherErreurIA(messageErreur, idElementCible, callbackRetour) {
    const conteneurPrincipal = document.getElementById(idElementCible);
    if (!conteneurPrincipal) return;

    const modeleErreur = document.querySelector('#template-erreur-analyse-ia');
    if (!modeleErreur) return;

    const instanceErreur = modeleErreur.content.cloneNode(true);
    instanceErreur.querySelector('.message-erreur-ia').textContent = messageErreur;

    instanceErreur.querySelector('.btn-retour-erreur-ia').addEventListener('click', () => {
        callbackRetour();
    });

    conteneurPrincipal.innerHTML = '';
    conteneurPrincipal.appendChild(instanceErreur);
}
