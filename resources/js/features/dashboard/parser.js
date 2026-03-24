/**
 * parser.js
 * Décode les fichiers d'exportation WhatsApp (.txt) pour structurer les messages.
 */

/**
 * Expression régulière pour extraire les informations de chaque ligne.
 * Format attendu : [DATE HEURE] AUTEUR: MESSAGE
 * 
 * Groupes de capture :
 * 1. Date (JJ/MM/AAAA)
 * 2. Heure (HH:MM:SS)
 * 3. Auteur
 * 4. Contenu du message
 */
const EXPRESSION_REGULIERE_WHATSAPP = /^\[(\d{2}\/\d{2}\/\d{2,4}),?\s(\d{2}:\d{2}:\d{2})\]\s([^:]+):\s(.+)$/;

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
        const correspondance = ligne.trim().match(EXPRESSION_REGULIERE_WHATSAPP);
        if (correspondance) {
            messages.push({
                date: correspondance[1],
                heure: correspondance[2],
                auteur: correspondance[3],
                message: correspondance[4],
            });
        }
    });

    return messages;
}
