/**
 * logiqueEmojis.js
 * Extrait et compte les émojis utilisés dans la conversation.
 */

/**
 * Analyse les messages pour classer les émojis par auteur.
 * @param {Array} listeMessages - Liste des messages structurés.
 * @returns {Object} - Top émojis par auteur.
 */
export function calculerEmojis(listeMessages) {
    const statistiquesParAuteur = {};
    
    // Regex pour capturer les émojis (présentation standard ou séquences)
    const expressionEmoji = /\p{Emoji_Presentation}|\p{Emoji}\uFE0F/gu;

    listeMessages.forEach(unMessage => {
        const nomAuteur = unMessage.auteur;
        if (!statistiquesParAuteur[nomAuteur]) {
            statistiquesParAuteur[nomAuteur] = {};
        }

        const emojisTrouves = unMessage.message.match(expressionEmoji);
        if (emojisTrouves) {
            emojisTrouves.forEach(chaqueEmoji => {
                statistiquesParAuteur[nomAuteur][chaqueEmoji] = (statistiquesParAuteur[nomAuteur][chaqueEmoji] || 0) + 1;
            });
        }
    });

    const topsParAuteur = {};

    Object.entries(statistiquesParAuteur).forEach(([nomAuteur, collectionEmojis]) => {
        const emojisTries = Object.entries(collectionEmojis)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);

        // On n'ajoute l'auteur que s'il a au moins un émoji détecté
        if (emojisTries.length > 0) {
            topsParAuteur[nomAuteur] = emojisTries.map(([leEmoji, leNombre]) => ({
                emoji: leEmoji,
                count: leNombre
            }));
        }
    });

    return topsParAuteur;
}
