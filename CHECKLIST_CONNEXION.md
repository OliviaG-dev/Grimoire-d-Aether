# ✅ Checklist : Vérifier l'inscription et se connecter

## 🎯 Guide ultra-rapide

---

## 📋 **ÉTAPE 1 : Vérifier que l'inscription a réussi**

### ✅ Méthode rapide (30 secondes)
1. Allez sur : `https://grimoire-d-aether.netlify.app/admin/`
2. **Si vous voyez** :
   - ✅ L'interface Decap CMS (menu "Content", "Media") → **Inscription réussie !**
   - ❌ Un widget de connexion ou message "Non connecté" → Continuez ci-dessous

### ✅ Méthode fiable (2 minutes)
1. Allez sur : https://app.netlify.com/
2. Connectez-vous à votre compte Netlify
3. Sélectionnez votre site "Grimoire d'Áether"
4. **Identity** → **Users**
5. **Si votre email apparaît dans la liste** → ✅ **Inscription réussie !**

---

## 🔑 **ÉTAPE 2 : Se connecter**

### Si vous venez de créer votre compte :
- ✅ **Vous êtes déjà connecté automatiquement**
- ✅ L'interface Decap CMS devrait s'afficher
- ✅ **Passez à l'étape 3**

### Si vous devez vous reconnecter :

1. **Allez sur** : `https://grimoire-d-aether.netlify.app/admin/`

2. **Vérifiez l'indicateur de statut** (en haut à droite) :
   - ✅ **"Connecté en tant que : votre@email.com"** → Vous êtes connecté !
   - ❌ **"Non connecté"** → Cliquez sur "Se connecter"

3. **Si nécessaire, connectez-vous** :
   - Cliquez sur **"Se connecter"** (bouton dans l'indicateur)
   - Ou le widget Netlify Identity s'ouvre automatiquement
   - Entrez votre **email** et **mot de passe**
   - Cliquez sur **"Log in"**

4. **Vous êtes redirigé** vers l'interface Decap CMS ✅

---

## ✅ **ÉTAPE 3 : Vérifier que vous êtes connecté**

### Indicateurs visuels :

- ✅ **Interface Decap CMS visible** avec menu en haut
- ✅ **Pas de widget de connexion visible**
- ✅ **Indicateur de statut** (en haut à droite) montre "Connecté"
- ✅ **Vous pouvez accéder aux collections** (Content, Media)

### Test rapide dans la console (optionnel) :

1. Ouvrez la console (F12)
2. Tapez : `netlifyIdentity.currentUser()`
3. **Si vous voyez un objet avec votre email** → ✅ **Connecté !**

---

## 🆘 **Si ça ne fonctionne pas**

### ❌ "User not found"
→ L'inscription n'a pas fonctionné. Demandez une nouvelle invitation.

### ❌ Le widget ne s'affiche pas
→ Rechargez la page (Ctrl+F5). Si ça ne marche pas, ouvrez la console et tapez :
```javascript
netlifyIdentity.open('login')
```

### ❌ Je suis connecté mais Decap CMS ne charge pas
→ Vérifiez dans Netlify Dashboard :
- **Identity** → **Services** → **Git Gateway** → Doit être **activé**

### ❌ Mot de passe oublié
1. Allez sur `/admin`
2. Cliquez sur **"Log in"**
3. Cliquez sur **"Forgot password?"**
4. Suivez les instructions dans l'email

---

## 📝 **Résumé en 3 points**

1. **Vérifier l'inscription** → Allez sur `/admin`, si vous voyez Decap CMS = ✅
2. **Se connecter** → Allez sur `/admin`, cliquez "Se connecter" si nécessaire
3. **Vérifier la connexion** → Interface Decap CMS visible = Connecté ✅

---

**Pour plus de détails** → Consultez `GUIDE_CONNEXION.md`

