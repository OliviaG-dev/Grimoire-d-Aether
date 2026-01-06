# 🔮 Grimoire d'Áether

<div align="center">

**Wiki ésotérique statique dédié aux cartes divinatoires**

_Un sanctuaire pour explorer, comprendre et approfondir les mystères des oracles_

[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?logo=vite)](https://vitejs.dev/)
[![Clerk](https://img.shields.io/badge/Clerk-Auth-6C47FF?logo=clerk)](https://clerk.com)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?logo=supabase)](https://supabase.com)

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
- 🗄️ Base de données cloud avec Supabase

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
- **Index** (numéro de la carte dans le jeu)
- **Mots-clés** (keywords) avec design amélioré
- **Signification** générale
- **Interprétation** amour / travail / santé / argent
- **Signification inversée** (reversed meaning)
- **Signification de l'ombre** (shadow meaning)
- **Conseil** et **Affirmation**
- **Énergies** (chakras, éléments…)
- **Symboles**
- **Favoris** ⭐ - Système de marquage des cartes favorites

### 🔍 Navigation et Recherche

- Liste de tous les jeux avec **pagination** (8 jeux par page)
- Liste filtrée des cartes par jeu avec **pagination** (10 cartes par page)
- **Filtres avancés** sur la page des cartes :
  - Recherche par nom ou mots-clés
  - Filtre par jeu
  - Filtre par index
  - Filtre par favoris ⭐
- Fiche détaillée de chaque carte
- Navigation intuitive avec React Router
- **Composant de pagination** réutilisable avec design harmonieux
- Design mystique et élégant

### 🛠️ Administration intégrée

Panneau d'administration personnalisé accessible depuis `/admin` :

- **Authentification sécurisée** via Clerk
- **Dashboard** avec statistiques
- **Gestion des jeux** (création, édition, suppression)
  - Pagination avec 8 jeux par page
- **Gestion des cartes** (création, édition, suppression)
  - Tous les champs disponibles (index, significations, favoris, etc.)
  - **Upload d'images** : Par fichier ou URL
  - Affichage du statut favori dans la liste
  - Pagination avec 8 cartes par page
  - Filtres par jeu et par index
- Interface intuitive et moderne
- **Base de données Supabase** pour stocker et gérer les données

---

## 🏗️ Architecture Technique

### ⚛️ Front-end : React + TypeScript

- Framework moderne et performant
- Pages organisées avec **React Router**
- Services TypeScript pour gérer les données
- Interface personnalisée avec design mystique

### 🗄️ Base de données : Supabase

**Supabase** est utilisé pour le stockage des données :

- ✅ Base de données PostgreSQL hébergée
- ✅ API REST automatique
- ✅ **Storage pour les images** : Upload et stockage de fichiers
- ✅ Sécurité avec Row Level Security (RLS)
- ✅ Gratuit jusqu'à 500 Mo de données
- ✅ Interface SQL intégrée pour la gestion
- ✅ Services TypeScript pour toutes les opérations CRUD

Les données sont stockées dans deux tables :

- **`games`** : Informations sur les jeux (tarots, oracles, etc.)
- **`cards`** : Fiches détaillées de chaque carte

### 🖼️ Images : Supabase Storage

Les images sont stockées dans **Supabase Storage** :

- ✅ **Bucket "images"** : Stockage cloud sécurisé
- ✅ **Upload par fichier ou URL** : Choix entre upload direct ou lien externe
- ✅ **URLs publiques** : Accès direct aux images via URLs permanentes
- ✅ **Organisation par dossiers** : Images des cartes dans le dossier `cards/`

**Configuration requise :**

1. Créez un bucket nommé `"images"` dans Supabase Storage
2. Configurez-le comme **bucket public**
3. Configurez les politiques RLS pour permettre la lecture publique

Le service `imageService` gère automatiquement l'upload et la génération d'URLs.

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
│   │   ├── Icons/            # Composants d'icônes SVG
│   │   │   ├── AddIcon.tsx
│   │   │   ├── CardsIcon.tsx
│   │   │   ├── DashboardIcon.tsx
│   │   │   ├── EditIcon.tsx
│   │   │   ├── GamesIcon.tsx
│   │   │   ├── LogoutIcon.tsx
│   │   │   └── index.ts
│   │   └── Navigation/       # Composant de navigation
│   │       ├── Navigation.tsx
│   │       └── Navigation.css
│   │   └── Pagination/       # Composant de pagination
│   │       ├── Pagination.tsx
│   │       └── Pagination.css
│   ├── config/
│   │   └── supabase.ts       # Configuration Supabase
│   ├── services/
│   │   ├── gamesService.ts   # Service pour gérer les jeux
│   │   ├── cardsService.ts   # Service pour gérer les cartes
│   │   ├── imageService.ts   # Service pour uploader les images
│   │   └── index.ts          # Export centralisé
│   ├── types/
│   │   ├── database.ts       # Types pour la base de données
│   │   ├── models.ts         # Types pour l'application
│   │   └── index.ts          # Export centralisé
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
- **Compte Supabase** (gratuit) : https://supabase.com

### Installation des dépendances

```bash
npm install
```

### Configuration

#### 1. Configuration de Supabase

1. Créez un compte sur [Supabase](https://supabase.com)
2. Créez un nouveau projet
3. Dans **SQL Editor**, exécutez les requêtes pour créer les tables `games` et `cards`
4. Dans **Settings → API**, copiez :
   - L'**URL** de votre projet
   - La clé **`anon` `public`**
5. **Configurez le Storage pour les images** :
   - Allez dans **Storage** dans le menu de gauche
   - Créez un nouveau bucket nommé `"images"`
   - Activez l'option **"Public bucket"**
   - Configurez les politiques RLS pour permettre la lecture publique
6. Consultez le guide d'installation : [INSTALLATION_SUPABASE.md](./INSTALLATION_SUPABASE.md)

#### 2. Configuration de Clerk

1. Créez un compte sur [Clerk](https://clerk.com)
2. Créez une nouvelle application (choisissez React)
3. Récupérez votre **Publishable Key** (commence par `pk_test_...`)

#### 3. Variables d'environnement

Créez un fichier `.env.local` à la racine du projet :

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=votre_cle_anon_ici

# Clerk Configuration
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
# Supabase Configuration
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=votre_cle_anon_ici

# Clerk Configuration
VITE_CLERK_PUBLISHABLE_KEY=pk_test_votre_cle_ici
```

**⚠️ Important :** Remplacez les valeurs par vos vraies clés.

### Configuration Supabase

1. **Créer les tables** : Exécutez les requêtes SQL dans le SQL Editor de Supabase
2. **Configurer le Storage** :
   - Créez un bucket nommé `"images"` dans Storage
   - Activez l'option "Public bucket"
   - Configurez les politiques RLS pour permettre la lecture publique
3. **Politiques de sécurité** : Les politiques RLS sont configurées pour permettre :
   - La lecture publique (tout le monde peut lire)
   - L'écriture réservée aux utilisateurs authentifiés

### Configuration Clerk

Dans le dashboard Clerk, configurez :

1. **URLs autorisées** :

   - Développement : `http://localhost:5173`
   - Production : Votre URL de déploiement (ex: `https://votre-site.vercel.app`)

2. **Méthodes d'authentification** :
   - Email (activé par défaut)
   - Optionnel : Google, GitHub, etc.

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
- **Tags de mots-clés** avec gradients et effets de survol
- **Titres de sections** avec bordures dégradées
- **Toggle switch** élégant pour les filtres favoris
- **Composant de pagination** avec navigation intuitive et design harmonieux
- **Design harmonieux** sur toutes les pages

---

## 📝 Structure des Données

Les données sont stockées dans Supabase avec deux tables principales.

### Table `games`

Un jeu contient les informations suivantes :

```typescript
{
  id: string; // UUID généré automatiquement
  name: string; // Nom du jeu (ex: "Tarot de Marseille")
  type: string; // Type (ex: "Tarot", "Oracle")
  author: string; // Auteur du jeu
  year: string; // Année de création
  theme: string; // Thématique
  cover_image: string | null; // URL de l'image de couverture
  description: string; // Description complète
  created_at: string; // Date de création
  updated_at: string; // Date de dernière modification
}
```

### Table `cards`

Une carte contient les informations suivantes :

```typescript
{
  id: string;                    // UUID généré automatiquement
  game_id: string;               // ID du jeu associé (référence)
  name: string;                  // Nom de la carte
  image: string | null;          // URL de l'image
  index: number | null;          // Numéro d'index de la carte dans le jeu
  keywords: string[] | null;     // Mots-clés
  meaning: string | null;        // Signification générale
  love: string | null;           // Interprétation amour
  work: string | null;           // Interprétation travail
  health: string | null;         // Interprétation santé
  money: string | null;          // Interprétation argent
  reversed_meaning: string | null; // Signification inversée
  shadow_meaning: string | null;   // Signification de l'ombre
  advice: string | null;         // Conseil
  affirmation: string | null;    // Affirmation positive
  elements: string[] | null;     // Éléments associés
  chakras: string[] | null;      // Chakras associés
  symbols: string[] | null;      // Symboles
  is_favorite: boolean | null;   // Statut favori ⭐
  created_at: string;            // Date de création
  updated_at: string;            // Date de dernière modification
}
```

### Services TypeScript

Les services (`gamesService` et `cardsService`) gèrent automatiquement la conversion entre :

- **Base de données** : Format snake_case (`cover_image`, `game_id`)
- **Application** : Format camelCase (`coverImage`, `gameId`)

Utilisation dans le code :

```typescript
import { gamesService, cardsService } from "./services";

// Récupérer tous les jeux
const games = await gamesService.getAll();

// Créer un nouveau jeu
const newGame = await gamesService.create({
  name: "Tarot de Marseille",
  type: "Tarot",
  author: "Anonyme",
  year: "1760",
  theme: "Traditionnel",
  description: "Le tarot de Marseille...",
  coverImage:
    "https://votre-projet.supabase.co/storage/v1/object/public/images/tarot-marseille.jpg",
});
```

---

## 📦 Technologies Utilisées

- **React 19.2.0** - Bibliothèque UI
- **TypeScript 5.9.3** - Typage statique
- **Vite 7.2.4** - Build tool moderne
- **React Router DOM 7.10.0** - Routage côté client
- **Clerk 5.57.1** - Authentification et gestion utilisateurs
- **Supabase 2.86.2** - Base de données PostgreSQL et API

---

## 🚀 Déploiement

### Vercel (Recommandé)

1. Connectez votre dépôt GitHub à Vercel
2. Configurez les variables d'environnement :
   - **`VITE_SUPABASE_URL`** : Votre URL Supabase
   - **`VITE_SUPABASE_ANON_KEY`** : Votre clé anon Supabase
   - **`VITE_CLERK_PUBLISHABLE_KEY`** : Votre clé Clerk
3. Configurez les URLs dans Clerk :
   - Ajoutez votre URL Vercel dans les URLs autorisées
4. Déployez !

### Netlify

1. Connectez votre dépôt GitHub à Netlify
2. Configurez le build :
   - **Build command** : `npm run build`
   - **Publish directory** : `dist`
3. Ajoutez les variables d'environnement :
   - **`VITE_SUPABASE_URL`** : Votre URL Supabase
   - **`VITE_SUPABASE_ANON_KEY`** : Votre clé anon Supabase
   - **`VITE_CLERK_PUBLISHABLE_KEY`** : Votre clé Clerk
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

- Les pages `/admin` sont protégées et nécessitent une authentification Clerk
- Seuls les utilisateurs connectés peuvent accéder à l'administration
- La base de données Supabase utilise Row Level Security (RLS) :
  - **Lecture publique** : Tout le monde peut lire les jeux et cartes
  - **Écriture authentifiée** : Seuls les utilisateurs authentifiés peuvent modifier
- La déconnexion redirige vers la page d'accueil

## 🔧 Utilisation des Services

Les services TypeScript simplifient l'interaction avec Supabase :

### Service des Jeux

```typescript
import { gamesService } from "./services";

// Récupérer tous les jeux
const games = await gamesService.getAll();

// Récupérer un jeu par ID
const game = await gamesService.getById("uuid");

// Créer un jeu
const newGame = await gamesService.create({
  /* ... */
});

// Mettre à jour un jeu
const updated = await gamesService.update("uuid", { name: "Nouveau nom" });

// Supprimer un jeu
await gamesService.delete("uuid");
```

### Service des Cartes

```typescript
import { cardsService } from "./services";

// Récupérer toutes les cartes
const cards = await cardsService.getAll();

// Récupérer les cartes d'un jeu
const gameCards = await cardsService.getByGameId("game-uuid");

// Créer une carte
const newCard = await cardsService.create({
  /* ... */
});

// Mettre à jour une carte
const updated = await cardsService.update("uuid", { name: "Nouveau nom" });

// Supprimer une carte
await cardsService.delete("uuid");
```

### Service des Images

```typescript
import { imageService } from "./services";

// Uploader une image
const file = event.target.files[0]; // Fichier sélectionné
const imageUrl = await imageService.uploadImage(file, "cards");
// Retourne l'URL publique de l'image

// Supprimer une image
await imageService.deleteImage(imageUrl);
```

Pour plus de détails, consultez la documentation complète dans les fichiers :

- Guide d'installation : Voir les instructions dans votre dashboard Supabase
- Guide d'utilisation : Les services sont documentés dans le code avec TypeScript

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
- 🖼️ **Upload d'images** - Upload par fichier ou URL via Supabase Storage
- ⭐ **Système de favoris** - Marquez vos cartes préférées
- 🔍 **Filtres avancés** - Recherche par nom, jeu, index et favoris
- 📄 **Pagination intelligente** - Navigation fluide avec 8-10 items par page selon le contexte
- 🎨 **Design amélioré** - Tags de mots-clés, titres stylisés, effets visuels
- 🔐 **Admin intégré** - Panneau d'administration personnalisé avec authentification Clerk
- 🗄️ **Base de données cloud** - Stockage sécurisé avec Supabase PostgreSQL
- ☁️ **Storage cloud** - Images stockées dans Supabase Storage avec URLs publiques
- 🚀 **Déploiement simple** - Site statique facile à héberger
- 📱 **Responsive** - Adapté à tous les écrans
- 🎨 **Animations subtiles** - Effets visuels pour une expérience immersive
- ⚡ **Performant** - Build optimisé avec Vite
- 🔒 **Sécurisé** - Authentification professionnelle avec Clerk et RLS sur Supabase
- 🔧 **Services TypeScript** - API typée pour toutes les opérations CRUD

---

_"Ouvrir un grimoire, c'est franchir un seuil. Entre ses pages s'entrelacent savoirs anciens, murmures d'âme et éclats d'intuition."_
