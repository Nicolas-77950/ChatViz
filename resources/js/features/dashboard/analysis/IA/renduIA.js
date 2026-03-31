/**
 * renduIA.js
 * Gère l'affichage générique des résultats de l'IA (Amour, Engagement, etc.)
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
    conteneurPrincipal.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

export function afficherVerdictIA(resultatAnalyse, idElementCible, callbackRetour) {
    const conteneurPrincipal = document.getElementById(idElementCible);
    if (!conteneurPrincipal) return;

    const modeleVerdict = document.querySelector('#template-verdict-analyse-ia');
    if (!modeleVerdict) return;

    const instanceVerdict = modeleVerdict.content.cloneNode(true);
    instanceVerdict.querySelector('.icone-verdict').textContent = resultatAnalyse.typeAnalyse.icone;
    instanceVerdict.querySelector('.label-verdict').textContent = resultatAnalyse.typeAnalyse.label;

    const zoneContenuVerdict = instanceVerdict.querySelector('.contenu-verdict-ia');
    if (typeof marked !== 'undefined') {
        zoneContenuVerdict.innerHTML = marked.parse(resultatAnalyse.verdict);
    } else {
        zoneContenuVerdict.textContent = resultatAnalyse.verdict;
    }

    instanceVerdict.querySelector('.btn-retour-menu-ia').addEventListener('click', () => {
        callbackRetour();
    });

    conteneurPrincipal.innerHTML = '';
    conteneurPrincipal.appendChild(instanceVerdict);
    conteneurPrincipal.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

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
