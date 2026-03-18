/**
 * parser.js
 * Ce fichier est le "cerveau" qui décode votre fichier WhatsApp.
 * Il transforme du texte brut illisible par un ordinateur en données structurées.
 * 
 * Rappel : Tout se passe localement dans le navigateur !
 */

/**
 * 🔍 LA RÉGEX (Expression Régulière)
 * C'est un "mousqueton" qui attrape les infos dans chaque ligne du fichier.
 * On cherche ce format : [DATE HEURE] AUTEUR: MESSAGE
 * 
 * Décomposition :
 * ^\[          -> Commence par un crochet ouvrant "["
 * (\d{2}\/\d{2}\/\d{4}) -> Attrape la date (ex: 28/01/2025)
 * ,?\s         -> Optionnel: une virgule, puis un espace
 * (\d{2}:\d{2}:\d{2})   -> Attrape l'heure (ex: 09:53:30)
 * \]           -> Crochet fermant "]"
 * \s           -> Un espace
 * ([^:]+)      -> Attrape tout ce qui n'est pas un ":" (c'est l'auteur !)
 * :\s          -> Un ":" suivi d'un espace
 * (.+)         -> Attrape tout le reste (c'est le contenu du message)
 * $            -> Fin de la ligne
 */
const WHATSAPP_REGEX = /^\[(\d{2}\/\d{2}\/\d{4}),?\s(\d{2}:\d{2}:\d{2})\]\s([^:]+):\s(.+)$/;

/**
 * Fonction parseChat : 
 * Transforme le fichier .txt en un tableau d'objets JavaScript.
 */
export function parseChat(file) {
    return new Promise((resolve, reject) => {
        // 1. On crée un "lecteur" de fichiers
        const reader = new FileReader();

        // 2. On définit ce qu'il se passe quand la lecture est finie
        reader.onload = (event) => {
            const texteComplet = event.target.result; // Le texte brut du fichier
            const messagesExtraits = [];

            // 3. On découpe le gros texte en une liste de lignes individuelles
            const lignes = texteComplet.split(/\r?\n/);

            lignes.forEach((ligne) => {
                // Pour chaque ligne, on essaye de voir si elle ressemble à un message WhatsApp
                const resultatMatch = ligne.trim().match(WHATSAPP_REGEX);

                if (resultatMatch) {
                    // Si ça match, on range les infos proprement dans un objet
                    messagesExtraits.push({
                        date: resultatMatch[1],   // Ce que la regex a trouvé dans la 1ère parenthèse
                        heure: resultatMatch[2],  // 2ème parenthèse
                        auteur: resultatMatch[3], // 3ème parenthèse
                        message: resultatMatch[4],// 4ème parenthèse
                    });
                }
            });

            console.log(`[ChatViz] Parsing terminé : ${messagesExtraits.length} messages extraits.`);
            
            // 4. On renvoie le tableau final de messages
            resolve(messagesExtraits);
        };

        // En cas d'erreur de lecture (fichier corrompu, etc.)
        reader.onerror = () => {
            reject(new Error('Impossible de lire le fichier.'));
        };

        // 5. On lance réellement la lecture du fichier en texte
        reader.readAsText(file);
    });
}
