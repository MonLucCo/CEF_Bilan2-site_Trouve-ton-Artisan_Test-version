# Contenu du dossier

Le dossier `/works/site` contient les différents dossiers et fichiers du développement du site.

## 1. Projet TTA en technologie Angular

1. Le dossier `/works/site/tta_angular` contient le développement du site avec la configuration suivante :

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
   2. `./public` : contenu des fichiers statiques qui peuvent être directement servis par le serveur (images, fichiers JSON de configuration, ou des ressources qui ne nécessitent pas de traitement particulier).
   3. `./src` : contenu des sources du site...
      1. `./src/app` : contenu des sources de l'application réparti dans les dossiers
         1. `./pages` : contient les composants des pages principales
         2. `./components` : contient les composants réutilisables
      2. _Rédaction réservée_ : **à compléter lors du développement**

---

_Rédaction réservée_ : **==> Indiquer les différents documents... à supprimer à la dernière mise à jour**
