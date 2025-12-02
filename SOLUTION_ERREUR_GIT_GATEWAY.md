# ✅ Solution : Erreur "Branch not found" - Git Gateway

## 🎯 Problème identifié

Vous avez deux problèmes :

1. **Git Gateway n'est pas activé** sur Netlify
2. **Le nom de branche dans `config.yml` ne correspond pas** à votre branche GitHub

---

## 🔧 Solutions en 2 étapes

### **ÉTAPE 1 : Corriger le nom de branche**

J'ai corrigé `public/admin/config.yml` pour utiliser la branche `master` au lieu de `main`.

**Fichier corrigé :**
```yaml
backend:
  name: git-gateway
  branch: master  # ✅ Corrigé pour correspondre à votre branche GitHub
```

---

### **ÉTAPE 2 : Activer Git Gateway sur Netlify**

1. Allez sur : https://app.netlify.com/
2. Sélectionnez votre site **"Grimoire d'Áether"**
3. Menu de gauche : **"Identity"**
4. Cliquez sur **"Enable Identity"** (si pas déjà fait)
5. Allez dans **"Services"** (ou **"Usage & billing"**)
6. Trouvez **"Git Gateway"**
7. Cliquez sur **"Enable Git Gateway"**
8. Autorisez Netlify à accéder à GitHub si demandé
9. Attendez que l'activation soit terminée

---

## ✅ Après activation

1. **Commitez et pushez** la correction :
   ```bash
   git add public/admin/config.yml
   git commit -m "Fix: Change branch to master in config.yml"
   git push
   ```

2. **Attendez le redéploiement** (2-3 minutes)

3. **Allez sur** : `https://grimoire-d-aether.netlify.app/admin/`

4. **Rechargez complètement** (Ctrl+F5)

5. **Reconnectez-vous** avec Netlify Identity

6. **L'erreur devrait disparaître** ✅

---

## 📝 Vérifications finales

- [ ] Git Gateway est activé dans Netlify (Identity → Services)
- [ ] La branche dans `config.yml` correspond à votre branche GitHub (`master`)
- [ ] Vous avez committé et pushé la correction
- [ ] Vous avez rechargé la page `/admin` après le déploiement
- [ ] Vous êtes connecté avec Netlify Identity

---

## 📖 Pour plus de détails

- **[GUIDE_RAPIDE_GIT_GATEWAY.md](./GUIDE_RAPIDE_GIT_GATEWAY.md)** - Guide rapide (2 minutes)
- **[DEPANNAGE_GIT_GATEWAY.md](./DEPANNAGE_GIT_GATEWAY.md)** - Dépannage complet

---

**Temps estimé** : 3-5 minutes

