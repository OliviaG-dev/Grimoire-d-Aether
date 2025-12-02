# 📧 Guide : Accepter une invitation Netlify Identity

## 🚨 Problème rencontré

Quand vous recevez un lien d'invitation avec un token `invite_token`, vous arrivez sur `/admin` mais vous voyez :
- ❌ "Vous n'avez pas de compte avec cet email"
- ❌ Pas de possibilité de créer un mot de passe

**Pourquoi ?** Parce que le token d'invitation doit être accepté AVANT de pouvoir se connecter, et cela se fait via le widget Netlify Identity, pas directement dans Decap CMS.

---

## ✅ Solution : Page d'acceptation d'invitation

Une page dédiée a été créée : `/accept-invite.html` qui gère correctement l'acceptation des invitations.

### Comment ça fonctionne maintenant :

1. **Vous recevez l'email** avec le lien :
   ```
   https://grimoire-d-aether.netlify.app/#invite_token=xxx
   ```

2. **Vous cliquez sur le lien** → Vous êtes automatiquement redirigé vers `/accept-invite.html`

3. **Le widget Netlify Identity s'affiche** → Formulaire pour créer votre mot de passe

4. **Vous créez votre mot de passe** → Le compte est créé

5. **Redirection automatique vers `/admin`** → Vous êtes connecté !

---

## 📋 Utilisation

### Étape par étape :

1. **Recevez l'invitation par email** de Netlify Identity

2. **Cliquez sur le lien dans l'email**

3. **Vous êtes redirigé vers** `/accept-invite.html` avec le token

4. **Le widget Netlify Identity s'ouvre automatiquement** :
   - Entrez votre **email** (celui qui a reçu l'invitation)
   - Créez un **mot de passe** (minimum 8 caractères)
   - Confirmez le mot de passe

5. **Cliquez sur "Accept invitation"** ou "Set password"

6. **Vous êtes automatiquement redirigé vers `/admin`** et connecté !

---

## 🔄 Flux complet

```
Email avec invite_token
         ↓
Clic sur le lien
         ↓
Redirection vers /accept-invite.html#invite_token=xxx
         ↓
Widget Netlify Identity s'ouvre
         ↓
Création du mot de passe
         ↓
Acceptation de l'invitation
         ↓
Redirection vers /admin
         ↓
Vous êtes connecté ! ✅
```

---

## ⚙️ Configuration automatique

### Redirection automatique

Le script dans `index.html` détecte automatiquement :
- ✅ `invite_token` → Redirige vers `/accept-invite.html`
- ✅ `recovery_token` → Redirige vers `/admin`
- ✅ `confirmation_token` → Redirige vers `/admin`

### Page d'acceptation

La page `/accept-invite.html` :
- ✅ Charge le widget Netlify Identity
- ✅ Ouvre automatiquement le formulaire d'invitation
- ✅ Gère la création du compte
- ✅ Redirige vers `/admin` après acceptation

---

## 🆘 Dépannage

### Problème : Le widget ne s'ouvre pas

**Solutions :**

1. **Vérifiez que le token est dans l'URL**
   - Format : `/accept-invite.html#invite_token=xxx`
   - Si le token n'est pas présent, demandez une nouvelle invitation

2. **Vérifiez que Netlify Identity est activé**
   - Netlify Dashboard → Identity → Vérifiez que c'est activé

3. **Videz le cache du navigateur**
   - Ctrl+Shift+Delete ou navigation privée

4. **Vérifiez la console du navigateur**
   - F12 → Console → Regardez les erreurs

### Problème : "Token expired" ou "Invalid token"

**Solutions :**

1. **Le token a expiré** (valable 7 jours)
   - Demandez une nouvelle invitation depuis Netlify Dashboard

2. **Le token a déjà été utilisé**
   - Chaque token ne peut être utilisé qu'une fois
   - Si vous avez déjà accepté l'invitation, connectez-vous normalement

### Problème : "Email already registered"

**Solutions :**

1. **Vous avez déjà accepté l'invitation**
   - Allez directement sur `/admin` et connectez-vous

2. **Vous avez créé un compte autrement**
   - Utilisez vos identifiants existants pour vous connecter

---

## 📝 Notes importantes

### Tokens d'invitation

- ✅ **Validité** : 7 jours après l'envoi
- ✅ **Utilisation unique** : Un token ne peut être utilisé qu'une fois
- ✅ **Format** : `#invite_token=TOKEN_VALUE`

### Différence avec recovery_token

| Token | Usage | Page |
|-------|-------|------|
| `invite_token` | Accepter une invitation et créer un compte | `/accept-invite.html` |
| `recovery_token` | Réinitialiser le mot de passe d'un compte existant | `/admin` |

### Après acceptation

Une fois l'invitation acceptée :
- ✅ Votre compte est créé dans Netlify Identity
- ✅ Vous pouvez vous connecter normalement sur `/admin`
- ✅ Vous avez accès à l'interface Decap CMS

---

## 🔗 Ressources

- [Documentation Netlify Identity](https://docs.netlify.com/visitor-access/identity/)
- [Guide de setup](./SETUP_NETLIFY.md)
- [Guide des tokens de récupération](./GUIDE_RECOVERY_TOKEN.md)

---

**Dernière mise à jour** : Décembre 2024

