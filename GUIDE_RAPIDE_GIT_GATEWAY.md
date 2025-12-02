# ⚡ Guide Rapide : Activer Git Gateway (2 minutes)

## 🚨 Problème

Vous voyez cette erreur dans la console :
```
Problem fetching repo data from Git Gateway
Branch not found (404)
```

## ✅ Solution en 4 étapes

### **1️⃣ Ouvrir Netlify Dashboard**

Allez sur : https://app.netlify.com/
→ Connectez-vous
→ Sélectionnez votre site **"Grimoire d'Áether"**

---

### **2️⃣ Activer Netlify Identity**

1. Menu de gauche : **"Identity"**
2. Cliquez sur **"Enable Identity"** (si ce n'est pas déjà fait)
3. Attendez que le service s'active (quelques secondes)

---

### **3️⃣ Activer Git Gateway**

1. Toujours dans **"Identity"**, allez dans **"Services"** (ou **"Usage & billing"**)
2. Trouvez **"Git Gateway"**
3. Cliquez sur **"Enable Git Gateway"**
4. **Autorisez Netlify à accéder à GitHub** si une popup apparaît
5. Attendez que l'activation soit terminée (quelques secondes)

✅ **Git Gateway devrait maintenant afficher "Enabled"**

---

### **4️⃣ Vérifier et tester**

1. Vérifiez que votre site est bien connecté à GitHub :
   - **Site settings** → **Build & deploy**
   - Votre dépôt GitHub devrait apparaître

2. Allez sur : `https://grimoire-d-aether.netlify.app/admin/`
3. Rechargez complètement la page (Ctrl+F5)
4. Reconnectez-vous avec Netlify Identity
5. L'erreur devrait disparaître ! ✅

---

## 🆘 Si ça ne fonctionne toujours pas

### **Vérification rapide :**

- [ ] Netlify Identity est activé ?
- [ ] Git Gateway est activé et montre "Enabled" ?
- [ ] Votre site est connecté à GitHub ?
- [ ] La branche dans `config.yml` s'appelle bien `main` (pas `master`) ?

### **Si Git Gateway ne s'active pas :**

1. Vérifiez que votre site Netlify est bien connecté à GitHub :
   - **Site settings** → **Build & deploy** → **Continuous Deployment**
   - Si aucun dépôt n'est connecté, connectez-le d'abord

2. Réessayez d'activer Git Gateway

3. Vérifiez les permissions GitHub :
   - Allez sur : https://github.com/settings/applications
   - Trouvez "Netlify" et vérifiez qu'il a accès à votre dépôt

---

## 📖 Pour plus de détails

Consultez le guide complet : **[DEPANNAGE_GIT_GATEWAY.md](./DEPANNAGE_GIT_GATEWAY.md)**

---

**Temps estimé** : 2-3 minutes

