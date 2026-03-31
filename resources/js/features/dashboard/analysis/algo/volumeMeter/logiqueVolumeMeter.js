/**
 * volumeMeter.js
 * Algorithme de calcul du volume de discussion.
 * Calcule le nombre total de messages envoyés par chaque personne.
 *
 * @param {Array} listeMessages - Tableau d'objets { date, heure, auteur, message }
 * @returns {Object} - Objet du type { "Auteur 1": 1500, "Auteur 2": 1200 }
 */
export function calculerVolumeMeter(listeMessages) {
    const volumeParAuteur = {};

    listeMessages.forEach((messageUnique) => {
        const nomDeLAuteur = messageUnique.auteur;
        
        // On incrémente le compteur pour cet auteur
        if (!volumeParAuteur[nomDeLAuteur]) {
            volumeParAuteur[nomDeLAuteur] = 0;
        }
        volumeParAuteur[nomDeLAuteur]++;
    });

    console.log("[ChatViz] Calcul du volume de parole terminé.");

    return volumeParAuteur;
}
