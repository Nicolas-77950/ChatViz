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
    const couleurAccent = determinerCouleurAccent(resultats.emojis);
    conteneur.style.setProperty('--wrapped-accent', couleurAccent);

    // --- EN-TÊTE ---
    const titreFichier = conteneur.querySelector('.wrapped-titre-fichier');
    if (resultats.nomFichier) {
        // Extraire un prénom à partir du nom de fichier (ex: "Discussion WhatsApp avec Marie.txt" → "Marie")
        const nomNettoye = resultats.nomFichier.replace('.txt', '').replace('Discussion WhatsApp avec ', '');
        titreFichier.textContent = `Ton résumé avec ${nomNettoye}`;
    }

    const dateAnalyse = conteneur.querySelector('.wrapped-date-analyse');
    const maintenant = new Date();
    dateAnalyse.textContent = `Analysé le ${maintenant.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}`;

    // --- BRIQUE VOLUME ---
    if (resultats.volumeMeter) {
        const briqueVolume = conteneur.querySelector('#wrapped-brique-volume');
        briqueVolume.classList.remove('hidden');

        const zoneContenu = briqueVolume.querySelector('.wrapped-volume-contenu');
        const tousLesAuteurs = Object.keys(resultats.volumeMeter);
        const totalMessages = Object.values(resultats.volumeMeter).reduce((acc, val) => acc + val, 0);

        const paletteCouleurs = ['#818cf8', '#f472b6', '#34d399', '#fbbf24'];

        tousLesAuteurs.forEach((nomAuteur, index) => {
            const nbMessages = resultats.volumeMeter[nomAuteur];
            const pourcentage = totalMessages > 0 ? ((nbMessages / totalMessages) * 100).toFixed(1) : 0;
            const couleur = paletteCouleurs[index % paletteCouleurs.length];

            const ligneHTML = document.createElement('div');
            ligneHTML.style.cssText = 'margin-bottom: 4px;';
            ligneHTML.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; white-space: nowrap;">
                    <span style="font-weight: 700; color: #e2e8f0; font-size: 14px;">${nomAuteur}</span>
                    <span style="font-size: 12px; color: #94a3b8; white-space: nowrap;">${nbMessages.toLocaleString()} msgs · ${pourcentage}%</span>
                </div>
                <div style="height: 10px; width: 100%; background: rgba(255,255,255,0.05); border-radius: 999px; overflow: hidden;">
                    <div style="height: 100%; width: ${pourcentage}%; background: ${couleur}; border-radius: 999px; box-shadow: 0 0 12px ${couleur}55;"></div>
                </div>
            `;
            zoneContenu.appendChild(ligneHTML);
        });
    }

    // --- BRIQUE ACTIVITÉ ---
    if (resultats.activite) {
        const briqueActivite = conteneur.querySelector('#wrapped-brique-activite');
        briqueActivite.classList.remove('hidden');

        briqueActivite.querySelector('.wrapped-val-jour-actif').textContent = resultats.activite.jourPlusActif;
        briqueActivite.querySelector('.wrapped-val-moment').textContent = formaterLeMoment(resultats.activite.momentLePlusActif);
        briqueActivite.querySelector('.wrapped-val-total').textContent = resultats.activite.totalMessages.toLocaleString();
    }

    // --- BRIQUE TEMPS DE RÉPONSE ---
    if (resultats.tempsReponse) {
        const briqueTemps = conteneur.querySelector('#wrapped-brique-temps');
        briqueTemps.classList.remove('hidden');

        const zoneContenu = briqueTemps.querySelector('.wrapped-temps-contenu');
        const statsParAuteur = resultats.tempsReponse.statsParAuteur;

        Object.entries(statsParAuteur).forEach(([nomAuteur, stats]) => {
            const carteHTML = document.createElement('div');
            carteHTML.style.cssText = 'display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.05); padding: 12px 16px; border-radius: 12px; white-space: nowrap;';
            carteHTML.innerHTML = `
                <span style="font-weight: 700; color: #e2e8f0; font-size: 14px;">${nomAuteur}</span>
                <span style="font-weight: 800; color: #818cf8; font-size: 16px; white-space: nowrap;">${stats.moyenneFormatee}</span>
            `;
            zoneContenu.appendChild(carteHTML);
        });
    }

    // --- BRIQUE EMOJIS ---
    if (resultats.emojis) {
        const briqueEmojis = conteneur.querySelector('#wrapped-brique-emojis');
        briqueEmojis.classList.remove('hidden');

        const zoneContenu = briqueEmojis.querySelector('.wrapped-emojis-contenu');

        Object.entries(resultats.emojis).forEach(([nomAuteur, topsEmojis]) => {
            const colonneAuteur = document.createElement('div');
            colonneAuteur.style.cssText = 'flex: 1; min-width: 0;';

            let emojisHTML = `<p style="font-weight: 700; color: #e2e8f0; font-size: 14px; margin-bottom: 12px;">${nomAuteur}</p>`;
            // Limiter à 3 emojis pour le Wrapped (concis)
            topsEmojis.slice(0, 3).forEach(item => {
                emojisHTML += `
                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px; white-space: nowrap;">
                        <span style="font-size: 28px; line-height: 1; flex-shrink: 0;">${item.emoji}</span>
                        <span style="font-size: 13px; color: #94a3b8; font-weight: 600; white-space: nowrap;">${item.count} fois</span>
                    </div>
                `;
            });

            colonneAuteur.innerHTML = emojisHTML;
            zoneContenu.appendChild(colonneAuteur);
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
    const modeleWrapped = document.querySelector('#template-wrapped');
    if (!modeleWrapped) {
        console.error('[ChatViz] Template Wrapped introuvable.');
        return;
    }

    // 1. Cloner le template et le placer dans un conteneur temporaire hors écran
    const conteneurTemporaire = document.createElement('div');
    conteneurTemporaire.style.cssText = 'position: fixed; left: -9999px; top: 0; z-index: -1;';
    document.body.appendChild(conteneurTemporaire);

    const instanceWrapped = modeleWrapped.content.cloneNode(true);
    conteneurTemporaire.appendChild(instanceWrapped);

    // 2. Récupérer le vrai nœud DOM (pas le DocumentFragment)
    const zoneDeRendu = conteneurTemporaire.querySelector('#wrapped-render-zone');

    // 3. Remplir avec les données
    remplirWrapped(zoneDeRendu, resultats);

    // 4. Petit délai pour laisser le navigateur peindre les styles
    await new Promise(resolve => setTimeout(resolve, 200));

    try {
        // 5. Capture en PNG haute définition (pixelRatio 2 = retina)
        const urlImage = await toPng(zoneDeRendu, {
            pixelRatio: 2,
            backgroundColor: '#0f0d1a',
        });

        // 6. Téléchargement automatique
        const lienTelechargement = document.createElement('a');
        lienTelechargement.download = 'chatviz-wrapped.png';
        lienTelechargement.href = urlImage;
        lienTelechargement.click();

        console.log('[ChatViz] Wrapped exporté avec succès !');

    } catch (erreur) {
        console.error('[ChatViz] Erreur lors de la génération du Wrapped :', erreur);
        alert('Une erreur est survenue lors de la génération de votre Wrapped. Veuillez réessayer.');
    } finally {
        // 7. Nettoyage du conteneur temporaire
        document.body.removeChild(conteneurTemporaire);
    }
}
