# 🔐 Guide : Tokens de récupération Netlify Identity

## ✅ C'est normal !

Quand vous recevez un lien de réinitialisation de mot de passe de Netlify Identity, il ressemble à ceci :

```
https://grimoire-d-aether.netlify.app/#recovery_token=JD0flS2n405FamHDCYr_oQ
```

**C'est tout à fait normal !** Netlify Identity redirige toujours vers la page d'accueil de votre site avec le token dans l'URL.

---

## 🔄 Solution : Redirection automatique vers `/admin`

Un script a été ajouté dans votre `index.html` pour **rediriger automatiquement** vers `/admin` quand un token est détecté.

### Tokens gérés automatiquement :

- ✅ `recovery_token` : Réinitialisation de mot de passe
- ✅ `invite_token` : Invitation d'utilisateur
- ✅ `confirmation_token` : Confirmation d'email

---

## 📋 Comment ça fonctionne maintenant

1. **Vous recevez l'email** avec le lien :
   ```
   https://grimoire-d-aether.netlify.app/#recovery_token=...
   ```

2. **Vous cliquez sur le lien** → Vous arrivez sur la page d'accueil

3. **Le script détecte automatiquement le token** → Redirige vers `/admin#recovery_token=...`

4. **Decap CMS prend le relais** → Affiche le formulaire de réinitialisation de mot de passe

5. **Vous créez votre nouveau mot de passe** → Connexion automatique

---

## 🎯 Utilisation

### Pour réinitialiser votre mot de passe :

1. Allez sur `/admin` et cliquez sur "Forgot password?" (si disponible)
   - Ou demandez une réinitialisation depuis Netlify Dashboard

2. Vous recevez un email avec un lien contenant `recovery_token`

3. Cliquez sur le lien dans l'email

4. Vous êtes automatiquement redirigé vers `/admin` avec le formulaire de réinitialisation

5. Entrez votre nouveau mot de passe

6. Vous êtes connecté !

---

## 🔍 Vérification

### Test de la redirection :

Si vous avez un token dans l'URL, vous devriez être redirigé automatiquement. Par exemple :

- ❌ `https://grimoire-d-aether.netlify.app/#recovery_token=xxx`
- ✅ Redirection vers : `https://grimoire-d-aether.netlify.app/admin#recovery_token=xxx`

### Si la redirection ne fonctionne pas :

1. **Vérifiez que le script est présent** dans `index.html`
2. **Videz le cache du navigateur**
3. **Testez en navigation privée**
4. **Vérifiez la console** pour des erreurs JavaScript

---

## 📝 Tokens Netlify Identity

### Types de tokens :

| Token | Usage | Durée de validité |
|-------|-------|-------------------|
| `recovery_token` | Réinitialisation de mot de passe | 24 heures |
| `invite_token` | Invitation d'utilisateur | 7 jours |
| `confirmation_token` | Confirmation d'email | 7 jours |

### Format de l'URL :

```
https://votre-site.netlify.app/#TOKEN_TYPE=TOKEN_VALUE
```

Exemples :
- `/#recovery_token=abc123...`
- `/#invite_token=xyz789...`
- `/#confirmation_token=def456...`

---

## ⚙️ Configuration Netlify Identity

### Dans Netlify Dashboard :

1. Allez dans **"Identity"** → **"Settings and usage"**
2. Sous **"Email templates"**, vous pouvez personnaliser :
   - Le template d'email de réinitialisation
   - Le lien de redirection après réinitialisation

### URL de redirection après réinitialisation :

Par défaut, Netlify redirige vers `/`, mais avec notre script, vous serez automatiquement redirigé vers `/admin`.

---

## 🆘 Dépannage

### Problème : Le token ne fonctionne pas

**Solutions :**

1. **Vérifiez que le token n'a pas expiré**
   - Recovery token : 24h
   - Invite token : 7 jours
   - Si expiré, demandez un nouveau lien

2. **Vérifiez l'URL complète**
   - Le token doit être présent dans l'URL
   - Format : `/#recovery_token=VALEUR`

3. **Testez en navigation privée**
   - Évite les problèmes de cache ou cookies

4. **Vérifiez la console du navigateur**
   - Ouvrez la console (F12)
   - Regardez les erreurs éventuelles

### Problème : Pas de redirection vers `/admin`

**Solutions :**

1. **Vérifiez que le script est dans `index.html`**
   - Le script doit être présent avant la fermeture de `</body>`

2. **Vérifiez que le site est bien déployé**
   - Les modifications doivent être commitées et pushées
   - Netlify doit avoir redéployé

3. **Videz le cache du navigateur**
   - Ctrl+Shift+Delete (Chrome/Firefox)
   - Ou testez en navigation privée

---

## 📚 Ressources

- [Documentation Netlify Identity](https://docs.netlify.com/visitor-access/identity/)
- [Guide de setup complet](./SETUP_NETLIFY.md)
- [Dépannage authentification](./EXPLICATION_AUTHENTIFICATION.md)

---

**Dernière mise à jour** : Décembre 2024

