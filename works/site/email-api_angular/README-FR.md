# **EmailApiAngular**

>> **A documenter** :

1. ajout des scripts de tests
2. mise à jour de commandes de script backend et frontend de Dev et de Prod
3. ajout de CORS dans la config
4. ajout des configurations (Dev et Prod) d'environnement pour le back-end et le front-end
   1. préciser la configuration dans angular.json pour remplacement automatique de la config (environments/front-end/environment.*.ts) lors de la compilation (serve ou build)
   2. préciser la séparation des responsabilités interface utilisateur et logique métier : création des services Email (envoi HTTP et logs) et Logger (logs de l'application)
5. gestion dynamique des liste de messages dans le dashbord
   1. modification de la structure avec création d'un src/backend pour les codes du BackEnd (BE)
   2. modification de server.ts et désinstallation de bodyParser
   3. création service 'message' du FrontEnd (FE) et intégration dans DashBoard
   4. création de scripts pour tester le BE et mise en place d'une configuration pour les tests
   5. amélioration du LoggerService dans le FE
6. fonctionnalités du dashbord
   1. Historique des messages dans un tableau Bootstrap (BS) avec affichage du message (sur clic) dans une modale.
   2. Suppression des messages (par message ou tous les messages de l'historique) avec modale de confirmation.
   3. Rafraîchissement du tableau automatique ou manuel
   4. Ajout d'un service pour les Status du 'server' et du 'MailDev'. Utilisation du service de Status par abonnement dans le Footer, le Header et la Modale qui teste le status

>> **A documenter**

## **Présentation technique et fonctionnelle**

Ce projet est une **application full-stack** combinant un **front-end Angular** et un **back-end Node.js avec Express**.  
Il fournit une **passerelle HTTP-SMTP** permettant d'envoyer des emails en HTTP via une API et de les acheminer vers **MailDev** pour des tests ou simulations.  

Le **front-end Angular** agit comme un **dashboard** interactif, offrant une visualisation des échanges et une supervision complète du fonctionnement de la passerelle vers MailDev.  

Conçu à la fois pour les environnements de développement et de test, ce projet constitue un **outil clé pour valider les fonctionnalités d'envoi d'emails** tout en offrant un contrôle clair et centralisé des interactions.

---

## **Table des matières**

- [**EmailApiAngular**](#emailapiangular)
  - [**Présentation technique et fonctionnelle**](#présentation-technique-et-fonctionnelle)
  - [**Table des matières**](#table-des-matières)
  - [**Prérequis**](#prérequis)
  - [**Lancement des serveurs de développement**](#lancement-des-serveurs-de-développement)
    - [**1. Lancer le front-end (Angular)**](#1-lancer-le-front-end-angular)
    - [**2. Lancer le back-end (Node.js)**](#2-lancer-le-back-end-nodejs)
    - [**3. Démarrer MailDev**](#3-démarrer-maildev)
  - [**Construction du projet**](#construction-du-projet)
    - [**1. Construire le front-end**](#1-construire-le-front-end)
    - [**2. Construire le back-end**](#2-construire-le-back-end)
    - [**3. Construire les deux parties**](#3-construire-les-deux-parties)
  - [**Exécution des tests**](#exécution-des-tests)
    - [**1. Tests unitaires (front-end)**](#1-tests-unitaires-front-end)
    - [**2. Linting**](#2-linting)
  - [**Test du back-end pour l'envoi d'emails**](#test-du-back-end-pour-lenvoi-demails)
    - [**1. Envoi d'emails de test**](#1-envoi-demails-de-test)
    - [**2. Visualisation des emails dans MailDev**](#2-visualisation-des-emails-dans-maildev)
  - [**Ressources supplémentaires**](#ressources-supplémentaires)

---

## **Prérequis**

Avant de commencer, assurez-vous d'avoir les éléments suivants installés sur votre machine :

- [Node.js](https://nodejs.org/) (version 14 ou supérieure)
- [Angular CLI](https://angular.dev/cli) (version 19.0.6 ou supérieure)
- **MailDev** pour le test des emails (voir [MailDev](https://github.com/maildev/maildev) pour les instructions d'installation)

Cloner le dépôt et installer les dépendances :

```bash
git clone https://url-de-votre-repo.git
cd email-api-angular
npm install
```

Ensuite, installez les dépendances nécessaires dans votre projet en local :

1. **Installer les outils de développement** :

   ```bash
   npm install --save-dev nodemon ts-node eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser
   ```

2. **Installer les bibliothèques pour le back-end** :

   ```bash
   npm install express body-parser nodemailer
   ```

3. **Installer les types pour TypeScript** :

   ```bash
   npm install --save-dev @types/express @types/body-parser @types/nodemailer @types/node typescript
   ```

4. **Installer MailDev** globalement si ce n'est pas encore fait (pour tester les emails) :

   ```bash
   npm install -g maildev
   ```

5. **Installer `cross-env` pour la compatibilité multiplateforme** (traitement uniforme des variables d'environnement pour les plateformes Windows, macOS, Linux):

   ```bash
   npm install --save-dev cross-env
   ```

---

## **Lancement des serveurs de développement**

### **1. Lancer le front-end (Angular)**

Pour démarrer le serveur de développement Angular, exécutez :

```bash
npm run start:frontend
```

Une fois lancé, ouvrez votre navigateur et accédez à :

```url
http://localhost:4200/
```

L'application se rechargera automatiquement dès que vous modifiez les fichiers sources.

---

### **2. Lancer le back-end (Node.js)**

Pour démarrer le back-end en mode développement avec `ts-node` et `nodemon`, utilisez :

```bash
npm run start-dev:backend
```

Le serveur back-end écoutera les requêtes à l'adresse :

```url
http://localhost:3000/
```

Pour démarrer le back-end en mode production après l'avoir construit :

```bash
npm run start:backend
```

---

### **3. Démarrer MailDev**

Pour intercepter et visualiser les emails pendant les tests, démarrez MailDev :

```bash
maildev
```

- Le serveur SMTP de MailDev sera disponible à l'adresse : `localhost:1025`
- L'interface web de MailDev sera accessible à l'adresse : [http://localhost:1080](http://localhost:1080)

---

## **Construction du projet**

Pour construire les composants front-end et back-end pour la production, utilisez les commandes suivantes :

### **1. Construire le front-end**

Compilez l'application Angular avec :

```bash
npm run build:frontend
```

Les artefacts de la construction seront stockés dans le répertoire `dist/`.

### **2. Construire le back-end**

Compilez le code TypeScript du back-end avec :

```bash
npm run build:backend
```

Le résultat sera placé dans le répertoire `dist/server/`.

### **3. Construire les deux parties**

Pour construire simultanément le front-end et le back-end :

```bash
npm run build:all
```

---

## **Exécution des tests**

### **1. Tests unitaires (front-end)**

Exécutez les tests unitaires Angular avec Karma :

```bash
npm run test:frontend
```

### **2. Linting**

Analysez le code TypeScript pour vérifier sa conformité avec les normes de codage :

```bash
npm run lint
```

---

## **Test du back-end pour l'envoi d'emails**

### **1. Envoi d'emails de test**

Pour tester la fonctionnalité d'envoi d'emails, utilisez PowerShell pour envoyer une requête à l'API du back-end :

```pwsh
Invoke-RestMethod -Uri "http://localhost:3000/api/send-email" `
    -Method Post `
    -Body (ConvertTo-Json -Depth 10 -InputObject @{
        from = "test@exemple.com";
        to = "test@localhost";
        subject = "Test d'Email";
        text = "Ceci est un test avec des accents : é, à, ù, ô."
    }) `
    -ContentType "application/json"
```

### **2. Visualisation des emails dans MailDev**

Après avoir envoyé un email de test, vérifiez sa réception dans l'interface de MailDev :

- Accédez à [http://localhost:1080](http://localhost:1080) dans votre navigateur.
- Vérifiez si l'email apparaît avec le sujet et le contenu spécifiés.

---

## **Ressources supplémentaires**

- [Documentation Angular CLI](https://angular.dev/tools/cli)
- [Documentation Nodemailer](https://nodemailer.com/about/)
- [Documentation MailDev](https://github.com/maildev/maildev)

---
