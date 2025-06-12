# Contenu du dossier

---

- [Contenu du dossier](#contenu-du-dossier)
  - [Version](#version)
  - [1. Projet TTA en technologie Angular](#1-projet-tta-en-technologie-angular)
  - [2. Serveur BackEnd pour échanger en SMTP avec l'application MailDev](#2-serveur-backend-pour-échanger-en-smtp-avec-lapplication-maildev)
  - [3. Solution full-stack d'une application passerelle HTTP-SMTP](#3-solution-full-stack-dune-application-passerelle-http-smtp)
  - [4. Site d'accueil pour l'hébergement](#4-site-daccueil-pour-lhébergement)
  - [5. Validateur W3C pour les sites réactifs (SPA)](#5-validateur-w3c-pour-les-sites-réactifs-spa)

---

## Version

v1.0.6

---

Le dossier `/works/site` contient les différents dossiers et fichiers du développement du projet **Trouve Ton Artisan**.
Ces dossiers développés dans les sections suivantes concernent :

- le projet [TTA](#1-projet-tta-en-technologie-angular) (le sujet principal du projet - version opérationnelle).
- le projet [Serveur Backend](#2-serveur-backend-pour-échanger-en-smtp-avec-lapplication-maildev) (un sujet connexe lié à MailDev - version opérationnelle).
- le projet [full-stack](#3-solution-full-stack-dune-application-passerelle-http-smtp) (un essai pour traiter Maildev - démonstrateur technologique).
- le projet [Hosting](#4-site-daccueil-pour-lhébergement) (un sujet connexe pour l'hébergement des sites - version opérationnelle).
- le projet [Validator W3C dynamique](#5-validateur-w3c-pour-les-sites-réactifs-spa) (un sujet connexe lié à la validation W3C des SPA - version opérationnelle).

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

## 4. Site d'accueil pour l'hébergement

Le dossier contient une page statique `index.html` et un fichier de documentation `README_hosting.md` relatif au déploiement du site chez **AlwaysData**.

## 5. Validateur W3C pour les sites réactifs (SPA)

Le dossier `tta_validator` est une application backend [Node.js](https://Node.js) qui automatise l’**évaluation W3C des pages d’un site réactif**. À partir d’un fichier de configuration JSON, chaque page est analysée dynamiquement et les résultats sont archivés pour une réutilisation directe. L'outil simplifie les tests pour les sites hébergés (`https://`) et en local (`http://`), avec des vérifications répétés via le terminal ou l’interface web.

Les résultats proviennent du [Validateur W3C](https://validator.w3.org/nu/) ou du [Service de validation CSS du W3C](https://jigsaw.w3.org/css-validator/).

L'intérêt de ce projet est d'**aider à la validation des sites réactifs** en analysant leur HTML et CSS obtenus à partir du rendu de la page. Il facilite la détection des erreurs et l'impact des corrections sur toutes les pages, qu'elles soient en développement (`http://`) ou déployées (`https://`).

Pour le projet TTA_angular, il permet d'évaluer page par page l'impact des corrections sur la validation W3C.

[Documentation du projet TTA_Validator](./tta_validator/docs/README_tta_validator.md).
