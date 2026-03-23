/**
 * logiqueTempsReponse.js
 * Calcule les délais de réponse entre les participants.
 */

const PAUSE_MIN_SEC = 8 * 3600;
const PAUSE_MAX_SEC = 24 * 3600;

/**
 * Convertit une date et une heure en horodatage millisecondes.
 */
function versHorodatage(date, heure) {
    const [jour, mois, annee] = date.split('/');
    return new Date(`${annee}-${mois}-${jour}T${heure}`).getTime();
}

/**
 * Formate une durée en secondes en une chaîne lisible (h, min, s).
 */
function formaterDuree(secondes) {
    const h = Math.floor(secondes / 3600);
    const min = Math.floor((secondes % 3600) / 60);
    const sec = Math.floor(secondes % 60);
    if (h > 0) return `${h}h ${String(min).padStart(2, '0')}min`;
    if (min > 0) return `${min}min ${String(sec).padStart(2, '0')}s`;
    return `${sec}s`;
}

/**
 * Analyse les messages pour calculer les statistiques de temps de réponse.
 */
export function calculerTempsReponse(messages) {
    const tempsParAuteur = {};

    let dernierAuteur = null;
    let dernierHorodatage = null;

    messages.forEach((msg) => {
        const horodatageActuel = versHorodatage(msg.date, msg.heure);

        if (dernierAuteur !== null && msg.auteur !== dernierAuteur) {
            const tempsReponseSec = (horodatageActuel - dernierHorodatage) / 1000;

            // Exclusion des pauses naturelles (nuit)
            const estUnePauseNaturelle = tempsReponseSec >= PAUSE_MIN_SEC
                && tempsReponseSec <= PAUSE_MAX_SEC;

            if (!estUnePauseNaturelle) {
                if (!tempsParAuteur[msg.auteur]) {
                    tempsParAuteur[msg.auteur] = [];
                }
                tempsParAuteur[msg.auteur].push(tempsReponseSec);
            }
        }

        dernierAuteur = msg.auteur;
        dernierHorodatage = horodatageActuel;
    });

    const statsParAuteur = {};
    Object.entries(tempsParAuteur).forEach(([auteur, listeTemps]) => {
        const total = listeTemps.reduce((acc, t) => acc + t, 0);
        const moyenne = total / listeTemps.length;

        statsParAuteur[auteur] = {
            nombreDeReponses: listeTemps.length,
            totalFormate: formaterDuree(total),
            moyenneFormatee: formaterDuree(moyenne),
            totalSecondes: total,
            moyenneSecondes: moyenne,
        };
    });

    const tousLesTemps = Object.entries(tempsParAuteur).flatMap(([auteur, listeTemps]) =>
        listeTemps.map(t => ({ 
            auteur: auteur, 
            duree: t, 
            dureeFormatee: formaterDuree(t) 
        }))
    );

    const top5LongsTemps = tousLesTemps
        .sort((a, b) => b.duree - a.duree)
        .slice(0, 5);

    return { 
        statsParAuteur, 
        top5LongsTemps 
    };
}
