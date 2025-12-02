# 🚀 Guide de Démarrage Rapide - Phase 1 : Authentification

Ce guide vous permet de tester rapidement la connexion et l'identification avant de déployer sur Netlify.

---

## 📦 Ce qui a été créé

✅ **Fichiers créés :**

- `public/admin/index.html` - Interface d'administration Decap CMS
- `public/admin/config.yml` - Configuration du CMS (authentification configurée)
- `SETUP_NETLIFY.md` - Guide complet pour le déploiement sur Netlify
- `src/data/test/` - Dossier pour tester la création de contenu

---

## 🧪 Test en local (sans authentification)

Pour tester l'interface CMS en local avant de déployer :

1. **Démarrer le serveur de développement :**

   ```bash
   npm run dev
   ```

2. **Accéder à l'interface admin :**

   - Ouvrez : `http://localhost:5173/admin`
   - ⚠️ **Note** : L'authentification ne fonctionnera pas en local
   - Vous verrez une erreur de connexion, c'est normal !

3. **Vérifier que l'interface se charge :**
   - L'interface Decap CMS devrait s'afficher
   - Vous verrez la collection "Test"
   - Les boutons peuvent ne pas fonctionner (normal, il faut Netlify Identity)

---

## ✅ Prochaines étapes

### Pour activer l'authentification complète :

1. **Déployez votre site sur Netlify** (voir [SETUP_NETLIFY.md](./SETUP_NETLIFY.md))
2. **Activez Netlify Identity**
3. **Activez Git Gateway**
4. **Créez votre compte administrateur**
5. **Testez l'accès à `/admin` sur votre site déployé**

---

## 📋 Checklist Phase 1

- [x] Fichiers admin créés (`index.html`, `config.yml`)
- [x] Documentation créée
- [ ] Site déployé sur Netlify
- [ ] Netlify Identity activé
- [ ] Git Gateway activé
- [ ] Compte administrateur créé
- [ ] Test de connexion à `/admin` réussi

Une fois tous les éléments cochés, vous passerez à la **Semaine 2** : Création de contenu test avec les collections complètes.

---

## 🆘 Besoin d'aide ?

- Consultez le guide détaillé : [SETUP_NETLIFY.md](./SETUP_NETLIFY.md)
- Documentation Decap CMS : https://decapcms.org/docs/
- Documentation Netlify Identity : https://docs.netlify.com/visitor-access/identity/
