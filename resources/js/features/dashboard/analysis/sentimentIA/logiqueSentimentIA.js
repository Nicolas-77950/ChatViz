/**
 * logiqueSentimentIA.js
 * Prépare et envoie les messages au serveur local (Ollama) pour une analyse sentimentale.
 * 🔒 100% local : les données ne quittent jamais la machine de l'utilisateur.
 *
 * @module sentimentIA
 */

/**
 * Liste des types d'analyse disponibles avec leurs prompts spécifiques.
 * Chaque type a un identifiant unique, un label, une icône, et une consigne pour l'IA.
 */
export const TYPES_ANALYSE = [
    {
        id: 'amour',
        label: 'Chances Amoureuses',
        icone: '💘',
        description: 'Évalue les signaux amoureux entre les participants.',
        consigne: `Analyse cette conversation WhatsApp et donne un SCORE DE CHANCES AMOUREUSES sur 100.

IMPORTANT : Commence TOUJOURS ta réponse par le score au format "## 💘 Score : XX/100"

Pour calculer le score, analyse ces critères :
- Emojis affectueux (coeurs, bisous, rougissement)
- Compliments directs ou indirects
- Qui initie les conversations
- Rapidité des réponses
- Surnoms ou mots affectueux
- Propositions de se voir
- Messages tard le soir

Réponds en Français, MAXIMUM 150 mots, avec :
1. Le score /100
2. Les 3 indices les plus forts
3. Verdict final en UNE phrase percutante`
    },
    {
        id: 'engagement',
        label: 'Niveau d\'Engagement',
        icone: '🔥',
        description: 'Mesure l\'investissement émotionnel de chacun.',
        consigne: `Analyse cette conversation WhatsApp et mesure le niveau d'engagement émotionnel de chaque participant.
Donne un SCORE d'engagement sur 100 par participant.
Regarde : longueur des messages, questions posées, partage d'émotions, projets ensemble, messages en premier, relances.
Réponds de manière CONCISE avec :
- Score d'engagement sur 100 par personne
- Qui investit le plus
- 3 moments forts maximum
- Verdict final en UNE phrase`
    }
];

/**
 * Envoie la liste de messages au backend local pour une analyse sentimentale par l'IA.
 * @param {Array} listeMessages - Tableau d'objets { date, heure, auteur, message }
 * @param {string} typeAnalyse - Identifiant du type d'analyse (ex: 'amour', 'engagement')
 * @returns {Promise<Object>} - Résultat contenant le verdict et le type d'analyse
 */
export async function lancerAnalyseSentimentIA(listeMessages, typeAnalyse) {
    // Recherche du type d'analyse sélectionné
    const configAnalyse = TYPES_ANALYSE.find(type => type.id === typeAnalyse);

    if (!configAnalyse) {
        throw new Error(`Type d'analyse inconnu : ${typeAnalyse}`);
    }

    // Construction de la question spécialisée pour l'IA
    const consigneComplete = configAnalyse.consigne;

    console.log(`[ChatViz] Lancement de l'analyse "${configAnalyse.label}" sur ${listeMessages.length} messages...`);

    // Appel au backend Laravel local (qui contacte Ollama en local)
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
            user_message: consigneComplete
        })
    });

    const donneesRecues = await reponseServeur.json();

    if (!reponseServeur.ok || !donneesRecues.verdict) {
        const messageErreur = donneesRecues.error || "L'IA locale n'a pas pu répondre.";
        throw new Error(messageErreur);
    }

    console.log(`[ChatViz] Analyse "${configAnalyse.label}" terminée avec succès.`);

    return {
        verdict: donneesRecues.verdict,
        typeAnalyse: configAnalyse,
    };
}
