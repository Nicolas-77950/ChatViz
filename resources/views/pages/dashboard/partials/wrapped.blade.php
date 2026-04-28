{{-- Template caché pour l'export "ChatViz Wrapped" --}}
{{-- Chaque brique est masquée par défaut (hidden) et rendue visible par JS si l'analyse correspondante a été lancée --}}

<template id="template-wrapped">
    <div class="wrapped-container" id="wrapped-render-zone">

        {{-- Orbes décoratives (fond lumineux subtil) --}}
        <div class="wrapped-orb" style="width: 400px; height: 400px; background: var(--wrapped-accent, #818cf8); top: -100px; left: -100px;"></div>
        <div class="wrapped-orb" style="width: 300px; height: 300px; background: #a855f7; bottom: -80px; right: -80px;"></div>
        <div class="wrapped-orb" style="width: 200px; height: 200px; background: #ec4899; top: 40%; left: 60%;"></div>

        {{-- ======== EN-TÊTE ======== --}}
        <div style="text-align: center; margin-bottom: 40px; position: relative; z-index: 10;">
            <div style="display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 24px;">
                <span style="font-size: 36px;">📱</span>
                <span style="font-weight: 700; font-size: 30px; letter-spacing: -0.05em; background: linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">ChatViz</span>
            </div>
            <h2 class="wrapped-titre-fichier" style="font-size: 24px; font-weight: 700; color: white; margin-bottom: 8px;">Ton résumé</h2>
            <p class="wrapped-date-analyse" style="color: #94a3b8; font-size: 14px;"></p>
        </div>

        {{-- ======== BRIQUE VOLUME ======== --}}
        <div class="wrapped-brique hidden" id="wrapped-brique-volume" style="margin-bottom: 16px; position: relative; z-index: 10;">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
                <span style="font-size: 24px; flex-shrink: 0;">📊</span>
                <h3 style="font-weight: 700; color: white; font-size: 18px; white-space: nowrap;">Répartition de la parole</h3>
            </div>
            <div class="wrapped-volume-contenu" style="display: flex; flex-direction: column; gap: 12px;">
                {{-- Les barres de comparaison seront injectées ici par JS --}}
            </div>
        </div>

        {{-- ======== BRIQUE ACTIVITÉ ======== --}}
        <div class="wrapped-brique hidden" id="wrapped-brique-activite" style="margin-bottom: 16px; position: relative; z-index: 10;">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
                <span style="font-size: 24px; flex-shrink: 0;">📈</span>
                <h3 style="font-weight: 700; color: white; font-size: 18px; white-space: nowrap;">Habitudes & Ambiance</h3>
            </div>
            <div style="display: flex; justify-content: space-between; gap: 16px;">
                <div style="flex: 1; text-align: center;">
                    <p style="font-size: 10px; color: #64748b; text-transform: uppercase; font-weight: 700; letter-spacing: 0.1em; margin-bottom: 4px;">Jour de feu</p>
                    <p class="wrapped-val-jour-actif" style="font-size: 20px; font-weight: 900; color: white; white-space: nowrap;">-</p>
                </div>
                <div style="width: 1px; background: rgba(255,255,255,0.1);"></div>
                <div style="flex: 1; text-align: center;">
                    <p style="font-size: 10px; color: #64748b; text-transform: uppercase; font-weight: 700; letter-spacing: 0.1em; margin-bottom: 4px;">Moment préféré</p>
                    <p class="wrapped-val-moment" style="font-size: 20px; font-weight: 900; color: white; white-space: nowrap;">-</p>
                </div>
                <div style="width: 1px; background: rgba(255,255,255,0.1);"></div>
                <div style="flex: 1; text-align: center;">
                    <p style="font-size: 10px; color: #64748b; text-transform: uppercase; font-weight: 700; letter-spacing: 0.1em; margin-bottom: 4px;">Messages</p>
                    <p class="wrapped-val-total" style="font-size: 20px; font-weight: 900; color: white; white-space: nowrap;">-</p>
                </div>
            </div>
        </div>

        {{-- ======== BRIQUE TEMPS DE RÉPONSE ======== --}}
        <div class="wrapped-brique hidden" id="wrapped-brique-temps" style="margin-bottom: 16px; position: relative; z-index: 10;">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
                <span style="font-size: 24px; flex-shrink: 0;">⏱️</span>
                <h3 style="font-weight: 700; color: white; font-size: 18px; white-space: nowrap;">Temps de réponse</h3>
            </div>
            <div class="wrapped-temps-contenu" style="display: flex; flex-direction: column; gap: 8px;">
                {{-- Les cartes par auteur seront injectées ici par JS --}}
            </div>
        </div>

        {{-- ======== BRIQUE EMOJIS ======== --}}
        <div class="wrapped-brique hidden" id="wrapped-brique-emojis" style="margin-bottom: 16px; position: relative; z-index: 10;">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
                <span style="font-size: 24px; flex-shrink: 0;">😂</span>
                <h3 style="font-weight: 700; color: white; font-size: 18px; white-space: nowrap;">TOP Émojis Favoris</h3>
            </div>
            <div class="wrapped-emojis-contenu" style="display: flex; gap: 24px;">
                {{-- Les emojis par auteur seront injectés ici par JS --}}
            </div>
        </div>

        {{-- ======== BRIQUE VERDICT IA AMOUR ======== --}}
        <div class="wrapped-brique hidden" id="wrapped-brique-ia-amour" style="margin-bottom: 16px; position: relative; z-index: 10;">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
                <span style="font-size: 24px; flex-shrink: 0;">💘</span>
                <h3 style="font-weight: 700; color: white; font-size: 18px; white-space: nowrap;">Verdict : Chances Amoureuses</h3>
            </div>
            <blockquote class="wrapped-verdict-amour-texte" style="color: #cbd5e1; font-size: 14px; font-style: italic; line-height: 1.6; border-left: 3px solid #f472b6; padding-left: 16px; margin: 0;">
                {{-- Extrait du verdict IA --}}
            </blockquote>
        </div>

        {{-- ======== BRIQUE VERDICT IA ENGAGEMENT ======== --}}
        <div class="wrapped-brique hidden" id="wrapped-brique-ia-engagement" style="margin-bottom: 16px; position: relative; z-index: 10;">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
                <span style="font-size: 24px; flex-shrink: 0;">🔥</span>
                <h3 style="font-weight: 700; color: white; font-size: 18px; white-space: nowrap;">Verdict : Niveau d'Engagement</h3>
            </div>
            <blockquote class="wrapped-verdict-engagement-texte" style="color: #cbd5e1; font-size: 14px; font-style: italic; line-height: 1.6; border-left: 3px solid #f97316; padding-left: 16px; margin: 0;">
                {{-- Extrait du verdict IA --}}
            </blockquote>
        </div>

        {{-- ======== PIED DE PAGE ======== --}}
        <div style="text-align: center; margin-top: 40px; padding-top: 24px; position: relative; z-index: 10; border-top: 1px solid rgba(255,255,255,0.08);">
            <p style="color: #64748b; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 4px;">Généré par ChatViz 📱</p>
            <p style="color: #475569; font-size: 10px;">100% local · Conforme RGPD 🔒</p>
        </div>

    </div>
</template>
