# Documentation : Optimisation des performances avec Lighthouse

---

- [Documentation : Optimisation des performances avec Lighthouse](#documentation--optimisation-des-performances-avec-lighthouse)
  - [Version](#version)
  - [1- Introduction](#1--introduction)
    - [1-1. Utilisation du navigateur en mode normal et privé](#1-1-utilisation-du-navigateur-en-mode-normal-et-privé)
    - [1-2. Pourquoi privilégier le mode privé pour l’analyse des corrections ?](#1-2-pourquoi-privilégier-le-mode-privé-pour-lanalyse-des-corrections-)
  - [2- Organisation et identification des corrections Lighthouse](#2--organisation-et-identification-des-corrections-lighthouse)
    - [2-1. Analyse des résultats en mode privé pour Mobile \& Desktop](#2-1-analyse-des-résultats-en-mode-privé-pour-mobile--desktop)
    - [2-2. Méthodologie de correction de la performance](#2-2-méthodologie-de-correction-de-la-performance)
    - [2-3. Référence des corrections d'amélioration](#2-3-référence-des-corrections-damélioration)
    - [2-4 Organisation des axes d’amélioration](#2-4-organisation-des-axes-damélioration)
      - [2-4.1. Corrections avant le build (Optimisation du code \& des ressources)](#2-41-corrections-avant-le-build-optimisation-du-code--des-ressources)
      - [2-4-2. Corrections après le build (Optimisation côté serveur \& cache)](#2-4-2-corrections-après-le-build-optimisation-côté-serveur--cache)
      - [2-4-3. Corrections indéterminées (avant ou après le build)](#2-4-3-corrections-indéterminées-avant-ou-après-le-build)
  - [3- Mise en oeuvre des corrections d'amélioration de la performance](#3--mise-en-oeuvre-des-corrections-damélioration-de-la-performance)
  - [4- Conclusion et synthèse des corrections de performances du projet](#4--conclusion-et-synthèse-des-corrections-de-performances-du-projet)

---

## Version

v1.0.6

---

## 1- Introduction

### 1-1. Utilisation du navigateur en mode normal et privé

Lighthouse peut être exécuté en **mode normal** ou **mode privé** dans le navigateur.  

✅ **Mode normal** : Permet d’évaluer les performances en conditions réelles, avec l’impact des extensions et du cache.  
✅ **Mode privé** : Supprime l’influence des extensions et du cache pour identifier les **problèmes structurels** de l’application.  

### 1-2. Pourquoi privilégier le mode privé pour l’analyse des corrections ?

Deux principales raisons sont retenues :

- L’exécution des tests en mode privé permet d’isoler **les problèmes intrinsèques au projet** sans interférences externes.
- Cela permet de **révéler les optimisations nécessaires** avant d’effectuer un build ou un déploiement.

---

## 2- Organisation et identification des corrections Lighthouse

Les corrections de performances sont menées en dernières, après les corrections du _SEO_, puis de l'_accessibilité_ et des _bonnes practiques_. Cette approche va du spécifique à la codification du projet jusqu'aux considérations relevant de l'environnement de **Angular**.

### 2-1. Analyse des résultats en mode privé pour Mobile & Desktop

✅ **Score Lighthouse Desktop : 59%**.
✅ **Score Lighthouse Mobile : 46%**.
✅ **Accessibilité, Best Practices, SEO : 100%**.

### 2-2. Méthodologie de correction de la performance

- Identifier les **problèmes détectés par Lighthouse**.
- Regrouper les corrections en trois catégories :
  - Optimisations **avant le build**
  - Optimisations **après le build**
  - **Indéterminées** (ajustables avant ou après le build).

### 2-3. Référence des corrections d'amélioration

Le tableau ci-dessous est établi à partir de la première version des résultats des **tests de performances de Lighthouse**.

| **Référence** | **Problème identifié** | **Impact** | **Action recommandée** | **Statut** |
|--------------|----------------------|------------|----------------------|------------|
| `PERF-01` | Font sans `swap` | Texte invisible avant chargement | `font-display: swap` sur les polices | ✅ Corrigé |
| `PERF-02` | Images sans dimensions | Layout Shift (CLS) élevé | Ajout de `width` et `height` explicites | ✅ Corrigé |
| `PERF-03` | JS/CSS trop volumineux | Ralentit le rendu | Minification avec `ng build --prod` | ✅ Corrigé |
| `PERF-04` | Ressources non compressées | Charge réseau excessive | Compression `gzip` / `brotli` | 🟠 À tester |
| `PERF-05` | En-têtes de compression absents | Fichiers non compressés | Activation `gzip` sur le serveur | 🟠 À tester |
| `PERF-06` | Cache HTTP absent | Mauvaise gestion des fichiers statiques | Ajout de `Cache-Control` | 🟠 À tester |
| `PERF-07` | Sécurité insuffisante | Vulnérabilité aux attaques XSS | Ajout de `CSP`, `HSTS`, `X-Frame-Options` | 🟠 À tester |
| `PERF-08` | Absence de tests en production | Validation des optimisations | Test Lighthouse sur version déployée | 🟠 À tester |
| `PERF-09` | Scripts bloquants | Retarde l’affichage | `async` / `defer` sur les scripts | 🟠 À tester |
| `PERF-10` | Chaînes critiques trop longues | Temps de réponse élevé | Optimisation du TTFB | 🟠 À tester |
| `PERF-11` | Longs traitements du `main-thread` | Input lag | Optimisation des fonctions lourdes | 🟠 À tester |

### 2-4 Organisation des axes d’amélioration

Les axes d'améliorations de la performance du site distinguent la situation du code en phase de développement (avant le `build`) et du code de production (après le `build`). Les références utilisées sont définies dans le chapitre suivant.

#### 2-4.1. Corrections avant le build (Optimisation du code & des ressources)

✅ `PERF-01` **Ajout du `font-display: swap` pour éviter les retards de rendu des polices**.
✅ `PERF-02` **Définition explicite des dimensions des images pour réduire le layout shift (CLS)**.
✅ `PERF-03` **Minification des fichiers CSS et JS pour réduire leur taille**.
✅ `PERF-04` **Compression des ressources texte (`gzip`, `brotli`) pour optimiser la charge réseau**.

#### 2-4-2. Corrections après le build (Optimisation côté serveur & cache)

✅ `PERF-05` **Activation des en-têtes de compression (`gzip`, `brotli`) sur le serveur**.
✅ `PERF-06` **Mise en place d’un cache HTTP optimisé (`Cache-Control`, `Expires`)**.
✅ `PERF-07` **Ajout des en-têtes de sécurité (`CSP`, `HSTS`, `X-Frame-Options`)**.
✅ `PERF-08` **Test Lighthouse sur la version hébergée pour validation des optimisations**.

#### 2-4-3. Corrections indéterminées (avant ou après le build)

✅ `PERF-09` **Gestion des scripts bloquants (`async`, `defer`) pour accélérer le rendu**.
✅ `PERF-10` **Optimisation des chaînes de requêtes critiques pour améliorer le TTFB**.
✅ `PERF-11` **Réduction des tâches lourdes du `main-thread` identifiées dans Lighthouse**.

---

## 3- Mise en oeuvre des corrections d'amélioration de la performance

Les améliorations de la performance liées :

- au rendu des images et des polices (`PERF-01` et `PERF-02`)
- à la réduction du code JS par élimination des composantes inutiles et CSS (`PERF-03`),

ont conduit en phase de développement à constater évolution marginale (+1% à 4%) du score du test de performance Lighthouse sans impact sur les autres tests (SEO, accessibilité et best practices).

Il est apparu que l'essentiel de l'amélioration de la perfomrance pouvait résider dans des actions de minimisation du code. L'approche a donc consisté à construire une version de production et à la tester en l'état.

Pour tester le code de production, Lighthouse n'a pas pu mener les tests avec un serveur émulé en local. Pour contourner ce problème, le test de performance de Lighthouse a été fait sur la version hébergée sur un serveur **Alwaysdata** (cf. lien [documentation hébergement](./alwaysdata-deploiement.md)).

Le **score de 100% de performance** obtenu avec cette version de production a permis de confirmer que les option de construction du code de production (`build` du projet) est bien la principale démarche à mener pour améliorer l'index de performance du site.
Par ailleurs, avec cette version de production :

- le score **Best practices est de 81%** (dû aux API obsolètes relatives à l'incompatibilité des directives Sass3.0+ avec la version Bootstrap 5). Il peut revenir à 100% si l'on modifie la configuration de Angular en ajoutant un silence sur les dépréciation liées à Sass (choix : ne pas modifier la configuration de Angular).
- le score **SEO** et **accessibilité** **restent à 100%**.

Les correctins envisagées initialement de `PERF-04` à `PERF-11` n'ont donc pas été menées.

---

## 4- Conclusion et synthèse des corrections de performances du projet

Grâce aux optimisations mises en place, le projet répond désormais aux **standards de performance recommandés**.
Cette démarche d'amélioration nécessite de traiter avec le code de développement la fluidité des images et du rendu, mais aussi le code de production. C'est avec ce dernier que la minifisation du code améliore la performance.
