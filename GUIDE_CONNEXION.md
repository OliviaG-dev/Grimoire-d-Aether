# 🔐 Guide Complet : Vérifier l'inscription et se connecter

## 📋 Table des matières

1. [Comment savoir si l'inscription a réussi](#comment-savoir-si-linscription-a-réussi)
2. [Comment se connecter](#comment-se-connecter)
3. [Vérifier que vous êtes connecté](#vérifier-que-vous-êtes-connecté)
4. [Problèmes courants](#problèmes-courants)

---

## ✅ Comment savoir si l'inscription a réussi

### **Méthode 1 : Via l'interface `/admin` (Recommandé)**

1. **Allez sur** : `https://grimoire-d-aether.netlify.app/admin/`

2. **Après avoir créé votre mot de passe** :
   - ✅ **Si l'inscription a réussi** : L'interface Decap CMS s'affiche directement
   - ✅ Vous voyez le menu avec "Content" (collections) et "Media"
   - ✅ Aucune demande de connexion n'apparaît

3. **Si vous voyez encore le widget de connexion** :
   - ❌ L'inscription n'a pas fonctionné
   - ⚠️ Vérifiez les étapes ci-dessous

---

### **Méthode 2 : Via le widget Netlify Identity**

1. **Allez sur** : `https://grimoire-d-aether.netlify.app/admin/`

2. **Ouvrez la console du navigateur** (F12 ou Clic droit → Inspecter)

3. **Dans la console, tapez** :
   ```javascript
   netlifyIdentity.currentUser()
   ```

4. **Résultats possibles** :
   - ✅ **Si vous voyez un objet avec votre email** → **Inscription réussie !**
   - ❌ **Si vous voyez `null`** → Vous n'êtes pas connecté ou l'inscription a échoué

---

### **Méthode 3 : Via Netlify Dashboard (100% fiable)**

1. **Allez sur** : https://app.netlify.com/

2. **Connectez-vous à votre compte Netlify**

3. **Sélectionnez votre site** : "Grimoire d'Áether" (ou votre nom de site)

4. **Allez dans** : **"Identity"** → **"Users"**

5. **Vérifiez la liste des utilisateurs** :
   - ✅ **Si votre email apparaît dans la liste** → **Inscription réussie !**
   - ✅ Vous verrez la date de création du compte
   - ❌ **Si votre email n'apparaît pas** → L'inscription n'a pas fonctionné

---

## 🔑 Comment se connecter

### **Connexion après inscription réussie**

Si vous venez de créer votre compte via l'invitation :
- ✅ **Vous êtes déjà connecté automatiquement**
- ✅ L'interface Decap CMS devrait s'afficher directement
- ✅ Pas besoin de vous reconnecter

---

### **Connexion pour les prochaines fois**

1. **Allez sur** : `https://grimoire-d-aether.netlify.app/admin/`

2. **Le widget Netlify Identity devrait s'afficher automatiquement** :
   - Si vous n'êtes pas connecté, vous verrez un bouton **"Log in"**
   - Cliquez sur **"Log in"**

3. **Entrez vos identifiants** :
   - **Email** : L'email avec lequel vous vous êtes inscrit
   - **Mot de passe** : Le mot de passe que vous avez créé

4. **Cliquez sur "Log in"**

5. **Vous êtes redirigé vers l'interface Decap CMS** ✅

---

### **Si le widget ne s'affiche pas**

**Option A : Ouvrir le widget manuellement**

1. Ouvrez la console du navigateur (F12)
2. Tapez :
   ```javascript
   netlifyIdentity.open('login')
   ```
3. Le formulaire de connexion devrait s'ouvrir

---

**Option B : Se connecter via le Dashboard Netlify**

1. Allez sur https://app.netlify.com/
2. Connectez-vous avec votre compte Netlify (pas avec Netlify Identity)
3. Allez dans **"Identity"** → **"Users"**
4. Vérifiez que votre compte existe

⚠️ **Note** : Cette méthode ne vous connecte pas à Decap CMS, mais vérifie que votre compte existe.

---

## ✅ Vérifier que vous êtes connecté

### **Indicateurs visuels**

Quand vous êtes connecté à `/admin`, vous devriez voir :

1. **Interface Decap CMS complète** :
   - Menu en haut avec "Content" et "Media"
   - Pas de widget de connexion visible
   - Fond sombre avec l'interface CMS

2. **Dans la console (F12)** :
   ```javascript
   netlifyIdentity.currentUser()
   ```
   Devrait retourner un objet avec votre email.

---

### **Test simple**

1. **Allez sur** : `https://grimoire-d-aether.netlify.app/admin/`

2. **Si vous voyez** :
   - ✅ L'interface Decap CMS → **Vous êtes connecté !**
   - ❌ Un widget de connexion → **Vous n'êtes pas connecté**

3. **Si vous n'êtes pas connecté** :
   - Cliquez sur "Log in"
   - Entrez votre email et mot de passe
   - Vous devriez être redirigé automatiquement

---

## 🆘 Problèmes courants

### **Problème 1 : "User not found" après inscription**

**Causes possibles** :
- Le token d'invitation a expiré (24h)
- L'email utilisé ne correspond pas à l'invitation

**Solution** :
1. Demandez une nouvelle invitation via Netlify Dashboard
2. Vérifiez que l'email est exactement le même

---

### **Problème 2 : Le widget ne s'affiche pas**

**Solution** :
1. Vérifiez que le script Netlify Identity est chargé :
   - Ouvrez la console (F12)
   - Tapez : `typeof netlifyIdentity`
   - Devrait retourner `"object"`

2. Si `undefined`, rechargez la page

3. Ouvrez le widget manuellement :
   ```javascript
   netlifyIdentity.open('login')
   ```

---

### **Problème 3 : "Cannot read properties of null"**

**Causes** :
- Le script Decap CMS ne s'est pas chargé correctement
- Conflit entre les scripts

**Solution** :
1. Rechargez complètement la page (Ctrl+F5)
2. Videz le cache du navigateur
3. Réessayez

---

### **Problème 4 : Je suis connecté mais Decap CMS ne charge pas**

**Vérifications** :
1. Ouvrez la console (F12) et vérifiez les erreurs
2. Vérifiez que `config.yml` est bien présent dans `/public/admin/`
3. Vérifiez que Git Gateway est activé sur Netlify

**Dans Netlify Dashboard** :
1. **Identity** → **Services** → **Git Gateway**
2. Vérifiez que **"Enable Git Gateway"** est activé

---

### **Problème 5 : Mot de passe oublié**

**Solution** :
1. Allez sur `/admin`
2. Cliquez sur **"Log in"**
3. Cliquez sur **"Forgot password?"**
4. Entrez votre email
5. Vous recevrez un email de réinitialisation
6. Cliquez sur le lien dans l'email
7. Créez un nouveau mot de passe

---

## 📝 Checklist : Inscription réussie

Cochez chaque étape pour vérifier :

- [ ] J'ai reçu l'email d'invitation
- [ ] J'ai cliqué sur le lien dans l'email
- [ ] J'ai été redirigé vers `/admin`
- [ ] Le formulaire de création de mot de passe s'est affiché
- [ ] J'ai créé un mot de passe
- [ ] L'interface Decap CMS s'affiche maintenant
- [ ] Je peux voir le menu "Content" et "Media"
- [ ] Dans Netlify Dashboard → Identity → Users, mon email apparaît

**Si toutes les cases sont cochées** → ✅ **Inscription réussie !**

---

## 🎯 Résumé rapide

### **Pour vérifier l'inscription :**
1. Allez sur `/admin` → Si vous voyez Decap CMS, c'est bon ✅
2. Ou vérifiez dans Netlify Dashboard → Identity → Users

### **Pour se connecter :**
1. Allez sur `/admin`
2. Cliquez sur "Log in" (si visible)
3. Entrez email + mot de passe
4. Vous êtes connecté ✅

### **Pour vérifier la connexion :**
- Interface Decap CMS visible = Connecté ✅
- Widget de connexion visible = Non connecté ❌

---

**Besoin d'aide ?** Vérifiez d'abord dans Netlify Dashboard → Identity → Users si votre compte existe.

