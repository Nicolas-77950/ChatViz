/**
 * logiqueWrapped.js
 * Logique de préparation des données pour l'export "ChatViz Wrapped".
 * Gère la couleur d'accent, la troncature des verdicts IA et le compteur de briques.
 */

/**
 * Palette de couleurs associées aux emojis les plus courants.
 * Utilisée pour personnaliser la couleur d'accent du Wrapped.
 */
const COULEURS_EMOJIS = {
    '❤️': '#f472b6', '❤': '#f472b6', '💕': '#f472b6', '💗': '#f472b6', '💖': '#f472b6', '💘': '#f472b6', '😍': '#f472b6', '🥰': '#f472b6',
    '😂': '#fbbf24', '🤣': '#fbbf24', '😭': '#fbbf24', '😅': '#fbbf24',
    '🔥': '#f97316', '🥵': '#f97316',
    '💀': '#94a3b8', '🫠': '#94a3b8',
    '😊': '#34d399', '🥺': '#a78bfa', '✨': '#e2e8f0',
};

const COULEUR_ACCENT_DEFAUT = '#818cf8';

/**
 * Détermine la couleur d'accent en fonction de l'emoji le plus utilisé globalement.
 * @param {Object|null} resultatsEmojis - Résultats de l'analyse emojis (top emojis par auteur).
 * @returns {string} Code couleur CSS.
 */
export function determinerCouleurAccent(resultatsEmojis) {
    if (!resultatsEmojis) return COULEUR_ACCENT_DEFAUT;

    // Fusion de tous les emojis de tous les auteurs pour trouver le plus utilisé globalement
    const compteurGlobal = {};
    Object.values(resultatsEmojis).forEach(topsAuteur => {
        topsAuteur.forEach(item => {
            compteurGlobal[item.emoji] = (compteurGlobal[item.emoji] || 0) + item.count;
        });
    });

    const emojiGagnant = Object.entries(compteurGlobal).sort((a, b) => b[1] - a[1])[0];
    if (!emojiGagnant) return COULEUR_ACCENT_DEFAUT;

    return COULEURS_EMOJIS[emojiGagnant[0]] || COULEUR_ACCENT_DEFAUT;
}

/**
 * Formate le moment de la journée en texte lisible.
 * @param {string} identifiant - Clé du moment (matin, apresmidi, soiree, nuit).
 * @returns {string} Libellé français.
 */
export function formaterLeMoment(identifiant) {
    const libelles = {
        matin: 'Le Matin ☀️',
        apresmidi: 'L\'Après-midi 🌆',
        soiree: 'La Soirée 🌙',
        nuit: 'La Nuit 😴'
    };
    return libelles[identifiant] || identifiant;
}

/**
 * Tronque un texte de verdict IA pour l'affichage résumé dans le Wrapped.
 * Garde les 300 premiers caractères max.
 * @param {string} texteVerdict - Le texte brut du verdict IA.
 * @returns {string} Texte tronqué.
 */
export function tronquerVerdict(texteVerdict) {
    if (!texteVerdict) return '';
    // Supprimer le markdown (titres, gras, etc.) pour un rendu propre
    const texteBrut = texteVerdict
        .replace(/#{1,6}\s/g, '')
        .replace(/\*\*/g, '')
        .replace(/\*/g, '')
        .replace(/---/g, '')
        .replace(/\n{2,}/g, '\n')
        .trim();

    // Garder les 300 premiers caractères
    if (texteBrut.length > 300) {
        return texteBrut.substring(0, 300).trim() + '…';
    }
    return texteBrut;
}

/**
 * Compte le nombre de briques d'analyse remplies.
 * @param {Object} resultats - L'objet resultatsWrapped.
 * @returns {number} Nombre de briques disponibles.
 */
export function compterBriques(resultats) {
    let compteur = 0;
    if (resultats.volumeMeter) compteur++;
    if (resultats.activite) compteur++;
    if (resultats.tempsReponse) compteur++;
    if (resultats.emojis) compteur++;
    if (resultats.verdictAmour) compteur++;
    if (resultats.verdictEngagement) compteur++;
    return compteur;
}
