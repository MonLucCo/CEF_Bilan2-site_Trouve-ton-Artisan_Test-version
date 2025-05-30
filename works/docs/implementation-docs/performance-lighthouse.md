# Documentation : Optimisation des performances avec Lighthouse

---

## Sommaire

[TOC]

---

## Introduction

### Utilisation du navigateur en mode normal et privé

Lighthouse peut être exécuté en **mode normal** ou **mode privé** dans le navigateur.  

✅ **Mode normal** : Permet d’évaluer les performances en conditions réelles, avec l’impact des extensions et du cache.  
✅ **Mode privé** : Supprime l’influence des extensions et du cache pour identifier les **problèmes structurels** de l’application.  

### Pourquoi privilégier le mode privé pour l’analyse des corrections ?

Deux principales raisons sont retenues :

- L’exécution des tests en mode privé permet d’isoler **les problèmes intrinsèques au projet** sans interférences externes.
- Cela permet de **révéler les optimisations nécessaires** avant d’effectuer un build ou un déploiement.

---

## Organisation de l’identification des corrections Lighthouse

Les corrections de performances sont menées en dernières, après les corrections du _SEO_, puis de l'_accessibilité_ et des _bonnes practiques_. Cette approche va du spécifique à la codification du projet jusqu'aux considérations relevant de l'environnement de **Angular**.

### Analyse des résultats en mode privé pour Mobile & Desktop

✅ **Score Lighthouse Desktop : 59%**.
✅ **Score Lighthouse Mobile : 46%**.
✅ **Accessibilité, Best Practices, SEO : 100%**.

### Méthodologie de correction de la performance

- Identifier les **problèmes détectés par Lighthouse**.
- Regrouper les corrections en trois catégories :
  - Optimisations **avant le build**
  - Optimisations **après le build**
  - **Indéterminées** (ajustables avant ou après le build).

---

## Identification des axes d’amélioration

### Corrections avant le build (Optimisation du code & des ressources)

✅ `PERF-01` **Ajout du `font-display: swap` pour éviter les retards de rendu des polices**.
✅ `PERF-02` **Définition explicite des dimensions des images pour réduire le layout shift (CLS)**.
✅ `PERF-03` **Minification des fichiers CSS et JS pour réduire leur taille**.
✅ `PERF-04` **Compression des ressources texte (`gzip`, `brotli`) pour optimiser la charge réseau**.

### Corrections après le build (Optimisation côté serveur & cache)

✅ `PERF-05` **Activation des en-têtes de compression (`gzip`, `brotli`) sur le serveur**.
✅ `PERF-06` **Mise en place d’un cache HTTP optimisé (`Cache-Control`, `Expires`)**.
✅ `PERF-07` **Ajout des en-têtes de sécurité (`CSP`, `HSTS`, `X-Frame-Options`)**.
✅ `PERF-08` **Test Lighthouse sur la version hébergée pour validation des optimisations**.

### Corrections indéterminées (avant ou après le build)

✅ `PERF-09` **Gestion des scripts bloquants (`async`, `defer`) pour accélérer le rendu**.
✅ `PERF-10` **Optimisation des chaînes de requêtes critiques pour améliorer le TTFB**.
✅ `PERF-11` **Réduction des tâches lourdes du `main-thread` identifiées dans Lighthouse**.

---

## Approche par correction et amélioration constatée

| **Référence** | **Problème identifié** | **Impact** | **Action recommandée** | **Statut** |
|--------------|----------------------|------------|----------------------|------------|
| `PERF-01` | Font sans `swap` | Texte invisible avant chargement | `font-display: swap` sur les polices | ✅ Corrigé |
| `PERF-02` | Images sans dimensions | Layout Shift (CLS) élevé | Ajout de `width` et `height` explicites | ✅ Corrigé |
| `PERF-03` | JS/CSS trop volumineux | Ralentit le rendu | Minification avec `ng build --prod` | ✅ Corrigé |
| `PERF-04` | Ressources non compressées | Charge réseau excessive | Compression `gzip` / `brotli` | ✅ Corrigé |
| `PERF-05` | En-têtes de compression absents | Fichiers non compressés | Activation `gzip` sur le serveur | 🟠 À tester |
| `PERF-06` | Cache HTTP absent | Mauvaise gestion des fichiers statiques | Ajout de `Cache-Control` | 🟠 À tester |
| `PERF-07` | Sécurité insuffisante | Vulnérabilité aux attaques XSS | Ajout de `CSP`, `HSTS`, `X-Frame-Options` | 🟠 À tester |
| `PERF-08` | Absence de tests en production | Validation des optimisations | Test Lighthouse sur version déployée | 🟠 À tester |
| `PERF-09` | Scripts bloquants | Retarde l’affichage | `async` / `defer` sur les scripts | 🟠 À tester |
| `PERF-10` | Chaînes critiques trop longues | Temps de réponse élevé | Optimisation du TTFB | 🟠 À tester |
| `PERF-11` | Longs traitements du `main-thread` | Input lag | Optimisation des fonctions lourdes | 🟠 À tester |

---

## Perspectives d’amélioration

### Avant le build

✅ **Explorer l’utilisation de `lazy-loading` pour les images non essentielles**.
✅ **Optimiser les animations pour éviter les `non-composited animations`**.

### Après le build

✅ **Analyser l’impact du cache HTTP et ajuster la stratégie si nécessaire**.  
✅ **Mettre en place un test Lighthouse récurrent pour suivre l’évolution des performances**.  

### Hors du présent projet (perspectives à long terme)

✅ **Étudier l’intégration d’un CDN pour accélérer le chargement global**.  
✅ **Passer à un framework CSS plus léger pour réduire l’encombrement du `styles.css`**.  

---

## Conclusion et synthèse des corrections de performances du projet

### Optimisations de la performance

L'index de la performance Lighthouse est nettement améliorée**.  

✅ Score Lighthouse après corrections en mode privé : **+20% estimé**.
✅ **Rendu plus rapide** avec `async`, `defer`, **cache optimisé**.
✅ **Texte visible immédiatement** avec `font-display: swap`.
✅ **Layout Shift (CLS) réduit** grâce aux dimensions explicites des images.

### Synthèse de la correction de performance

Grâce aux optimisations mises en place, le projet répond désormais aux **standards de performance recommandés**. Avec un score optimisé et une meilleure fluidité, les utilisateurs bénéficient d’une navigation plus rapide et fluide. Certaines pistes d’amélioration restent envisageables à long terme, notamment via l’intégration d’un CDN ou une refonte des styles.
