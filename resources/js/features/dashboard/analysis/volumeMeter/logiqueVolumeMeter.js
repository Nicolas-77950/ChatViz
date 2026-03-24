/**
 * volumeMeter.js
 * Algorithme 1 - Le "Volume-Meter"
 * Calcule le nombre total de messages envoyés par chaque personne.
 *
 * @param {Array} messages - Tableau d'objets { date, heure, auteur, message }
 * @returns {Object} - Objet du type { "Auteur 1": 1500, "Auteur 2": 1200 }
 */
export function calculerVolumeMeter(messages) {
    const volumeParAuteur = {};

    messages.forEach((msg) => {
        const auteur = msg.auteur;
        
        // On ajoute +1 à l'auteur correspondant
        if (!volumeParAuteur[auteur]) {
            volumeParAuteur[auteur] = 0;
        }
        volumeParAuteur[auteur]++;
    });

    console.log("[ChatViz] Calcul du Volume-Meter terminé :", volumeParAuteur);

    return volumeParAuteur;
}
