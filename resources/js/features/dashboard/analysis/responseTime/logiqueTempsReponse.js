/**
 * logiqueTempsReponse.js
 * Calcule les délais de réponse entre les participants.
 */

const PAUSE_MINIMALE_SECONDES = 8 * 3600;
const PAUSE_MAXIMALE_SECONDES = 24 * 3600;

/**
 * Convertit une date et une heure en horodatage millisecondes.
 */
function versHorodatage(dateAppel, heureAppel) {
    const [jour, mois, annee] = dateAppel.split('/');
    const formatAnneeVite = annee.length === 2 ? `20${annee}` : annee;
    return new Date(`${formatAnneeVite}-${mois}-${jour}T${heureAppel}`).getTime();
}

/**
 * Formate une durée en secondes en une chaîne lisible (h, min, s).
 */
function formaterLaDuree(secondesBrutes) {
    const heures = Math.floor(secondesBrutes / 3600);
    const minutes = Math.floor((secondesBrutes % 3600) / 60);
    const secondes = Math.floor(secondesBrutes % 60);
    if (heures > 0) return `${heures}h ${String(minutes).padStart(2, '0')}min`;
    if (minutes > 0) return `${minutes}min ${String(secondes).padStart(2, '0')}s`;
    return `${secondes}s`;
}

/**
 * Analyse les messages pour calculer les statistiques de temps de réponse.
 * @param {Array} listeMessages - Les messages de la discussion.
 */
export function calculerTempsReponse(listeMessages) {
    const tempsCollectesParAuteur = {};

    let auteurPrecedent = null;
    let horodatagePrecedent = null;

    listeMessages.forEach((messageUnique) => {
        const horodatageActuel = versHorodatage(messageUnique.date, messageUnique.heure);

        if (auteurPrecedent !== null && messageUnique.auteur !== auteurPrecedent) {
            const differenceEnSecondes = (horodatageActuel - horodatagePrecedent) / 1000;

            // Exclusion des pauses naturelles (ex: nuit de sommeil)
            const estUneGrossePause = differenceEnSecondes >= PAUSE_MINIMALE_SECONDES
                && differenceEnSecondes <= PAUSE_MAXIMALE_SECONDES;

            if (!estUneGrossePause) {
                if (!tempsCollectesParAuteur[messageUnique.auteur]) {
                    tempsCollectesParAuteur[messageUnique.auteur] = [];
                }
                tempsCollectesParAuteur[messageUnique.auteur].push(differenceEnSecondes);
            }
        }

        auteurPrecedent = messageUnique.auteur;
        horodatagePrecedent = horodatageActuel;
    });

    const statistiquesParAuteur = {};
    Object.entries(tempsCollectesParAuteur).forEach(([nomAuteur, listeDelais]) => {
        const sommeTotale = listeDelais.reduce((accumulateur, temps) => accumulateur + temps, 0);
        const moyenneCalculee = sommeTotale / listeDelais.length;

        statistiquesParAuteur[nomAuteur] = {
            nombreDeReponses: listeDelais.length,
            totalFormate: formaterLaDuree(sommeTotale),
            moyenneFormatee: formaterLaDuree(moyenneCalculee),
            totalSecondes: sommeTotale,
            moyenneSecondes: moyenneCalculee,
        };
    });

    const tousLesDelais = Object.entries(tempsCollectesParAuteur).flatMap(([nomAuteur, listeDelais]) =>
        listeDelais.map(delai => ({ 
            auteur: nomAuteur, 
            duree: delai, 
            dureeFormatee: formaterLaDuree(delai) 
        }))
    );

    const cinqPlusLongsDelais = tousLesDelais
        .sort((a, b) => b.duree - a.duree)
        .slice(0, 5);

    return { 
        statsParAuteur: statistiquesParAuteur, 
        top5LongsTemps: cinqPlusLongsDelais 
    };
}
