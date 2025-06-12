# Documentation : AlwaysData - Déploiement de `tta_angular`

---

- [Documentation : AlwaysData - Déploiement de `tta_angular`](#documentation--alwaysdata---déploiement-de-tta_angular)
  - [Version](#version)
  - [1. Introduction\*\*](#1-introduction)
  - [2. Préparation du projet Angular pour le déploiement](#2-préparation-du-projet-angular-pour-le-déploiement)
    - [2.1. Génération du build Angular](#21-génération-du-build-angular)
    - [2.2. Organisation des fichiers](#22-organisation-des-fichiers)
  - [3. Déploiement sur AlwaysData](#3-déploiement-sur-alwaysdata)
    - [3.1. Création du dossier d’hébergement](#31-création-du-dossier-dhébergement)
    - [3.2. Transfert des fichiers Angular](#32-transfert-des-fichiers-angular)
    - [3.3. Configuration du chemin d’accès](#33-configuration-du-chemin-daccès)
  - [4. Optimisation post-déploiement](#4-optimisation-post-déploiement)
    - [4.1. Activation des en-têtes `Cache-Control` et `gzip`](#41-activation-des-en-têtes-cache-control-et-gzip)
    - [4.2. Vérifications post-déploiement](#42-vérifications-post-déploiement)
    - [4.3. Monitoring et amélioration continue](#43-monitoring-et-amélioration-continue)

---

## Version

v1.0.6

---

## 1. Introduction**

AlwaysData est une plateforme d’hébergement qui permet de déployer des applications web. Dans ce document, nous allons voir comment :
✅ Organiser le projet et préparer les fichiers pour le déploiement.
✅ Mettre en place une structure adaptée (`/www/trouve-ton-artisan/`).
✅ Configurer les accès et les paramètres nécessaires au bon fonctionnement.
✅ Optimiser les performances après le déploiement.

---

## 2. Préparation du projet Angular pour le déploiement

### 2.1. Génération du build Angular

Avant d’envoyer les fichiers sur AlwaysData, il faut créer une version de production :

```bash
ng build --configuration=production --base-href /trouve-ton-artisan/
```

**L’option `--base-href`** assure que les routes fonctionneront bien sous `/trouve-ton-artisan/` sans modifier le code de développement de `index.htlm`.

### 2.2. Organisation des fichiers

Les fichiers à envoyer sont dans le dossier **`dist/tta_angular/browser/`**.

---

## 3. Déploiement sur AlwaysData

### 3.1. Création du dossier d’hébergement

✅ Se connecter à AlwaysData via **FileZilla (FTPs)**.  
✅ Créer le dossier **`/www/trouve-ton-artisan/`** de l'hébergement.

### 3.2. Transfert des fichiers Angular

✅ Ouvrir **`dist/tta_angular/browser/`** de l'environnement de développement.  
✅ Transfèrer **tout le contenu** dans `/www/trouve-ton-artisan/` via FileZilla.  

### 3.3. Configuration du chemin d’accès

✅ Se connecter à AlwaysData : **Compte Administrateur**.
✅ Définir le nouveau **site** dans AlwaysData en indiquant les adresses du site et le dossier d'hébergement associé.

---

## 4. Optimisation post-déploiement

### 4.1. Activation des en-têtes `Cache-Control` et `gzip`

✅ Accélérer le chargement des fichiers en activant la compression sur le serveur.  
✅ Vérifier dans l’administration AlwaysData si `gzip` est bien activé.  

### 4.2. Vérifications post-déploiement

✅ Test avec Lighthouse pour voir si les optimisations fonctionnent bien.  
✅ Corriger d’éventuelles erreurs dues aux fichiers `CSS`, `JS` ou aux routes mal définies.  

### 4.3. Monitoring et amélioration continue

✅ Effectuer **des tests réguliers de performance** après le déploiement.  
✅ Mettre à jour Angular et ses dépendances si nécessaire.  
