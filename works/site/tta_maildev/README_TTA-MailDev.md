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

Voici une proposition de markdown clair pour les chapitres **Technologies** et **Fonctionnalités du serveur**, avec l'ajout des URL et des ports dans la section "Fonctionnalités du serveur".

---

## **Technologies**

Ce projet utilise les outils et bibliothèques suivants :

- **[Express](https://expressjs.com/)** : Framework minimaliste pour construire l'API backend.
- **[Nodemailer](https://nodemailer.com/)** : Librairie pour envoyer des emails via SMTP dans un environnement Node.js.
- **[MailDev](https://github.com/maildev/maildev)** : Serveur SMTP simulé pour capturer et afficher les emails via une interface web.
- **[cors](https://www.npmjs.com/package/cors)** : Middleware permettant de gérer les requêtes Cross-Origin Resource Sharing (CORS) pour un accès fluide depuis le frontend.

---

## **Fonctionnalités du serveur**

Le backend `server-smtp.js` propose des services accessibles via différentes API HTTP et ports. Voici les détails :

### **1. Envoi d'emails**

- **URL** : `POST http://localhost:3000/send-email`
- **Port utilisé** : 3000
- **Description** : Permet d'envoyer un email via SMTP en utilisant **Nodemailer**. Les emails envoyés sont capturés par **MailDev**.
- **Exemple de corps de requête** :

  ```json
  {
    "from": "sender@example.com",
    "to": "recipient@example.com",
    "subject": "Test Email",
    "body": "Ceci est un test d'email depuis tta_maildev."
  }
  ```

- **Réponse** :
  - Succès (200) : `{"message": "[server] Email envoyé avec succès"}`
  - Échec (500) : `{"message": "[server] Erreur lors de l'envoi de l'email"}`

---

### **2. Récupération de tous les emails capturés**

- **URL** : `GET http://localhost:3000/get-emails`
- **Port utilisé** : 3000
- **Description** : Retourne la liste complète des emails capturés par **MailDev**.
- **Réponse** :
  - Succès (200) : Renvoie un tableau JSON contenant les informations sur les emails.
  - Exemple de réponse :

    ```json
    [
      {
        "from": "sender@example.com",
        "to": "recipient@example.com",
        "subject": "Test Email",
        "body": "Ceci est un test."
      }
    ]
    ```

---

### **3. Suppression de tous les emails capturés**

- **URL** : `DELETE http://localhost:3000/delete-emails`
- **Port utilisé** : 3000
- **Description** : Supprime tous les emails capturés par **MailDev**.
- **Réponse** :
  - Succès (200) : `{"message": "[server] Tous les emails ont été supprimés avec succès"}`
  - Échec (500) : `{"message": "[server] Erreur lors de la suppression des emails"}`

---

### **4. Serveur SMTP simulé**

- **Port utilisé** : 1025
- **Description** : **MailDev** capture les emails envoyés via ce port pour les afficher dans l'interface web. Ce service est utilisé par **Nodemailer** pour la transmission des emails.

---

### **5. Interface web MailDev**

- **URL** : `http://localhost:1080`
- **Port utilisé** : 1080
- **Description** : Interface web conviviale permettant de visualiser et tester les emails capturés.

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

Bien sûr ! Vous pouvez avoir une section engageante tout en précisant qu'il s'agit d'un projet éducatif ou d'étude, sans ouverture explicite aux contributions. Voici une suggestion pour le chapitre **Contribuer** adaptée à votre contexte :

---

## **Contribuer**

Ce projet, **tta_maildev**, a été développé dans le cadre d'une formation en développement web et web mobile avec le CEF. Il a pour objectif principal de démontrer et valider des compétences dans la gestion d'emails via un serveur backend dédié, en intégration avec un client Angular.

Les évolutions futures de ce projet ne sont pas prévues après son rendu, mais il reste disponible pour être étudié et adapté dans d'autres contextes éducatifs ou professionnels.

Merci pour votre intérêt pour ce projet et pour avoir pris le temps de l'explorer ! 😊

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
