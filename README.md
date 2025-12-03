# 🔮 Grimoire d'Áether

<div align="center">

**Wiki ésotérique statique dédié aux cartes divinatoires**

_Un sanctuaire pour explorer, comprendre et approfondir les mystères des oracles_

[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?logo=vite)](https://vitejs.dev/)
[![Clerk](https://img.shields.io/badge/Clerk-Auth-6C47FF?logo=clerk)](https://clerk.com)

</div>

---

## 📖 À Propos

**Grimoire d'Áether** est une encyclopédie personnelle élégante et mystique dédiée aux cartes divinatoires (Tarots, Oracles, jeux mystiques).

Le site présente chaque jeu et carte avec une fiche complète incluant mots-clés, symboles, énergies, significations et images. Accessible en lecture pour tous, il dispose d'un système d'administration intégré permettant d'ajouter et modifier le contenu.

### ✨ Objectifs

- 📚 Créer une encyclopédie personnelle élégante et mystique
- ✏️ Facile à mettre à jour grâce au panneau admin personnalisé
- 🚀 Ultra simple à déployer (Vercel, Netlify, GitHub Pages)
- 🎨 Interface moderne avec design harmonieux
- 🔐 Authentification sécurisée avec Clerk

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

### 🔍 Navigation

- Liste de tous les jeux
- Liste filtrée des cartes par jeu
- Fiche détaillée de chaque carte
- Navigation intuitive avec React Router
- Design mystique et élégant

### 🛠️ Administration intégrée

Panneau d'administration personnalisé accessible depuis `/admin` :

- **Authentification sécurisée** via Clerk
- **Dashboard** avec statistiques
- **Gestion des jeux** (création, édition, suppression)
- **Gestion des cartes** (création, édition, suppression)
- Interface intuitive et moderne

**En cours de développement** : Sauvegarde via API GitHub

---

## 🏗️ Architecture Technique

### ⚛️ Front-end : React + TypeScript

- Framework moderne et performant
- Pages organisées avec **React Router**
- JSON chargés statiquement depuis `src/data/`
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

### 🔐 Authentification : Clerk

**Clerk** est utilisé pour l'authentification :

- ✅ Authentification sécurisée par email
- ✅ Gestion des sessions utilisateur
- ✅ Composants React prêts à l'emploi
- ✅ Fonctionne parfaitement en localhost
- ✅ Gratuit jusqu'à 10 000 utilisateurs
- ✅ Compatible avec Vercel, Netlify, etc.

### ☁️ Hébergement : Vercel (recommandé) ou Netlify

- Déploiement instantané du site statique
- Compatible avec tous les hébergeurs de sites statiques
- Variable d'environnement à configurer pour Clerk

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
│   │   ├── AdminStatus/      # Badge admin avec menu
│   │   │   ├── AdminStatus.tsx
│   │   │   └── AdminStatus.css
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
│   │   ├── Admin/            # Panneau d'administration
│   │   │   ├── Admin.tsx
│   │   │   └── Admin.css
│   │   ├── Home/             # Page d'accueil
│   │   │   ├── Home.tsx
│   │   │   └── Home.css
│   │   ├── Login/            # Page de connexion
│   │   │   ├── Login.tsx
│   │   │   └── Login.css
│   │   ├── Signup/           # Page d'inscription
│   │   │   ├── Signup.tsx
│   │   │   └── Signup.css
│   │   ├── CardPage/         # Page d'une carte
│   │   │   ├── CardPage.tsx
│   │   │   └── CardPage.css
│   │   └── GamePage/         # Page d'un jeu
│   │       ├── GamePage.tsx
│   │       └── GamePage.css
│   ├── App.tsx               # Composant principal avec routes
│   ├── App.css
│   ├── main.tsx              # Point d'entrée avec ClerkProvider
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
- **Compte Clerk** (gratuit) : https://clerk.com

### Installation des dépendances

```bash
npm install
```

### Configuration de Clerk

1. Créez un compte sur [Clerk](https://clerk.com)
2. Créez une nouvelle application (choisissez React)
3. Récupérez votre **Publishable Key** (commence par `pk_test_...`)
4. Créez un fichier `.env.local` à la racine du projet :

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_votre_cle_ici
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

## 🔧 Configuration

### Variables d'environnement

Créez un fichier `.env.local` à la racine du projet :

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_votre_cle_ici
```

**⚠️ Important :** Remplacez `pk_test_votre_cle_ici` par votre vraie clé Clerk.

### Configuration Clerk

Dans le dashboard Clerk, configurez :

1. **URLs autorisées** :

   - Développement : `http://localhost:5173`
   - Production : Votre URL de déploiement (ex: `https://votre-site.vercel.app`)

2. **Méthodes d'authentification** :
   - Email (activé par défaut)
   - Optionnel : Google, GitHub, etc.

📖 **Guides disponibles :**

- **[GUIDE_CONFIGURATION_CLERK.md](./GUIDE_CONFIGURATION_CLERK.md)** - Guide de configuration des URLs Clerk
- **[GUIDE_CONFIGURATION_EMAIL_CLERK.md](./GUIDE_CONFIGURATION_EMAIL_CLERK.md)** - Configuration de l'authentification par email
- **[TEST_CLERK.md](./TEST_CLERK.md)** - Guide de test de l'authentification

---

## 🎨 Design

### Palette de couleurs

Le projet utilise une palette de couleurs mystique :

- **Fond principal** : Dégradés de bleu-violet (`#0a0a1a` à `#2a1f3a`)
- **Accents** : Violets et dorés (`rgba(139, 92, 246, ...)`, `rgba(217, 119, 6, ...)`)
- **Texte** : Tons clairs (`#c4b5fd`, `#ddd6fe`, `#bfdbfe`)
- **Effets lumineux** : Ombres et lueurs pour l'ambiance mystique

### Caractéristiques visuelles

- Design épuré et élégant
- Animations subtiles et fluides
- Effets de lumière animés en arrière-plan
- Navigation avec points lumineux et effets de pulsation
- Typographie soignée avec polices serif pour les titres
- Layout vertical centré optimisé
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

## 📦 Technologies Utilisées

- **React 19.2.0** - Bibliothèque UI
- **TypeScript 5.9.3** - Typage statique
- **Vite 7.2.4** - Build tool moderne
- **React Router DOM 7.10.0** - Routage côté client
- **Clerk 5.57.1** - Authentification et gestion utilisateurs

---

## 🚀 Déploiement

### Vercel (Recommandé)

1. Connectez votre dépôt GitHub à Vercel
2. Configurez la variable d'environnement :
   - **Variable** : `VITE_CLERK_PUBLISHABLE_KEY`
   - **Valeur** : Votre clé Clerk
3. Configurez les URLs dans Clerk :
   - Ajoutez votre URL Vercel dans les URLs autorisées
4. Déployez !

### Netlify

1. Connectez votre dépôt GitHub à Netlify
2. Configurez le build :
   - **Build command** : `npm run build`
   - **Publish directory** : `dist`
3. Ajoutez la variable d'environnement :
   - **Variable** : `VITE_CLERK_PUBLISHABLE_KEY`
   - **Valeur** : Votre clé Clerk
4. Configurez les URLs dans Clerk

### GitHub Pages

```bash
npm run build
# Copiez le contenu de dist/ dans la branche gh-pages
```

---

## 🔐 Authentification

### Accès au panneau admin

1. Allez sur `/login` ou `/signup`
2. Créez un compte ou connectez-vous
3. Vous serez redirigé vers `/admin` après authentification

### Sécurité

- Les pages `/admin` sont protégées et nécessitent une authentification
- Seuls les utilisateurs connectés peuvent accéder à l'administration
- La déconnexion redirige vers la page d'accueil

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
- 🔐 **Admin intégré** - Panneau d'administration personnalisé avec authentification Clerk
- 🚀 **Déploiement simple** - Site statique facile à héberger
- 📱 **Responsive** - Adapté à tous les écrans
- 🎨 **Animations subtiles** - Effets visuels pour une expérience immersive
- ⚡ **Performant** - Build optimisé avec Vite
- 🔒 **Sécurisé** - Authentification professionnelle avec Clerk

---

_"Ouvrir un grimoire, c'est franchir un seuil. Entre ses pages s'entrelacent savoirs anciens, murmures d'âme et éclats d'intuition."_
