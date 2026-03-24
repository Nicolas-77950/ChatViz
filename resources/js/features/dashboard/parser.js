/**
 * parser.js
 * Décode les fichiers d'exportation WhatsApp (.txt) pour structurer les messages.
 */

// Expressions régulières pour différents formats
const REGEX_STANDART = /^\[(\d{2}\/\d{2}\/\d{2,4}),?\s(\d{2}:\d{2}:\d{2})\]\s([^:]+):\s(.+)$/;
const REGEX_PARENTHESES = /^([^(\n]+)\s?\((\d{1,2}:\d{2})\)\s?:\s?(.+)$/;
const REGEX_SIMPLE = /^([^:]+)\s?:\s?(.+)$/;

export function analyserFichier(fichier) {
    // Si le contenu est déjà présent (ex: relecture depuis l'historique via Fetch)
    if (fichier.content) {
        return Promise.resolve(extraireMessages(fichier.content));
    }

    // Sinon, lecture classique via FileReader (Import Drag & Drop)
    return new Promise((resolve, reject) => {
        const lecteur = new FileReader();

        lecteur.onload = (evenement) => {
            const contenu = evenement.target.result;
            resolve(extraireMessages(contenu));
        };

        lecteur.onerror = () => {
            reject(new Error("Erreur lors de la lecture du fichier."));
        };

        lecteur.readAsText(fichier);
    });
}

/**
 * Logique interne de découpage et de matching des messages.
 * @param {string} contenu - Texte brut du chat.
 * @returns {Array} - Liste des messages structurés.
 */
function extraireMessages(contenu) {
    const messages = [];
    const lignes = contenu.split(/\r?\n/);

    lignes.forEach((ligne) => {
        const trimmedLigne = ligne.trim();
        if (!trimmedLigne) return;
        
        // On ignore les lignes de statut pur (commençant par ...)
        if (trimmedLigne.startsWith('...')) return;

        let matchStandard = trimmedLigne.match(REGEX_STANDART);
        let matchParentheses = trimmedLigne.match(REGEX_PARENTHESES);
        let matchSimple = trimmedLigne.match(REGEX_SIMPLE);

        // --- 1. SI C'EST UN NOUVEAU MESSAGE (FORMAT STANDARD) ---
        if (matchStandard) {
            messages.push({
                date: matchStandard[1],
                heure: matchStandard[2],
                auteur: matchStandard[3].trim(),
                message: matchStandard[4],
                type: 'standard'
            });
        } 
        // --- 2. SI C'EST UN NOUVEAU MESSAGE (FORMAT PARENTHÈSES) ---
        else if (matchParentheses) {
            messages.push({
                date: '01/01/1970',
                heure: matchParentheses[2] + ':00', 
                auteur: matchParentheses[1].trim(),
                message: matchParentheses[3].trim(),
                type: 'parentheses'
            });
        }
        // --- 3. SI C'EST UN NOUVEAU MESSAGE (FORMAT SIMPLE) ---
        else if (matchSimple && matchSimple[1].length < 40) {
            messages.push({
                date: '01/01/1970',
                heure: '00:00:00',
                auteur: matchSimple[1].trim(),
                message: matchSimple[2].trim(),
                type: 'simple'
            });
        }
        // --- 4. SI C'EST LA SUITE DU MESSAGE PRÉCÉDENT (MULTI-LIGNE) ---
        else if (messages.length > 0) {
            messages[messages.length - 1].message += '\n' + trimmedLigne;
        }
    });

    console.log(`[ChatViz] Parsing terminé : ${messages.length} messages extraits.`);
    return messages;
}
