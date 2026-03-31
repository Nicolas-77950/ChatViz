/**
 * logiqueAmour.js
 * Gère le prompt et l'appel pour l'analyse des chances amoureuses.
 */

export const CONFIG_AMOUR = {
    id: 'amour',
    label: 'Chances Amoureuses',
    icone: '💘',
    description: 'Évalue les signaux amoureux entre les participants.'
};

export async function lancerAnalyseAmour(listeMessages, nomDuFichier) {
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
            type_analyse: CONFIG_AMOUR.id,
            file_name: nomDuFichier
        })
    });

    const donneesRecues = await reponseServeur.json();

    if (!reponseServeur.ok || !donneesRecues.verdict) {
        throw new Error(donneesRecues.error || "L'IA locale n'a pas pu répondre.");
    }

    return {
        verdict: donneesRecues.verdict,
        typeAnalyse: CONFIG_AMOUR,
    };
}
