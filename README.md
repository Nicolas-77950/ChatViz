# ChatViz 📱

**Analyseur de Conversations WhatsApp avec Verdict IA**

ChatViz est une application web (SaaS) conçue pour analyser les fichiers d'exportation de discussions WhatsApp (`_chat.txt`). Elle offre un tableau de bord interactif affichant des statistiques précises sur vos relations numériques, complété par un verdict humoristique généré par une Intelligence Artificielle.

## ⚙️ Concept et Workflow

1.  **Authentification** : Créez un compte sécurisé.
2.  **Importation** : Glissez-déposez votre fichier `_chat.txt`.
3.  **Analyse locale** : Le fichier est lu et analysé instantanément dans votre navigateur.
4.  **Verdict IA** : Générez un résumé sarcastique ou analytique basé sur les statistiques.
5.  **Sauvegarde** : Enregistrez vos analyses pour les consulter plus tard.

## 🛡️ Privacy by Design (RGPD)

La sécurité est au cœur de ChatViz. Le fichier `_chat.txt` **ne quitte jamais votre ordinateur**. 
- Le traitement du texte brut se fait exclusivement côté client (JavaScript).
- Seules les données mathématiques anonymisées sont envoyées au serveur pour le verdict IA et le stockage.
- Aucun message privé n'est jamais enregistré sur nos serveurs.

## 🏗️ Architecture Technique

- **Framework** : Laravel 11
- **Front-End** : JavaScript (Analyse Regex & Graphiques)
- **Base de données** : MySQL (Stockage JSON)
- **Infrastructure** : Docker (Laravel Sail)
- **IA** : Ollama (Modèles locaux : Mistral, Llama 3)

## 🚀 Installation

### Prérequis
- Docker Desktop
- Ollama (pour l'analyse IA locale)

### 🤖 Installation de l'IA Locale (Ollama)

ChatViz utilise une IA 100% locale pour garantir la confidentialité des données (RGPD). Vous devez installer Ollama sur votre machine :

**Pour macOS :**
1. Téléchargez Ollama depuis le site officiel : [https://ollama.com/download/mac](https://ollama.com/download/mac)
2. Décompressez et glissez l'application dans votre dossier `Applications`.
3. Lancez l'application Ollama.
4. Ouvrez un terminal et téléchargez le modèle Mistral :
   ```bash
   ollama run mistral
   ```

**Pour Windows :**
1. Téléchargez Ollama depuis le site officiel : [https://ollama.com/download/windows](https://ollama.com/download/windows)
2. Exécutez l'installeur `.exe`.
3. Ouvrez l'Invite de commandes (cmd) ou PowerShell et téléchargez le modèle Mistral :
   ```bash
   ollama run mistral
   ```

*(Laissez ce terminal ouvert ou l'application s'exécuter en arrière-plan pendant que vous utilisez ChatViz).*

### Lancement du projet
1. Clonez le dépôt :
   ```bash
   git clone https://github.com/Nicolas-77950/ChatViz.git
   cd ChatViz
   ```

2. Installez les dépendances (si nécessaire) :
   ```bash
   composer install
   ```

3. Démarrez l'environnement via Laravel Sail :
   ```bash
   ./vendor/bin/sail up -d
   ```

4. Exécutez les migrations :
   ```bash
   ./vendor/bin/sail artisan migrate
   ```

Application : [http://localhost]
Base de données : [http://localhost:8080]

## 🛠️ Commandes utiles

- Arrêter les conteneurs : `./vendor/bin/sail stop`
- Accès au terminal artisan : `./vendor/bin/sail artisan`
- Installer les dépendances JS : `./vendor/bin/sail npm install`
- Lancer Vite : `./vendor/bin/sail npm run dev`
