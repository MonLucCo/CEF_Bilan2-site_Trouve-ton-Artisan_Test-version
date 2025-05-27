# Contenu du dossier

Le dossier `/works/site` contient les différents dossiers et fichiers du développement du site.

## 1. Projet TTA en technologie Angular

1. Le dossier `/works/site/tta_angular` contient le développement du site avec la configuration **Angular** suivante :

   - **standalone** : `false`
   - **stylesheet** : `Sass (SCSS)`
   - **server** : `No SSR et SSG/prerendering`

2. Les commandes de création du projet à partir de la racine du dépôt GitHub.

   ```bash
   cd ./works/site
   ng new tta_angular --standalone=false --style=scss --ssr=false
   ```

3. L'arborescence du dossier `./works/site/tta_angular`
   1. `./dist` : contenu de la version optimisée et prête pour la production de l'application. Les fichiers de ce dossier sont minimisés et configurés pour être directement déployés sur un serveur web (site hébergé). Ce dossier est généré automatiquement lors de la compilation du projet avec la commande `ng build`.
   2. `./public` : contenu des fichiers statiques qui peuvent être directement servis par le serveur (images, fichiers JSON de configuration, ou des ressources ou fichiers qui ne nécessitent pas de traitement particulier).
      1. `./public/datas` : contenu des fichiers JSON des données du projet.
      2. `./public/images` : contenu des logos et images du projet.
   3. `./src` : contenu des sources du site...
      1. `./src/app` : contenu des sources de l'application réparti dans les dossiers
         1. `./pages` : contient les composants des pages principales
         2. `./components` : contient les composants réutilisables
      2. `./src/seo` : contient les fichiers TS des scripts de configuration du SEO, ainsi qu'un dossier d'exemples de schémas de référencement (`schema.org`)
      3. _Rédaction réservée_ : **à compléter lors du développement**

---

_Rédaction réservée_ : **==> Indiquer les différents documents... à supprimer à la dernière mise à jour**

---

## 2. Serveur BackEnd pour échanger en SMTP avec l'application MailDev

1. Le dossier `/works/site/tta_maildev` contient le développement en **Node.js** de la solution backend dédiée à la gestion et au test d'envoi d'emails vers MailDev dans le contexte du développement de l'application frontend **tta_angular**.
2. Le projet de serveur backend qui intègre **MailDev** est détaillé dans un fichier [README spécifique à TTA-MailDev](./tta_maildev/README_TTA-MailDev.md).

## 3. Solution full-stack d'une application passerelle HTTP-SMTP

1. Le dossier `/works/site/email-api_angular` contient le développement d'une application full-stack pour assurer une passerelle HTTP-SMTP dédié à l'envoi d'email vers MailDev.
2. Le projet de l'application passerelle est développée à la fois en **Node**.js pour l'API en backend et en **Angular** pour son interface web. Le détail de son développement accessible dans un fichier [README spécifique Email-API_Angular](./email-api_angular/README-FR.md).
3. Le projet `email-api_angular` est fonctionnel. Toutefois, il n'a pas été retenu et intégré dans le développement du projet **TTA_Angular** dans ce niveau de version du **projet TTA**. Il a été conservé pour illustrer l'intégration combinée et les interactions de configuration dans une même architecture d'un développement en **Node.js** et en **Angular.js**.
