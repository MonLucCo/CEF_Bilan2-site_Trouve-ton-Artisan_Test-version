# Projet tta_maildev

## **Objectif**

**tta_maildev** a été conçu pour servir de solution backend dédiée à la gestion et au test d'envoi d'emails dans le contexte de l'application frontend **tta_angular**. Voici ses rôles et objectifs spécifiques :

1. **Simplification des tests d'emails** :
   - **tta_angular** nécessite un backend capable de gérer les emails envoyés via le formulaire de contact (par exemple, des messages destinés à des artisans). **tta_maildev** fournit une infrastructure locale pour tester ces envois sans avoir besoin d'accéder à un serveur SMTP réel.
   - Les emails envoyés par le frontend (via l'API HTTP `send-email`) sont capturés par **MailDev**, offrant une interface visuelle pour vérifier leur contenu et leur mise en forme.

2. **Intégration fluide** :
   - Le backend expose une API HTTP accessible à **tta_angular** pour simplifier l'envoi d'emails depuis le formulaire de contact. Cette approche centralise la logique de gestion des emails côté backend tout en gardant le frontend léger.

3. **Environnement sécurisé pour le développement** :
   - En évitant l'utilisation d'un vrai serveur SMTP ou d'adresses email sensibles pendant le développement, **tta_maildev** garantit un environnement sécurisé et isolé.
   - Cela réduit les risques liés aux erreurs lors des tests et permet un débogage simplifié grâce à l'interface **MailDev**.

4. **Polyvalence et extensibilité** :
   - Le projet est conçu pour fonctionner comme un backend générique pour tout client consommant son API HTTP, mais il est particulièrement optimisé pour son intégration avec **tta_angular**.

---

## Description

**tta_maildev** est une application Node.js intégrant **MailDev**, un serveur SMTP local idéal pour le développement et le test d'envoi d'emails. Ce projet est équipé d'une API HTTP personnalisée permettant d'envoyer des emails via **Nodemailer**.

MailDev capture les emails et les rend accessibles via une interface web conviviale.

---

## Fonctionnalités

- **Serveur SMTP** : Simule un serveur SMTP sur localhost.
- **Interface Web** : Visualisation des emails reçus via **MailDev** (<http://localhost:1080>).
- **API HTTP** : Envoi d'emails via une API REST exposée à <http://localhost:3000/send-email>.
- **Support CORS** : Compatible avec les requêtes provenant de clients front-end (comme Angular).

---

## Installation

### Prérequis

- **Node.js** : Version 18+ ou 22.14.0 LTS (testée et recommandée).
- **npm** : Inclus dans Node.js.

### Étapes

1. Clonez le dépôt GitHub :

   ```bash
   git clone <URL-votre-depot-GitHub>
   cd tta_maildev
   ```

2. Installez les dépendances :

   ```bash
   npm install
   ```

---

## Utilisation

### Démarrer le serveur

Pour lancer l'application, exécutez :

```bash
node server-smtp.js
```

### Accéder à MailDev

- **Interface Web** : Ouvrez **<http://localhost:1080>** dans votre navigateur.
- **Port SMTP** : Le serveur écoute sur **<localhost:1025>** pour les envois via SMTP.

### Tester l'API HTTP

1. Effectuez une requête POST vers **<http://localhost:3000/send-email>** :
   - Exemple de corps de requête :

     ```json
     {
       "to": "recipient@example.com",
       "subject": "Test depuis API HTTP",
       "body": "Message de test via tta_maildev."
     }
     ```

2. Vérifiez que l'email est capturé dans MailDev.

---

## Exemple d'intégration avec Angular

Pour intégrer cette API à un projet Angular, utilisez le service suivant dans votre application :

```typescript
@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private apiUrl = 'http://localhost:3000/send-email';

  constructor(private http: HttpClient) {}

  sendEmail(data: { to: string; subject: string; body: string }): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
```

---

## Développement

### Personnalisation

Pour modifier le port ou ajouter des fonctionnalités :

1. Éditez le fichier `server-smtp.js`.
2. Relancez le serveur avec :

   ```bash
   node server-smtp.js
   ```

### Débogage

- Logs du backend visibles dans la console.
- Messages capturés accessibles via l'interface web.

---

## Déploiement

### Hébergement

Pour héberger ce projet sur des services comme **Heroku**, créez un fichier `Procfile` :

``` pwsh
web: node server-smtp.js
```

### Variables d'environnement

Remplacez les ports statiques par des variables d'environnement pour les environnements en ligne :

```javascript
const PORT = process.env.PORT || 3000;
const SMTP_PORT = process.env.SMTP_PORT || 1025;
```

---

## Contribuer

Aucune contribution n'est attendue pour ce projet d'étude réalisé dans le cadre d'une formation _développeur web et web mobile_ avec le CEF.

---

## Sources du projet

Ce projet utilise les outils et bibliothèques suivants pour garantir une fonctionnalité robuste et fiable :

### Backend

- **[Express](https://expressjs.com/)** : Framework minimaliste pour Node.js, utilisé pour construire l'API backend.
- **[Nodemailer](https://nodemailer.com/)** : Librairie pour envoyer des emails via SMTP dans un environnement Node.js.
- **[MailDev](https://github.com/maildev/maildev)** : Serveur SMTP simulé pour le développement et la capture des emails dans une interface web.

### Autres outils

- **[cors](https://www.npmjs.com/package/cors)** : Middleware pour gérer les requêtes Cross-Origin Resource Sharing (CORS).
- **[markdownlint](https://github.com/DavidAnson/markdownlint)** : Utilisé pour garantir des fichiers Markdown conformes et bien structurés.

### IDE recommandé

- **Visual Studio Code** : Éditeur de code utilisé pour développer et tester ce projet.

---

## Licence

Ce projet est sous licence **MIT**.

---
