# 🔮 Grimoire d'Áether

<div align="center">

**Wiki ésotérique statique dédié aux cartes divinatoires**

_Un sanctuaire pour explorer, comprendre et approfondir les mystères des oracles_

[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?logo=vite)](https://vitejs.dev/)

</div>

---

## 📖 À Propos

**Grimoire d'Áether** est une encyclopédie personnelle élégante et mystique dédiée aux cartes divinatoires (Tarots, Oracles, jeux mystiques).

Le site présente chaque jeu et carte avec une fiche complète incluant mots-clés, symboles, énergies, significations et images. Accessible en lecture pour tous, il dispose d'un système d'administration intégré permettant d'ajouter et modifier le contenu sans backend.

### ✨ Objectifs

- 📚 Créer une encyclopédie personnelle élégante et mystique
- ✏️ Facile à mettre à jour grâce au panneau admin
- 🚀 Ultra simple à déployer (Netlify, GitHub Pages, Vercel)
- 🎨 Interface moderne avec design harmonieux

---

## 🎯 Fonctionnalités

### 📁 Gestion des Jeux

Chaque jeu possède :

- **Nom** et **ID** unique
- **Type** (Tarot/Oracle/Autre)
- **Auteur** et **année**
- **Thématique**
- **Image de couverture**
- **Description** complète

### 🃏 Fiches de Cartes

Chaque carte contient :

- **ID** et **jeu associé**
- **Nom** et **image**
- **Mots-clés** (keywords)
- **Signification** générale
- **Interprétation** amour / travail
- **Énergies** (chakras, éléments…)
- **Symboles**

### 🔍 Navigation et Recherche

- Liste de tous les jeux
- Liste filtrée des cartes par jeu
- Fiche détaillée de chaque carte
- Recherche textuelle (à venir)
- Navigation façon "wiki"

### 🛠️ Administration intégrée

Depuis `/admin` (via Decap CMS) :

- Créer/modifier des jeux
- Créer/modifier des cartes
- Uploader des images
- Génération automatique des fichiers JSON

**Aucun backend requis** - Toute modification est directement envoyée dans le dépôt GitHub.

---

## 🏗️ Architecture Technique

### ⚛️ Front-end : React + TypeScript

- Framework moderne et performant
- Pages organisées avec React Router (à implémenter)
- JSON chargés statiquement
- Interface personnalisée avec design mystique

### 📚 Données : JSON statiques

Les données sont stockées dans :

```
src/data/
├── games/
│   └── *.json       # Fichiers JSON pour chaque jeu
└── cards/
    └── *.json       # Fichiers JSON pour chaque carte
```

### 🖼️ Images : dossier statique

Les images sont stockées dans :

```
public/images/uploads/
```

Les URLs sont directes : `/images/uploads/nom.jpg`

### 🔐 Admin : Decap CMS (ex-Netlify CMS)

Permet :

- Login sécurisé (via GitHub + Netlify Identity)
- Interface admin prête à l'emploi
- Édition en ligne des JSON
- Upload d'images
- Preview instantané

**Aucun backend requis** - Toute modification est directement envoyée dans le dépôt GitHub.

### ☁️ Hébergement : Netlify (recommandé)

- Déploiement instantané du site statique
- Login admin via Netlify Identity
- Git Gateway pour l'édition depuis le CMS
- Idéal pour Decap CMS

---

## 📁 Structure du Projet

```
grimoire-daether/
├── public/
│   └── images/
│       └── uploads/          # Images uploadées
├── src/
│   ├── assets/
│   │   └── logo.png          # Logo du projet
│   ├── components/
│   │   ├── CardItem/         # Composant d'affichage d'une carte
│   │   │   ├── CardItem.tsx
│   │   │   └── CardItem.css
│   │   └── Navigation/       # Composant de navigation
│   │       ├── Navigation.tsx
│   │       └── Navigation.css
│   ├── data/
│   │   ├── games/            # JSON des jeux
│   │   └── cards/            # JSON des cartes
│   ├── pages/
│   │   ├── Home/             # Page d'accueil
│   │   │   ├── Home.tsx
│   │   │   └── Home.css
│   │   ├── CardPage/         # Page d'une carte
│   │   │   ├── CardPage.tsx
│   │   │   └── CardPage.css
│   │   └── GamePage/         # Page d'un jeu
│   │       ├── GamePage.tsx
│   │       └── GamePage.css
│   ├── App.tsx               # Composant principal
│   ├── App.css
│   ├── main.tsx              # Point d'entrée
│   └── index.css             # Styles globaux
├── index.html
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🚀 Installation

### Prérequis

- **Node.js** 18+ et **npm**
- **Git** pour cloner le projet

### Installation des dépendances

```bash
npm install
```

### Démarrage du serveur de développement

```bash
npm run dev
```

Le site sera accessible sur `http://localhost:5173`

### Build de production

```bash
npm run build
```

Les fichiers optimisés seront générés dans le dossier `dist/`

---

## 🎨 Design

### Palette de couleurs

Le projet utilise une palette de couleurs bleue mystique :

- **Fond principal** : `#0a0f1a` à `#1a1f2e`
- **Accents bleus** : `rgba(59, 130, 246, ...)` et `rgba(96, 165, 250, ...)`
- **Texte** : Tons de bleu clair (`#e0f2fe`, `#dbeafe`, `#bfdbfe`)
- **Effets lumineux** : Ombres et lueurs bleues pour l'ambiance mystique

### Caractéristiques visuelles

- Design épuré et élégant
- Animations subtiles et fluides
- Effets de lumière animés en arrière-plan
- Navigation fixe avec points lumineux et effets de pulsation
- Typographie soignée avec polices serif pour les titres
- Layout vertical centré optimisé pour une hauteur de 100vh
- Effets de lueur et d'ombre pour créer une atmosphère mystique

---

## 📝 Structure des Données

### Format JSON d'un Jeu

```json
{
  "id": "tarot-marseille",
  "name": "Tarot de Marseille",
  "type": "Tarot",
  "author": "Anonyme",
  "year": "1760",
  "theme": "Traditionnel",
  "coverImage": "/images/uploads/tarot-marseille-cover.jpg",
  "description": "Le tarot de Marseille est l'un des plus anciens..."
}
```

### Format JSON d'une Carte

```json
{
  "id": "majeur-1",
  "gameId": "tarot-marseille",
  "name": "Le Bateleur",
  "image": "/images/uploads/le-bateleur.jpg",
  "keywords": ["début", "volonté", "création"],
  "meaning": "La carte du Bateleur représente...",
  "love": "En amour, cette carte indique...",
  "work": "Au travail, le Bateleur suggère...",
  "energies": {
    "elements": ["Feu"],
    "chakras": ["Manipura"]
  },
  "symbols": ["chapeau", "table", "bâton"]
}
```

---

## 🔧 Configuration

### Variables d'environnement

Pour le système d'administration avec Decap CMS, vous devrez configurer :

```env
# .env.local
GATSBY_API_URL=https://api.github.com
GATSBY_REPO_OWNER=votre-username
GATSBY_REPO_NAME=grimoire-daether
```

### Configuration Decap CMS

Les fichiers de base pour l'authentification sont déjà en place :

- `public/admin/index.html` - Interface d'administration
- `public/admin/config.yml` - Configuration du CMS

📖 **Guides disponibles :**

**⚡ Configuration et déploiement :**
- **[SETUP_NETLIFY.md](./SETUP_NETLIFY.md)** - Guide complet de configuration Netlify
- **[GUIDE_RAPIDE_GIT_GATEWAY.md](./GUIDE_RAPIDE_GIT_GATEWAY.md)** ⚡ - Guide rapide : Activer Git Gateway (2 minutes)
- **[DEPANNAGE_GIT_GATEWAY.md](./DEPANNAGE_GIT_GATEWAY.md)** - Dépannage complet : Erreurs Git Gateway
- **[RESUME_COMPARAISON.md](./RESUME_COMPARAISON.md)** ⚡ - Comparaison rapide : Netlify vs Vercel + Supabase
- **[COMPARAISON_PLATEFORMES.md](./COMPARAISON_PLATEFORMES.md)** - Analyse détaillée : Hébergement et authentification

**🔐 Authentification et connexion :**
- **[GUIDE_CONNEXION.md](./GUIDE_CONNEXION.md)** - Guide complet : Vérifier l'inscription et se connecter
- **[CHECKLIST_CONNEXION.md](./CHECKLIST_CONNEXION.md)** - Checklist rapide pour la connexion
- **[DEPANNAGE_IDENTITY.md](./DEPANNAGE_IDENTITY.md)** - Dépannage : Problèmes avec Netlify Identity (invitations, connexion)

**📚 Documentation :**
- **[DOCUMENTATION_DECAP_CMS.md](./DOCUMENTATION_DECAP_CMS.md)** - Documentation complète sur Decap CMS (ce que c'est, avantages, inconvénients)
- **[QUICK_START.md](./QUICK_START.md)** - Guide de démarrage rapide

**Instructions détaillées :**

- Le déploiement sur Netlify
- L'activation de Netlify Identity
- La configuration de Git Gateway
- La création de votre compte administrateur

---

## 📦 Technologies Utilisées

- **React 19.2.0** - Bibliothèque UI
- **TypeScript 5.9.3** - Typage statique
- **Vite 7.2.4** - Build tool moderne
- **Decap CMS** (à intégrer) - Système d'administration

---

## 🚀 Déploiement

### Netlify (Recommandé)

⚠️ **Pour une configuration complète et détaillée**, consultez le guide : **[SETUP_NETLIFY.md](./SETUP_NETLIFY.md)**

**Résumé rapide :**

1. Connectez votre dépôt GitHub à Netlify
2. Configurez le build :
   - **Build command** : `npm run build`
   - **Publish directory** : `dist`
3. Activez **Netlify Identity** pour l'admin
4. Activez **Git Gateway** dans Identity settings
5. Créez votre compte administrateur via invitation
6. Accédez à `/admin` pour gérer le contenu

### GitHub Pages

```bash
npm run build
# Copiez le contenu de dist/ dans la branche gh-pages
```

### Vercel

```bash
npm install -g vercel
vercel
```

---

## 📄 Licence

Ce projet est personnel et privé.

---

## 👤 Auteur

Projet créé pour construire un grimoire personnel dédié aux cartes divinatoires.

---

## 🌟 Caractéristiques Clés

- ✨ **Design mystique et élégant** - Interface harmonieuse inspirée des grimoires
- 📚 **Encyclopédie complète** - Fiches détaillées pour chaque jeu et carte
- 🔐 **Admin intégré** - Édition du contenu sans backend
- 🚀 **Déploiement simple** - Site statique facile à héberger
- 📱 **Responsive** - Adapté à tous les écrans
- 🎨 **Animations subtiles** - Effets visuels pour une expérience immersive

---

_"Ouvrir un grimoire, c'est franchir un seuil. Entre ses pages s'entrelacent savoirs anciens, murmures d'âme et éclats d'intuition."_
