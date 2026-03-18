/**
 * responseTime.js
 * Calcule les temps de réponse entre les participants d'une conversation WhatsApp.
 *
 * Règles :
 * - Temps < 8h   → réponse normale, on la garde
 * - Temps 8h-24h → pause naturelle (la nuit), on l'ignore
 * - Temps > 24h  → vrai délai (absence/fantôme), on le garde
 */

// 8h et 24h convertis en secondes pour les comparaisons
const PAUSE_MIN_SEC = 8 * 3600;
const PAUSE_MAX_SEC = 24 * 3600;

// Convertit "28/01/2025" + "09:53:30" en un nombre (millisecondes depuis 1970)
// On en a besoin pour soustraire deux dates facilement
function toTimestamp(date, heure) {
    const [jour, mois, annee] = date.split('/');
    return new Date(`${annee}-${mois}-${jour}T${heure}`).getTime();
}

// Transforme un nombre de secondes en texte lisible
// Ex: 3725 secondes → "1h 02min"
function formatDuree(secondes) {
    const h = Math.floor(secondes / 3600);
    const min = Math.floor((secondes % 3600) / 60);
    const sec = Math.floor(secondes % 60);
    if (h > 0) return `${h}h ${String(min).padStart(2, '0')}min`;
    if (min > 0) return `${min}min ${String(sec).padStart(2, '0')}s`;
    return `${sec}s`;
}

export function calculateResponseTime(messages) {
    // On va stocker les temps de réponse de chaque auteur dans ce tableau
    // Exemple : { "Matheo": [45, 1200, 97200], "MixOne": [30, 890] }
    const tempsParAuteur = {};

    let dernierAuteur = null;
    let dernierTimestamp = null;

    messages.forEach((msg) => {
        const ts = toTimestamp(msg.date, msg.heure);

        // Quand l'auteur change, c'est qu'il vient de répondre au message précédent
        if (dernierAuteur !== null && msg.auteur !== dernierAuteur) {
            const tempsReponseSec = (ts - dernierTimestamp) / 1000;

            // On ignore les pauses naturelles (entre 8h et 24h, typiquement la nuit)
            const estPauseNaturelle = tempsReponseSec >= PAUSE_MIN_SEC
                && tempsReponseSec <= PAUSE_MAX_SEC;

            if (!estPauseNaturelle) {
                // Si c'est la première fois qu'on voit cet auteur, on crée son tableau
                if (!tempsParAuteur[msg.auteur]) {
                    tempsParAuteur[msg.auteur] = [];
                }
                tempsParAuteur[msg.auteur].push(tempsReponseSec);
            }
        }

        // On retient toujours le dernier auteur et l'heure de son dernier message
        dernierAuteur = msg.auteur;
        dernierTimestamp = ts;
    });

    // Pour chaque auteur, on calcule son total et sa moyenne
    const statsParAuteur = {};
    Object.entries(tempsParAuteur).forEach(([auteur, temps]) => {
        const total = temps.reduce((acc, t) => acc + t, 0);
        const moyenne = total / temps.length;

        statsParAuteur[auteur] = {
            nombreDeReponses: temps.length,
            totalFormate: formatDuree(total),
            moyenneFormatee: formatDuree(moyenne),
            totalSec: total,
            moyenneSec: moyenne,
        };
    });

    // On regroupe tous les temps dans un seul tableau pour trouver le Top 5
    const tousLesTemps = Object.entries(tempsParAuteur).flatMap(([auteur, temps]) =>
        temps.map(t => ({ auteur, duree: t, dureeFormatee: formatDuree(t) }))
    );

    // On trie du plus long au plus court et on garde les 5 premiers
    const top5 = tousLesTemps
        .sort((a, b) => b.duree - a.duree)
        .slice(0, 5);

    const resultats = { statsParAuteur, top5LongsTemps: top5 };

    return resultats;
}
