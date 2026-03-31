/**
 * logiqueEngagement.js
 * Gère le prompt et l'appel pour l'analyse du niveau d'engagement.
 */

export const CONFIG_ENGAGEMENT = {
    id: 'engagement',
    label: 'Niveau d\'Engagement',
    icone: '🔥',
    description: 'Mesure l\'investissement émotionnel de chacun.'
};

export async function lancerAnalyseEngagement(listeMessages, nomDuFichier) {
    const jetonCSRF = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

    const reponseServeur = await fetch('/analyze-ai', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRF-TOKEN': jetonCSRF
        },
        body: JSON.stringify({
            messages: listeMessages,
            type_analyse: CONFIG_ENGAGEMENT.id,
            file_name: nomDuFichier
        })
    });

    const donneesRecues = await reponseServeur.json();

    if (!reponseServeur.ok || !donneesRecues.verdict) {
        throw new Error(donneesRecues.error || "L'IA locale n'a pas pu répondre.");
    }

    return {
        verdict: donneesRecues.verdict,
        typeAnalyse: CONFIG_ENGAGEMENT,
    };
}
