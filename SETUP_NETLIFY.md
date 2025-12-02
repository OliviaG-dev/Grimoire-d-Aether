# 🔐 Guide de Configuration - Authentification Netlify Identity

Ce guide vous accompagne pas à pas pour activer l'authentification et la connexion à l'interface d'administration du Grimoire d'Áether.

---

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir :

- ✅ Un compte [GitHub](https://github.com)
- ✅ Un compte [Netlify](https://app.netlify.com) (gratuit)
- ✅ Votre projet Git pushé sur GitHub
- ✅ Les fichiers `public/admin/index.html` et `public/admin/config.yml` créés

---

## 🚀 Étape 1 : Déployer votre site sur Netlify

### 1.1 Connecter votre dépôt GitHub

1. Allez sur [app.netlify.com](https://app.netlify.com)
2. Cliquez sur **"Add new site"** → **"Import an existing project"**
3. Sélectionnez **"Deploy with GitHub"**
4. Autorisez Netlify à accéder à votre compte GitHub
5. Sélectionnez le dépôt `grimoire-daether`

### 1.2 Configurer le build

Dans les paramètres de déploiement, configurez :

- **Build command** : `npm run build`
- **Publish directory** : `dist`
- **Branch to deploy** : `main` (ou `master` selon votre branche)

Cliquez sur **"Deploy site"** et attendez le premier déploiement (2-3 minutes).

### 1.3 Notez l'URL de votre site

Une fois déployé, notez l'URL générée :

```
https://votre-site-123456.netlify.app
```

---

## 🔐 Étape 2 : Activer Netlify Identity

### 2.1 Activer le service Identity

1. Dans le tableau de bord Netlify, allez dans votre site
2. Cliquez sur l'onglet **"Identity"** (dans le menu de gauche)
3. Cliquez sur **"Enable Identity"**
4. Une fois activé, l'interface Identity s'affiche

### 2.2 Configurer les paramètres Identity

1. Dans l'onglet **"Identity"**, cliquez sur **"Settings and usage"**
2. Sous **"Registration preferences"**, choisissez :

   - **Open** : Permet à n'importe qui de s'inscrire (⚠️ à éviter)
   - **Invite only** : ✅ **Recommandé** - Seuls les utilisateurs invités peuvent se connecter

3. (Optionnel) Sous **"External providers"**, vous pouvez activer :
   - **GitHub** : Pour se connecter avec un compte GitHub
   - **Google** : Pour se connecter avec un compte Google

### 2.3 Activer Git Gateway

1. Toujours dans **"Identity"**, cliquez sur **"Services"**
2. Dans la section **"Git Gateway"**, cliquez sur **"Enable Git Gateway"**
3. Autorisez Netlify à créer un OAuth App sur GitHub si demandé
4. Attendez que Git Gateway soit activé (peut prendre quelques secondes)

---

## 👤 Étape 3 : Créer votre compte administrateur

### 3.1 Inviter un utilisateur

1. Dans l'onglet **"Identity"**, cliquez sur **"Invite users"**
2. Entrez votre **adresse email** (celle que vous utilisez pour GitHub)
3. Cliquez sur **"Send invite"**

### 3.2 Accepter l'invitation

1. Vérifiez votre boîte mail
2. Ouvrez l'email d'invitation de Netlify
3. Cliquez sur le lien **"Accept the invite"**
4. Vous serez redirigé vers Netlify pour créer un mot de passe

### 3.3 Créer votre mot de passe

1. Entrez un **mot de passe sécurisé** (minimum 8 caractères)
2. Confirmez le mot de passe
3. Cliquez sur **"Set password and log in"**
4. Vous êtes maintenant connecté !

---

## 🔧 Étape 4 : Mettre à jour la configuration Decap CMS

### 4.1 Mettre à jour `config.yml`

Une fois votre site déployé, mettez à jour `public/admin/config.yml` :

1. Ouvrez `public/admin/config.yml`
2. Remplacez (si présent) :

   ```yaml
   site_url: https://votre-site-123456.netlify.app
   ```

   par l'URL réelle de votre site

3. Vérifiez que `display_url` pointe vers votre site :

   ```yaml
   display_url: https://votre-site-123456.netlify.app
   ```

4. Si votre branche par défaut n'est pas `main`, modifiez :
   ```yaml
   backend:
     branch: votre-branche # 'master' par exemple
   ```

### 4.2 Commit et push

1. Commitez les modifications :

   ```bash
   git add public/admin/config.yml
   git commit -m "Configure Decap CMS with Netlify Identity"
   git push
   ```

2. Attendez que Netlify redéploie votre site (automatique)

---

## 🧪 Étape 5 : Tester l'accès à l'administration

### 5.1 Accéder à la page admin

1. Ouvrez votre navigateur
2. Allez sur : `https://votre-site-123456.netlify.app/admin`
3. Vous devriez voir l'interface de connexion Decap CMS

### 5.2 Se connecter

1. Cliquez sur **"Login"**
2. Vous serez redirigé vers la page de connexion Netlify Identity
3. Connectez-vous avec l'email et le mot de passe que vous avez créés

### 5.3 Vérifier l'accès

Une fois connecté, vous devriez voir :

- ✅ L'interface Decap CMS
- ✅ La collection "Test" (pour le moment)
- ✅ Le bouton "New Test" pour créer un nouveau fichier

---

## 🎯 Étape 6 : Vérifier que tout fonctionne

### Checklist de validation

- [ ] Le site est déployé sur Netlify
- [ ] Netlify Identity est activé
- [ ] Git Gateway est activé
- [ ] Vous avez créé votre compte et accepté l'invitation
- [ ] Vous pouvez accéder à `/admin`
- [ ] Vous pouvez vous connecter avec votre email/mot de passe
- [ ] L'interface Decap CMS s'affiche correctement

---

## 🆘 Résolution de problèmes

### Problème : "Git Gateway is not enabled"

**Solution :**

1. Allez dans Netlify → Identity → Services
2. Vérifiez que Git Gateway est bien activé
3. Si ce n'est pas le cas, activez-le et attendez quelques minutes

### Problème : "Cannot connect to backend"

**Solution :**

1. Vérifiez que le nom de la branche dans `config.yml` correspond à votre branche par défaut
2. Vérifiez que votre site est bien déployé
3. Videz le cache du navigateur et réessayez

### Problème : "Identity not enabled"

**Solution :**

1. Allez dans Netlify → Identity
2. Vérifiez que Identity est activé (bouton "Enable Identity")
3. Si le bouton n'apparaît pas, rafraîchissez la page

### Problème : "Invitation email not received"

**Solution :**

1. Vérifiez vos spams
2. Vérifiez que l'email est correct
3. Réessayez d'envoyer une invitation
4. Vérifiez les logs dans Netlify → Identity → Users

---

## 📝 Notes importantes

- ⚠️ **Sécurité** : Utilisez "Invite only" pour éviter que n'importe qui ne s'inscrive
- ⚠️ **Branche** : Assurez-vous que la branche dans `config.yml` correspond à votre branche par défaut
- ✅ **Gratuit** : Tout cela est disponible gratuitement sur Netlify
- 🔄 **Rebuild** : Chaque modification dans le CMS génère un commit GitHub et redéploie le site

---

## 🎉 Prochaines étapes

Une fois l'authentification validée, nous passerons à la **Semaine 2** :

- Configuration des collections complètes (games, cards)
- Création de contenu test
- Test de l'upload d'images

---

**Besoin d'aide ?** Vérifiez les logs dans Netlify ou consultez la [documentation Decap CMS](https://decapcms.org/docs/).
