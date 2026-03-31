/**
 * logiqueActivite.js
 * Calcule les habitudes de discussion et les moments de pointe.
 */

export function calculerActivite(messages) {
    const parHeure = Array(24).fill(0);
    const parJour = Array(7).fill(0);
    const periodes = {
        nuit: 0,    // 00h-06h
        matin: 0,   // 06h-12h
        apresmidi: 0, // 12h-18h
        soiree: 0    // 18h-00h
    };

    messages.forEach((msg) => {
        const heure = parseInt(msg.heure.split(':')[0], 10);
        if (!isNaN(heure)) {
            parHeure[heure]++;
            
            // Classification par période
            if (heure >= 0 && heure < 6) periodes.nuit++;
            else if (heure >= 6 && heure < 12) periodes.matin++;
            else if (heure >= 12 && heure < 18) periodes.apresmidi++;
            else periodes.soiree++;
        }

        const [j, m, a] = msg.date.split('/');
        const formatAnnee = a.length === 2 ? `20${a}` : a;
        const dateObj = new Date(`${formatAnnee}-${m}-${j}`);
        const jourSemaine = dateObj.getDay();
        if (!isNaN(jourSemaine)) {
            parJour[jourSemaine]++;
        }
    });

    // Trouver le moment le plus actif
    const momentLePlusActif = Object.entries(periodes).reduce((a, b) => b[1] > a[1] ? b : a)[0];
    
    // Trouver le jour le plus actif
    const jourMax = Math.max(...parJour);
    const indexJourMax = parJour.indexOf(jourMax);
    const nomsJours = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

    return {
        periodes,
        parJour,
        momentLePlusActif,
        jourPlusActif: nomsJours[indexJourMax],
        totalMessages: messages.length
    };
}
