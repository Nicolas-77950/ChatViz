/**
 * parser.js
 * Décode les fichiers d'exportation WhatsApp (.txt) pour structurer les messages.
 */

// Expressions régulières pour différents formats
const EXPRESSION_STANDARD = /^\[(\d{2}[\/\-]\d{2}[\/\-]\d{2,4})[,\s]+(\d{1,2}:\d{2}(?::\d{2})?)\]\s+([^:]+):\s*(.+)$/;
const EXPRESSION_PARENTHESES = /^([^(\n]+)\s?\((\d{1,2}:\d{2})\)\s?:\s?(.+)$/;
const EXPRESSION_SIMPLE = /^([^:\[\]]+)\s?:\s?(.+)$/;

/**
 * Lit et prépare le contenu du fichier pour l'analyse.
 * @param {File|Object} fichier - Le fichier à analyser.
 */
export function analyserFichier(fichier) {
    // Si le contenu est déjà présent (ex: relecture depuis l'historique via Fetch)
    if (fichier.content) {
        return Promise.resolve(extraireLesMessages(fichier.content));
    }

    // Sinon, lecture classique via FileReader (Import Drag & Drop)
    return new Promise((resolve, reject) => {
        const lecteurDeFichier = new FileReader();

        lecteurDeFichier.onload = (evenement) => {
            const contenuBrut = evenement.target.result;
            resolve(extraireLesMessages(contenuBrut));
        };

        lecteurDeFichier.onerror = () => {
            reject(new Error("Erreur lors de la lecture du fichier."));
        };

        lecteurDeFichier.readAsText(fichier);
    });
}

/**
 * Logique interne de découpage et de mise en forme des messages.
 * @param {string} contenuBrut - Texte brut de la discussion.
 * @returns {Array} - Liste des messages structurés.
 */
function extraireLesMessages(contenuBrut) {
    const tableauMessages = [];
    const toutesLesLignes = contenuBrut.split(/\r?\n/);

    toutesLesLignes.forEach((ligneCourante) => {
        const ligneNettoyee = ligneCourante.trim();
        if (!ligneNettoyee) return;
        
        // On ignore les lignes de statut pur (commençant par trois points)
        if (ligneNettoyee.startsWith('...')) return;

        let matchStandard = ligneNettoyee.match(EXPRESSION_STANDARD);
        let matchParentheses = ligneNettoyee.match(EXPRESSION_PARENTHESES);
        let matchSimple = ligneNettoyee.match(EXPRESSION_SIMPLE);

        // --- 1. SI C'EST UN NOUVEAU MESSAGE (FORMAT STANDARD : Brackets) ---
        if (matchStandard) {
            // Nettoyage du nom d'auteur (enlever le tilde ~ souvent présent sur WhatsApp)
            const auteurNettoye = matchStandard[3].trim().replace(/^~\s?/, '');
            
            tableauMessages.push({
                date: matchStandard[1],
                heure: matchStandard[2],
                auteur: auteurNettoye,
                message: matchStandard[4],
                type: 'standard'
            });
        } 
        // --- 2. SI C'EST UN NOUVEAU MESSAGE (FORMAT PARENTHÈSES) ---
        else if (matchParentheses) {
            tableauMessages.push({
                date: '01/01/1970',
                heure: matchParentheses[2] + ':00', 
                auteur: matchParentheses[1].trim(),
                message: matchParentheses[3].trim(),
                type: 'parentheses'
            });
        }
        // --- 3. SI C'EST UN NOUVEAU MESSAGE (FORMAT SIMPLE) ---
        // On rajoute une sécurité : l'auteur ne doit pas contenir de [ ou ]
        else if (matchSimple && matchSimple[1].length < 40) {
            tableauMessages.push({
                date: '01/01/1970',
                heure: '00:00:00',
                auteur: matchSimple[1].trim().replace(/^~\s?/, ''),
                message: matchSimple[2].trim(),
                type: 'simple'
            });
        }
        // --- 4. SI C'EST LA SUITE DU MESSAGE PRÉCÉDENT (MULTI-LIGNE) ---
        else if (tableauMessages.length > 0) {
            tableauMessages[tableauMessages.length - 1].message += '\n' + ligneNettoyee;
        }
    });

    console.log(`[ChatViz] Décodage terminé : ${tableauMessages.length} messages extraits.`);
    return tableauMessages;
}
