# Passerelle HTTP-SMTP : Implémentation

---

- [Passerelle HTTP-SMTP : Implémentation](#passerelle-http-smtp--implémentation)
  - [Version](#version)
  - [Introduction](#introduction)
  - [Création de l'application](#création-de-lapplication)
    - [Commande d'initialisation](#commande-dinitialisation)
  - [Installation des dépendances](#installation-des-dépendances)
  - [Configuration du serveur (server.ts)](#configuration-du-serveur-serverts)
  - [Tests et validation](#tests-et-validation)
    - [Lancement de l'API](#lancement-de-lapi)
    - [Test via PowerShell](#test-via-powershell)
  - [Améliorations prévues](#améliorations-prévues)
  - [Références techniques et éducatives](#références-techniques-et-éducatives)
    - [Références techniques](#références-techniques)
    - [Ressources éducatives](#ressources-éducatives)

---

## Version

v1.0.6

---

## Introduction

Ce document détaille les étapes pratiques pour implémenter la passerelle HTTP-SMTP dans le projet à l'aide de l'application `email-api_angular`. Il s'appuie sur les concepts et justifications décrits dans le document `email-gateway-concept.md`.

## Création de l'application

### Commande d'initialisation

La création du projet `email-api_angular` a été réalisée avec la commande suivante :

```pwsh
ng new email-api_angular --standalone=false
```

- **Pourquoi ?**
  - Crée une application Angular classique avec `NgModule`, adaptée aux projets structurés.
  - `--standalone=false` permet d'utiliser des modules, une méthode standard pour des configurations flexibles.

---

## Installation des dépendances

Les dépendances nécessaires à l'API sont les suivantes :

1. **Express.js** (gestion des requêtes HTTP) :

   ```pwsh
   npm install express body-parser
   ```

2. **Nodemailer** (envoi des emails via SMTP) :

   ```pwsh
   npm install nodemailer
   ```

Ces bibliothèques permettent d'interagir avec le protocole HTTP (via Express) et de convertir les données en commandes SMTP pour MailDev.

---

## Configuration du serveur (server.ts)

Voici un exemple de configuration de base pour le fichier `server.ts` :

```typescript
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as nodemailer from 'nodemailer';

const app = express();
app.use(bodyParser.json());

app.post('/api/send-email', async (req, res) => {
    const { from, to, subject, text } = req.body;

    const transporter = nodemailer.createTransport({
        host: 'localhost',
        port: 1025,
        secure: false
    });

    try {
        await transporter.sendMail({ from, to, subject, text });
        res.status(200).send({ success: true });
    } catch (error) {
        res.status(500).send({ success: false, error: error.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`API en écoute sur http://localhost:${PORT}`);
});
```

---

## Tests et validation

### Lancement de l'API

Démarrez l'application avec la commande :

```pwsh
npm start
```

### Test via PowerShell

Envoyez une requête POST pour vérifier le fonctionnement de l'API :

```pwsh
Invoke-RestMethod -Uri "http://localhost:3000/api/send-email" -Method Post -Body @{
    from = "noreply@local.dev";
    to = "artisan@example.com";
    subject = "Sujet Test";
    text = "Ceci est un email de test.";
} -ContentType "application/json"
```

---

## Améliorations prévues

1. Ajouter une gestion des erreurs plus robuste (ex. journalisation).
2. Héberger l'application sur un sous-domaine spécifique (ex. `api.<mon-domaine>.alwaysdata;net`).

---

## Références techniques et éducatives

Les liens suivants fournissent des détails sur les outils, commandes et concepts utilisés :

### Références techniques

Les liens suivants fournissent des détails sur les outils et commandes utilisés :

- **Angular CLI** : [Documentation Angular CLI](https://angular.io/cli)  
  Instructions sur l'utilisation de la CLI Angular pour créer un projet.
- **Express.js** : [Guide d'introduction Express.js](https://expressjs.com/en/starter/hello-world.html)  
  Exemple de création de serveur avec Express.
- **Nodemailer** : [Utilisation de Nodemailer](https://nodemailer.com/about/)  
  Informations sur les options de transport SMTP et les cas d'utilisation.
- **MailDev** : [MailDev Guide utilisateur](https://maildev.github.io/)  
  Configuration pour les tests locaux d'emails avec MailDev.
- **PowerShell Invoke-RestMethod** : [Documentation Microsoft Invoke-RestMethod](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/invoke-restmethod)  
  Tutoriel pour utiliser PowerShell pour tester des requêtes API.

### Ressources éducatives

- **Introduction aux API** : [Les 27 meilleurs blogs éducatifs](https://performance-tpe.fr/les-27-meilleurs-blogs-et-sites-web-deducation-que-vous-devez-connaitre/)  
  Une ressource pour comprendre les bases des API et leur rôle dans les projets modernes.
- **Plateformes éducatives gratuites** : [Classeur d'école](https://classeurdecole.fr/meilleures-plateformes-ressources-educatives-gratuites/)  
  Une liste de plateformes éducatives pour explorer des concepts techniques et pédagogiques.
- **Tutoriel sur les passerelles HTTP-SMTP** : [Top 5 des ressources éducatives](https://info-etudes.fr/actualites-educatives/5-sites-incontournables-pour-des-ressources-educatives-de-qualite/)  
  Une ressource pratique pour comprendre les passerelles entre différents protocoles.
- **Tutoriel TypeScript et Node.js** : [freeCodeCamp - Learn TypeScript](https://www.freecodecamp.org/news/learn-typescript-beginners-guide/)  
  Un guide complet pour apprendre TypeScript et l'utiliser avec Node.js.
- **Exemple de configuration server.ts** : [Stack Overflow - Angular SSR et server.ts](https://stackoverflow.com/questions/79440224/angular-ssr-file-server-ts-and-file-main-server-ts)  
  Discussion sur l'utilisation de `server.ts` dans des projets Angular avec Express.
- **Guide Node.js avec TypeScript** : [GeeksforGeeks - Node.js et TypeScript](https://www.digitalocean.com/community/tutorials/setting-up-a-node-project-with-typescript)  
  Tutoriel pour configurer un projet Node.js avec TypeScript, incluant des exemples de serveur.

---
