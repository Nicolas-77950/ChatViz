/**
 * renduWrapped.js
 * Gère l'affichage (remplissage du template HTML) et la capture PNG du Wrapped.
 */

import { toPng } from 'html-to-image';
import { determinerCouleurAccent, formaterLeMoment, tronquerVerdict } from './logiqueWrapped.js';

/**
 * Remplit le template Wrapped avec les données d'analyse disponibles.
 * Chaque brique est affichée uniquement si ses données existent.
 * @param {HTMLElement} conteneur - Le conteneur cloné du template.
 * @param {Object} resultats - L'objet resultatsWrapped contenant toutes les analyses.
 */
function remplirWrapped(conteneur, resultats) {
    // Couleur d'accent personnalisée
    const couleurDAccent = determinerCouleurAccent(resultats.emojis);
    conteneur.style.setProperty('--wrapped-accent', couleurDAccent);

    // --- EN-TÊTE ---
    const titreDuFichier = conteneur.querySelector('.wrapped-titre-fichier');
    if (resultats.nomFichier) {
        // Extraire un prénom à partir du nom de fichier (ex: "Discussion WhatsApp avec Marie.txt" → "Marie")
        const nomNettoye = resultats.nomFichier.replace('.txt', '').replace('Discussion WhatsApp avec ', '');
        titreDuFichier.textContent = `Ton résumé avec ${nomNettoye}`;
    }

    const dateDAnalyse = conteneur.querySelector('.wrapped-date-analyse');
    const maintenant = new Date();
    dateDAnalyse.textContent = `Analysé le ${maintenant.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}`;

    // --- BRIQUE VOLUME ---
    if (resultats.volumeMessages) {
        const briqueVolume = conteneur.querySelector('#wrapped-brique-volume');
        briqueVolume.classList.remove('hidden');

        const zoneDeContenu = briqueVolume.querySelector('.wrapped-volume-contenu');
        const tousLesAuteurs = Object.keys(resultats.volumeMessages);
        const totalDesMessages = Object.values(resultats.volumeMessages).reduce((accumulateur, valeur) => accumulateur + valeur, 0);

        const paletteCouleurs = ['#818cf8', '#f472b6', '#34d399', '#fbbf24'];

        tousLesAuteurs.forEach((nomAuteur, index) => {
            const nombreDeMessages = resultats.volumeMessages[nomAuteur];
            const pourcentage = totalDesMessages > 0 ? ((nombreDeMessages / totalDesMessages) * 100).toFixed(1) : 0;
            const couleur = paletteCouleurs[index % paletteCouleurs.length];

            const ligneHTML = document.createElement('div');
            ligneHTML.style.cssText = 'margin-bottom: 4px;';
            ligneHTML.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; white-space: nowrap;">
                    <span style="font-weight: 700; color: #e2e8f0; font-size: 14px;">${nomAuteur}</span>
                    <span style="font-size: 12px; color: #94a3b8; white-space: nowrap;">${nombreDeMessages.toLocaleString()} msgs · ${pourcentage}%</span>
                </div>
                <div style="height: 10px; width: 100%; background: rgba(255,255,255,0.05); border-radius: 999px; overflow: hidden;">
                    <div style="height: 100%; width: ${pourcentage}%; background: ${couleur}; border-radius: 999px; box-shadow: 0 0 12px ${couleur}55;"></div>
                </div>
            `;
            zoneDeContenu.appendChild(ligneHTML);
        });
    }

    // --- BRIQUE ACTIVITÉ ---
    if (resultats.activite) {
        const briqueDActivite = conteneur.querySelector('#wrapped-brique-activite');
        briqueDActivite.classList.remove('hidden');

        briqueDActivite.querySelector('.wrapped-val-jour-actif').textContent = resultats.activite.jourPlusActif;
        briqueDActivite.querySelector('.wrapped-val-moment').textContent = formaterLeMoment(resultats.activite.momentLePlusActif);
        briqueDActivite.querySelector('.wrapped-val-total').textContent = resultats.activite.totalMessages.toLocaleString();
    }

    // --- BRIQUE TEMPS DE RÉPONSE ---
    if (resultats.tempsReponse) {
        const briqueTemps = conteneur.querySelector('#wrapped-brique-temps');
        briqueTemps.classList.remove('hidden');

        const zoneDeContenu = briqueTemps.querySelector('.wrapped-temps-contenu');
        const statistiquesParAuteur = resultats.tempsReponse.statsParAuteur;

        Object.entries(statistiquesParAuteur).forEach(([nomAuteur, statistiques]) => {
            const carteHTML = document.createElement('div');
            carteHTML.style.cssText = 'display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.05); padding: 12px 16px; border-radius: 12px; white-space: nowrap;';
            carteHTML.innerHTML = `
                <span style="font-weight: 700; color: #e2e8f0; font-size: 14px;">${nomAuteur}</span>
                <span style="font-weight: 800; color: #818cf8; font-size: 16px; white-space: nowrap;">${statistiques.moyenneFormatee}</span>
            `;
            zoneDeContenu.appendChild(carteHTML);
        });
    }

    // --- BRIQUE EMOJIS ---
    if (resultats.emojis) {
        const briqueEmojis = conteneur.querySelector('#wrapped-brique-emojis');
        briqueEmojis.classList.remove('hidden');

        const zoneDeContenu = briqueEmojis.querySelector('.wrapped-emojis-contenu');

        Object.entries(resultats.emojis).forEach(([nomAuteur, meilleursEmojis]) => {
            const colonneAuteur = document.createElement('div');
            colonneAuteur.style.cssText = 'flex: 1; min-width: 0;';

            let emojisHTML = `<p style="font-weight: 700; color: #e2e8f0; font-size: 14px; margin-bottom: 12px;">${nomAuteur}</p>`;
            // Limiter à 3 emojis pour le Wrapped (concis)
            meilleursEmojis.slice(0, 3).forEach(item => {
                emojisHTML += `
                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px; white-space: nowrap;">
                        <span style="font-size: 28px; line-height: 1; flex-shrink: 0;">${item.emoji}</span>
                        <span style="font-size: 13px; color: #94a3b8; font-weight: 600; white-space: nowrap;">${item.count} fois</span>
                    </div>
                `;
            });

            colonneAuteur.innerHTML = emojisHTML;
            zoneDeContenu.appendChild(colonneAuteur);
        });
    }

    // --- BRIQUE VERDICT IA AMOUR ---
    if (resultats.verdictAmour) {
        const briqueAmour = conteneur.querySelector('#wrapped-brique-ia-amour');
        briqueAmour.classList.remove('hidden');
        briqueAmour.querySelector('.wrapped-verdict-amour-texte').textContent = tronquerVerdict(resultats.verdictAmour);
    }

    // --- BRIQUE VERDICT IA ENGAGEMENT ---
    if (resultats.verdictEngagement) {
        const briqueEngagement = conteneur.querySelector('#wrapped-brique-ia-engagement');
        briqueEngagement.classList.remove('hidden');
        briqueEngagement.querySelector('.wrapped-verdict-engagement-texte').textContent = tronquerVerdict(resultats.verdictEngagement);
    }
}

/**
 * Génère l'image PNG du Wrapped et lance le téléchargement.
 * @param {Object} resultats - L'objet resultatsWrapped contenant toutes les analyses.
 */
export async function genererImageWrapped(resultats) {
    const modeleDuWrapped = document.querySelector('#template-wrapped');
    if (!modeleDuWrapped) {
        console.error('[ChatViz] Template Wrapped introuvable.');
        return;
    }

    // 1. Cloner le template et le placer dans un conteneur temporaire hors écran
    const conteneurTemporaire = document.createElement('div');
    conteneurTemporaire.style.cssText = 'position: fixed; left: -9999px; top: 0; z-index: -1;';
    document.body.appendChild(conteneurTemporaire);

    const instanceDuWrapped = modeleDuWrapped.content.cloneNode(true);
    conteneurTemporaire.appendChild(instanceDuWrapped);

    // 2. Récupérer le vrai nœud DOM (pas le DocumentFragment)
    const zoneDeRendu = conteneurTemporaire.querySelector('#wrapped-render-zone');

    // 3. Remplir avec les données
    remplirWrapped(zoneDeRendu, resultats);

    // 4. Petit délai pour laisser le navigateur peindre les styles
    await new Promise(resolve => setTimeout(resolve, 200));

    try {
        // 5. Capture en PNG haute définition (pixelRatio 2 = retina)
        const urlDeLImage = await toPng(zoneDeRendu, {
            pixelRatio: 2,
            backgroundColor: '#0f0d1a',
        });

        // 6. Téléchargement automatique
        const lienDeTelechargement = document.createElement('a');
        lienDeTelechargement.download = 'chatviz-wrapped.png';
        lienDeTelechargement.href = urlDeLImage;
        lienDeTelechargement.click();

        console.log('[ChatViz] Wrapped exporté avec succès !');

    } catch (erreur) {
        console.error('[ChatViz] Erreur lors de la génération du Wrapped :', erreur);
        alert('Une erreur est survenue lors de la génération de votre Wrapped. Veuillez réessayer.');
    } finally {
        // 7. Nettoyage du conteneur temporaire
        document.body.removeChild(conteneurTemporaire);
    }
}
