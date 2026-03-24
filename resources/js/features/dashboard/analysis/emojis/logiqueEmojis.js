/**
 * logiqueEmojis.js
 * Extrait et compte les émojis utilisés dans la conversation.
 */

/**
 * Analyse les messages pour classer les émojis par auteur.
 * @param {Array} messages - Liste des messages.
 * @returns {Object} - Top émojis par auteur.
 */
export function calculerEmojis(messages) {
    const statsParAuteur = {};
    
    // Regex plus robuste pour capturer tous les types d'émojis (y compris modificateurs et séquences)
    const regexEmoji = /\p{Emoji_Presentation}|\p{Emoji}\uFE0F/gu;

    messages.forEach(msg => {
        if (!statsParAuteur[msg.auteur]) {
            statsParAuteur[msg.auteur] = {};
        }

        const emojistrouves = msg.message.match(regexEmoji);
        if (emojistrouves) {
            emojistrouves.forEach(emoji => {
                statsParAuteur[msg.auteur][emoji] = (statsParAuteur[msg.auteur][emoji] || 0) + 1;
            });
        }
    });

    const topsParAuteur = {};

    Object.entries(statsParAuteur).forEach(([auteur, emojis]) => {
        const trie = Object.entries(emojis)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);

        // On n'ajoute l'auteur que s'il a au moins un émoji détecté
        if (trie.length > 0) {
            topsParAuteur[auteur] = trie.map(([emoji, count]) => ({
                emoji,
                count
            }));
        }
    });

    return topsParAuteur;
}
