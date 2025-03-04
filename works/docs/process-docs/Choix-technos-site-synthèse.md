# Document d'analyse du choix technologique pour le site "Trouve-ton-Artisan"

## 1. Introduction

Ce document compare les technologies **React** et **Angular** pour le développement du site "Trouve-ton-Artisan". L’objectif est d’identifier la solution la plus adaptée en fonction des besoins du projet.

## 2. Objectif

Analyser les deux technologies sur :

- Leurs avantages et inconvénients.
- Leurs performances et facilité d'intégration.
- Les résultats permettant une décision éclairée et documentée.

## 3. Description du besoin

- Application **SPA responsive** (mobile first) pour mobile, tablette et ordinateur.
- Données chargées depuis un fichier JSON alimentant :
  - une page d'accueil,
  - une liste filtrée,
  - une fiche détaillée avec formulaire de contact,
  - une page d'erreur 404.
- Bibliothèques : **Bootstrap** (imposée) via CDN et **Font Awesome** (facultative).
- Contraintes : structure sécurisée et maintenable, espace d’hébergement limité (<1 Mo), technologies maîtrisées.

## 4. Analyse des technologies

### 4.1. React

- **Avantages** :
  - Léger et rapide, idéal pour les interfaces dynamiques.
  - Écosystème riche avec une vaste communauté.
  - Flexibilité grâce à l’approche modulaire et réutilisation des composants.
  - Poids réduit : bundle initial souvent autour de 100-150 Ko.
- **Inconvénients** :
  - Nécessite des outils supplémentaires (ex. Redux ou MobX) pour une gestion avancée de l'état.

### 4.2. Angular

- **Avantages** :
  - Framework complet offrant une structure robuste et intégrant TypeScript.
  - Gestion simplifiée des filtres grâce aux **pipes**, essentiel pour le projet.
  - Sécurité intégrée et évolutivité avec API future.
- **Inconvénients** :
  - Bundle initial plus lourd (500-600 Ko).
  - Courbe d’apprentissage plus élevée.

## 5. Comparaison des performances

- **React** : Plus performant pour des interfaces nécessitant des interactions dynamiques fréquentes (grâce au Virtual DOM).
- **Angular** : Mieux adapté aux applications complexes avec une architecture structurée.

## 6. Conclusion

**Angular** est privilégié pour ce projet grâce à :

- Sa structuration claire et son typage strict pour un code maintenable.
- Sa gestion efficace des filtres, élément central de ce projet.
- Sa sécurité et son évolutivité pour l’intégration future d’une API.

Bien que légèrement plus lourd que React, Angular répond aux exigences de qualité et de pérennité du projet.

---
