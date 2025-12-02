# 🔧 Dépannage : Erreur Git Gateway "Branch not found"

## 🚨 Symptômes

Quand vous essayez de vous connecter à `/admin`, vous voyez ces erreurs dans la console :

```
GitHubAPI.js:27 Problem fetching repo data from Git Gateway
auth.js:75 API_ERROR: Branch not found
.netlify/git/github/branches/main:1 Failed to load resource: 404
```

## ✅ Solution : Activer Git Gateway

Cette erreur signifie que **Git Gateway n'est pas activé** sur Netlify. Voici comment le résoudre :

---

## 📋 Étapes pour activer Git Gateway

### **ÉTAPE 1 : Vérifier que votre site est connecté à GitHub**

1. Allez sur : https://app.netlify.com/
2. Connectez-vous à votre compte Netlify
3. Sélectionnez votre site **"Grimoire d'Áether"** (ou votre nom de site)
4. Allez dans **"Site settings"** (ou **"Settings"**)
5. Vérifiez dans **"Build & deploy"** → **"Continuous Deployment"** :
   - ✅ Votre dépôt GitHub devrait apparaître
   - ✅ La branche de production devrait être définie (généralement `main` ou `master`)

**Si votre dépôt n'est pas connecté :**
1. Cliquez sur **"Link repository"**
2. Autorisez Netlify à accéder à votre dépôt GitHub
3. Sélectionnez votre dépôt `grimoire-daether`
4. Configurez :
   - **Branch to deploy** : `main`
   - **Build command** : `npm run build`
   - **Publish directory** : `dist`

---

### **ÉTAPE 2 : Activer Netlify Identity**

1. Dans votre site Netlify, allez dans **"Identity"** (menu de gauche)
2. Cliquez sur **"Enable Identity"** si ce n'est pas déjà fait
3. Attendez quelques secondes que le service s'active

---

### **ÉTAPE 3 : Activer Git Gateway**

1. Toujours dans **"Identity"**, allez dans l'onglet **"Services"** (ou **"Usage & billing"**)
2. Trouvez la section **"Git Gateway"**
3. Cliquez sur **"Enable Git Gateway"**
4. **Important** : Autorisez Netlify à accéder à votre dépôt GitHub si demandé
5. Attendez que l'activation soit terminée (quelques secondes)

---

### **ÉTAPE 4 : Vérifier que votre branche existe**

1. Allez sur votre dépôt GitHub : `https://github.com/VOTRE-USERNAME/grimoire-daether`
2. Vérifiez que la branche **`main`** existe (ou `master`)
3. Si vous avez une autre branche par défaut, mettez à jour `config.yml` :

Dans `public/admin/config.yml`, changez :
```yaml
backend:
  name: git-gateway
  branch: main  # Changez si votre branche s'appelle autrement
```

---

### **ÉTAPE 5 : Vérifier la configuration dans config.yml**

Ouvrez `public/admin/config.yml` et vérifiez :

```yaml
backend:
  name: git-gateway
  branch: main  # Doit correspondre à votre branche GitHub
```

**Important** : Le nom de la branche doit **exactement** correspondre à votre branche GitHub.

---

### **ÉTAPE 6 : Recharger et tester**

1. **Rechargez complètement** la page `/admin` (Ctrl+F5 ou Cmd+Shift+R)
2. Videz le cache si nécessaire
3. Reconnectez-vous avec Netlify Identity
4. L'erreur devrait disparaître

---

## 🔍 Vérifications supplémentaires

### **Vérifier que Git Gateway est activé**

1. Dans Netlify Dashboard → **Identity** → **Services**
2. **Git Gateway** devrait afficher :
   - ✅ Status : **Enabled** (Activé)
   - ✅ Connected repository : Votre dépôt GitHub

### **Vérifier les permissions GitHub**

1. Allez sur : https://github.com/settings/applications
2. Trouvez **"Netlify"** dans la liste
3. Vérifiez que Netlify a accès à votre dépôt

Si Netlify n'apparaît pas ou n'a pas les bonnes permissions :
1. Dans Netlify Dashboard → **Identity** → **Services** → **Git Gateway**
2. Cliquez sur **"Reconnect"** ou **"Authorize"**
3. Autorisez Netlify à accéder à votre dépôt

---

## 🆘 Si ça ne fonctionne toujours pas

### **Solution alternative : Utiliser le backend GitHub directement**

Si Git Gateway continue à poser problème, vous pouvez utiliser directement GitHub (nécessite un token GitHub personnel) :

1. Créez un **Personal Access Token** GitHub :
   - Allez sur : https://github.com/settings/tokens
   - Cliquez sur **"Generate new token (classic)"**
   - Donnez-lui le scope **`repo`** (accès complet aux dépôts)
   - Copiez le token

2. Modifiez `public/admin/config.yml` :

```yaml
backend:
  name: github
  repo: VOTRE-USERNAME/grimoire-daether  # Remplacez par votre username
  branch: main
  
  # Ajoutez ces lignes si vous utilisez un token
  # base_url: https://api.github.com  # Optionnel
```

3. **⚠️ Important** : N'utilisez pas cette méthode en production car le token serait visible dans le code client.

**Pour la production, Git Gateway est la méthode recommandée.**

---

## 📝 Checklist de vérification

Cochez chaque point pour diagnostiquer :

- [ ] Mon site Netlify est connecté à mon dépôt GitHub
- [ ] Netlify Identity est activé
- [ ] Git Gateway est activé dans Identity → Services
- [ ] La branche `main` (ou `master`) existe dans mon dépôt GitHub
- [ ] Le nom de branche dans `config.yml` correspond à ma branche GitHub
- [ ] Netlify a les permissions d'accès à mon dépôt GitHub
- [ ] J'ai rechargé la page `/admin` après activation
- [ ] Je suis connecté avec Netlify Identity

**Si toutes les cases sont cochées et ça ne fonctionne toujours pas** → Voir la section "Si ça ne fonctionne toujours pas" ci-dessus.

---

## 🎯 Résumé rapide

1. **Netlify Dashboard** → **Identity** → **Services** → **Git Gateway**
2. Cliquez sur **"Enable Git Gateway"**
3. Autorisez Netlify à accéder à GitHub si demandé
4. Vérifiez que la branche dans `config.yml` correspond à votre branche GitHub
5. Rechargez `/admin` et reconnectez-vous

---

**Dernière mise à jour** : Décembre 2024

