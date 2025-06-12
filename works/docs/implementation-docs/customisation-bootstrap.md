# Documentation – Intégration et Customisation de Bootstrap (BS)

---

- [Documentation – Intégration et Customisation de Bootstrap (BS)](#documentation--intégration-et-customisation-de-bootstrap-bs)
  - [Version](#version)
  - [Introduction](#introduction)
  - [Pré-requis : Installation de Bootstrap dans Angular](#pré-requis--installation-de-bootstrap-dans-angular)
  - [Personnalisation de Bootstrap (Identité du projet)](#personnalisation-de-bootstrap-identité-du-projet)
    - [Configuration du fichier `custom-bootstrap.scss`](#configuration-du-fichier-custom-bootstrapscss)
  - [Approches d’Intégration de Bootstrap (CSS \& JS)](#approches-dintégration-de-bootstrap-css--js)
    - [Approche 1️⃣ : Recopie locale de Bootstrap](#approche-1️⃣--recopie-locale-de-bootstrap)
    - [Approche 2️⃣ : Exploitation directe de `node_modules`](#approche-2️⃣--exploitation-directe-de-node_modules)
  - [Pourquoi choisir `node_modules` plutôt que la recopie locale ?](#pourquoi-choisir-node_modules-plutôt-que-la-recopie-locale-)
    - [Avantages de l’approche `node_modules`](#avantages-de-lapproche-node_modules)
    - [Synthèse des approches d'intégration de Bootstrap](#synthèse-des-approches-dintégration-de-bootstrap)
  - [Références documentaires](#références-documentaires)

---

## Version

v1.0.6

---

## Introduction

Cette documentation explique **comment intégrer Bootstrap** dans un projet Angular tout en **adaptant son identité graphique** (palette de couleurs et police Graphik).  

Elle présente **les deux approches d’intégration de Bootstrap** :

- **Recopie locale** de fichiers Bootstrap (bundle JS et CSS Bootstrap).  
- **Exploitation directe de `node_modules`** pour éviter la duplication des fichiers.

📌 **Finalement, l’approche basée sur `node_modules` est retenue pour optimiser le projet.**  

---

## Pré-requis : Installation de Bootstrap dans Angular

Bootstrap **doit être installé via `npm`** avant toute configuration. L'emploi de Bootstrap nécessite d'utiliser _SCSS_, car la personnalisation des couleurs et des styles repose sur les variables SCSS de Bootstrap (activation de `inLineStyleLanguage: "scss" dans angular.json`).

**Commandes à exécuter dans le terminal :**

```sh
npm install bootstrap
```

🚀 **Cette commande installe les fichiers Bootstrap dans `node_modules/bootstrap/`, y compris les SCSS et les scripts JS.**  

---

## Personnalisation de Bootstrap (Identité du projet)

**Objectif :**

- Modifier la police et les couleurs pour refléter l’identité graphique du projet.
- Ajoutez ces personnalisations dans `src/app/assets/styles/custom-bootstrap.scss`.

### Configuration du fichier `custom-bootstrap.scss`

**Déclaration de la police Graphik :**

```scss
@font-face {
    font-family: 'Graphik';
    src: url('/fonts/Graphik Family/Graphik-Regular-Trial.otf') format('opentype');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'Graphik';
    src: url('/fonts/Graphik Family/Graphik-Bold-Trial.otf') format('opentype');
    font-weight: bold;
    font-style: normal;
}

$font-family-base: 'Graphik', sans-serif;
```

🚀 **Bootstrap utilisera désormais Graphik comme police principale.**  

**Personnalisation de la palette de couleurs :**

```scss
$primary: #0074c7;
$secondary: #00497c;
$light: #f1f8fc;
$dark: #384050;

$danger: #cd2c2e; // Accentuation rouge
$success: #82b864; // Accentuation verte

$body-color: #000; // Couleur du texte
$body-bg: #ffffff; // Fond blanc

$theme-colors: (
    "primary": $primary,
    "secondary": $secondary,
    "light": $light,
    "dark": $dark,
    "danger": $danger,
    "success": $success
);
```

👉 **Importation et recompilation de Bootstrap :**

```scss
@import "bootstrap/scss/bootstrap"; // Recompile Bootstrap avec les nouvelles couleurs
```

🚀 **Bootstrap est maintenant complètement personnalisé pour le projet !**

---

## Approches d’Intégration de Bootstrap (CSS & JS)

Deux méthodes existent pour intégrer Bootstrap dans Angular.

### Approche 1️⃣ : Recopie locale de Bootstrap

- Dans cette méthode, les fichiers Bootstrap sont copiés dans `app/assets/`.

- **Étapes :**
  - Copie des fichiers Bootstrap CSS & JS

    ```sh
    cp node_modules/bootstrap/dist/css/bootstrap.min.css src/app/assets/styles/
    cp node_modules/bootstrap/dist/js/bootstrap.bundle.min.js src/app/assets/styles/
    ```
  
  - Ajout dans `angular.json` :

    ```json
    "styles": [
      "src/app/assets/styles/bootstrap.min.css",
      "src/app/assets/styles/custom-bootstrap.scss"
    ],
    "scripts": [
      "src/app/assets/styles/bootstrap.bundle.min.js"
    ]
    ```

  - Ajout du script dans `index.html` :

    ```html
    <script src="/styles/bootstrap.bundle.min.js"></script>
    ```

- **Problèmes de cette approche :**
  - **Duplication inutile** des fichiers déjà présents dans `node_modules`.  
  - **Manque d’optimisation** : Le script est chargé globalement, même si certaines parties du projet ne nécessitent pas Bootstrap JS.  

---

### Approche 2️⃣ : Exploitation directe de `node_modules`

- Dans cette méthode, Bootstrap est utilisé directement depuis `node_modules`, sans recopie locale.
- **Ajout de Bootstrap JS dans `main.ts`**
  - Code à ajouter dans `src/main.ts` :

    ```typescript
    import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
    import { AppModule } from './app/app.module';
    
    // Intégration de Bootstrap
    import 'bootstrap/dist/js/bootstrap.bundle.min.js';
    
    platformBrowserDynamic().bootstrapModule(AppModule, {
        ngZoneEventCoalescing: true,
    })
        .catch(err => console.error(err));
    ```

- **Ajout de Bootstrap SCSS dans `angular.json`**  
  - Ajoutez uniquement le fichier SCSS personnalisé :**

    ```json
    "styles": [
      "src/app/assets/styles/custom-bootstrap.scss"
    ]
    ```

- **Ajout dans `index.html`**  
  - Les références statiques ne sont plus nécessaires.

    ```html
    <head>
      <link rel="stylesheet" href="/styles/custom-bootstrap.scss">
    </head>
    ```

🚀 **Cette approche supprime la duplication des fichiers et optimise le projet !**

---

## Pourquoi choisir `node_modules` plutôt que la recopie locale ?

### Avantages de l’approche `node_modules`

- **Évite la duplication des fichiers JS et CSS** : Plus léger et plus rapide.  
- **Optimisation par Angular** : _Tree shaking_ ne conserve que les fichiers nécessaires.  
- **Séparation claire entre Angular et les bibliothèques externes**.  
- **Facilité de mise à jour** : Bootstrap peut être mis à jour via `npm` sans manipulation supplémentaire.

### Synthèse des approches d'intégration de Bootstrap

| Approche | Avantages | Inconvénients |
|----------|------------|---------------|
| **Recopie locale** | Autonomie complète | Duplication des fichiers, surcharges inutiles |
| **Utilisation de `node_modules`** | Optimisé, sans duplication | Nécessite de gérer `main.ts` et `angular.json` |

🚀 **Utiliser `node_modules` pour éviter la recopie locale !**  

---

## Références documentaires

- [Bootstrap Documentation](https://getbootstrap.com/) – Guide officiel.  
- [Angular Workspace Configuration](https://angular.io/guide/workspace-config) – Gestion des `assets` dans `angular.json`.  
- [FontAwesome Documentation](https://fontawesome.com/) – Intégration et personnalisation des icônes.  
