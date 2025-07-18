# Documentation – Implémentation et Configuration des Styles en Angular

---

- [Documentation – Implémentation et Configuration des Styles en Angular](#documentation--implémentation-et-configuration-des-styles-en-angular)
  - [1.Version](#1version)
  - [Introduction](#introduction)
  - [Configuration des styles dans `angular.json`](#configuration-des-styles-dans-angularjson)
    - [Objectif de la configuration dans `angular.json`](#objectif-de-la-configuration-dans-angularjson)
    - [Pourquoi cette configuration dans `angular.json` ?](#pourquoi-cette-configuration-dans-angularjson-)
  - [Code minimal optimisé de `index.html`](#code-minimal-optimisé-de-indexhtml)
    - [Code optimisé de `index.html`](#code-optimisé-de-indexhtml)
    - [Synthèse : pourquoi cette simplification ?](#synthèse--pourquoi-cette-simplification-)
  - [Centralisation des styles dans `styles.scss`](#centralisation-des-styles-dans-stylesscss)
    - [Code optimisé de `styles.scss`](#code-optimisé-de-stylesscss)
    - [Synthèse : pourquoi cette approche ?](#synthèse--pourquoi-cette-approche-)
  - [Personnalisation complète via `custom-bootstrap.scss`\*\*](#personnalisation-complète-via-custom-bootstrapscss)
    - [Code optimisé de `custom-bootstrap.scss`](#code-optimisé-de-custom-bootstrapscss)
    - [Pourquoi cette personnalisation avec `@use` ?](#pourquoi-cette-personnalisation-avec-use-)
    - [Pourquoi utiliser `@import`plutôt que `@use` ?](#pourquoi-utiliser-importplutôt-que-use-)
    - [Synthèse : limitations de Bootstrap v5 avec Sass v3.0+](#synthèse--limitations-de-bootstrap-v5-avec-sass-v30)
    - [Solution appliquée : Retour à `@import` pour la personnalisation des couleurs](#solution-appliquée--retour-à-import-pour-la-personnalisation-des-couleurs)
  - [Références documentaires](#références-documentaires)

---

## 1.Version

v1.0.6

---

## Introduction

Cette documentation explique **comment configurer et organiser les styles** dans le projet Angular TTA en exploitant **Bootstrap** et **FontAwesome**, tout en **centralisant la personnalisation** via `styles.scss` et `custom-bootstrap.scss`.  

Elle reprend les étapes clés qui ont permis d’obtenir **une configuration optimisée et sans erreurs**.

---

## Configuration des styles dans `angular.json`

### Objectif de la configuration dans `angular.json`

- Définir les fichiers `styles.scss` et `custom-bootstrap.scss` comme styles globaux.  
- Gérer l'import des polices et ressources nécessaires.  

👉 **Section `build/options` optimisée dans `angular.json` :**

```json
"options": {
  "outputPath": "dist/tta_angular",
  "index": "src/index.html",
  "browser": "src/main.ts",
  "polyfills": ["zone.js"],
  "tsConfig": "tsconfig.app.json",
  "inlineStyleLanguage": "scss",
  "assets": [
    { "glob": "**/*", "input": "public" },
    { "glob": "**/*", "input": "public/datas", "output": "/datas" },
    { "glob": "**/*", "input": "src/seo", "output": "/seo" },
    { "glob": "**/*", "input": "src/app/assets/styles", "output": "/styles" },
    { "glob": "**/*", "input": "src/app/assets/fonts/Graphik Family", "output": "/fonts/graphik" },
    { "glob": "**/*", "input": "src/app/assets/fonts/fontawesome/css", "output": "/fonts/fontawesome/css" },
    { "glob": "**/*", "input": "src/app/assets/fonts/fontawesome/webfonts", "output": "/fonts/fontawesome/webfonts" }
  ],
  "styles": [
    "src/styles.scss",
    "src/app/assets/fonts/fontawesome/css/all.min.css",
    "src/app/assets/styles/custom-bootstrap.scss"
  ],
  "scripts": []
}
```

### Pourquoi cette configuration dans `angular.json` ?

✔️ **Centralisation des styles SCSS** pour un projet plus structuré.  
✔️ **Gestion propre des `assets`** (polices, icônes, styles CSS).  
✔️ **Les styles sont appliqués automatiquement à l'ensemble du projet** sans les inclure dans `index.html`.  

---

## Code minimal optimisé de `index.html`

L'objectif de la minimalisation du code de `index.html` est d'exploiter la gestion des styles automatisée d'Angular en supprimant les références aux styles redondantes et inutiles, puisque Angular les gère via `angular.json`.  

### Code optimisé de `index.html`

```html
<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <title>Trouve Ton Artisan | Plateforme de formation en développement web</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">

  <!-- 🔹 Chargement dynamique des métadonnées SEO et Schema.org -->
  <script type="text/javascript" src="/seo/meta-og.js" defer></script>
  <script type="text/javascript" src="/seo/seo-loader.js" defer></script>
</head>

<body>
  <app-root></app-root>
</body>
</html>
```

### Synthèse : pourquoi cette simplification ?

- **Les styles sont déjà pris en compte via `styles.scss`** → Pas besoin de `link` supplémentaire.  
- **Réduction du poids de `index.html`**, rendant la structure plus claire.  

---

## Centralisation des styles dans `styles.scss`

L'objectif de la centralisation des styles dans `styles.scss` :  

- **Importer Bootstrap et FontAwesome de manière automatique** via Angular.  
- **Éviter les références inutiles dans `index.html`**.  

### Code optimisé de `styles.scss`

```scss
// Font Awesome (installation locale)
@use "./app/assets/fonts/fontawesome/css/all.min.css";

// Bootstrap (installation et personnalisation locale)
@use "./app/assets/styles/custom-bootstrap.scss";
```

### Synthèse : pourquoi cette approche ?

- **Utilisation de `@use` au lieu de `@import`**, conformément aux nouvelles règles Sass.
- **Automatisation du chargement des styles via Angular**, sans `index.html`.
- **Permet de centraliser tous les styles et personnalisations en un seul fichier.**

---

## Personnalisation complète via `custom-bootstrap.scss`**

Cette personnalisation permet de :

- **Modifier les couleurs et les typographies directement dans Bootstrap** pour éviter de dupliquer des styles.  
- **Remplacer les anciennes fonctions Sass (`darken()`) par `color-adjust()`.**  

### Code optimisé de `custom-bootstrap.scss`

```scss
// Import de Bootstrap SCSS (node_modules)
@use "bootstrap/scss/bootstrap" as *;

// 📌 Déclaration des polices Graphik
@font-face {
    font-family: 'Graphik';
    src: url('/fonts/graphik/Graphik-Regular-Trial.otf') format('opentype');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'Graphik';
    src: url('/fonts/graphik/Graphik-Bold-Trial.otf') format('opentype');
    font-weight: bold;
    font-style: normal;
}

// 📌 Variables couleurs et polices Bootstrap
$font-family-base: 'Graphik', sans-serif;

$primary: #0074c7;
$secondary: #00497c;
$light: #f1f8fc;
$dark: #384050;
$danger: #cd2c2e;
$success: #82b864;

$theme-colors: (
    "primary": $primary,
    "secondary": $secondary,
    "light": $light,
    "dark": $dark,
    "danger": $danger,
    "success": $success
);

// 📌 Personnalisation des typographies
html, body, p {
    font-family: $font-family-base;
}

h1, h2, h3, h4, h5, h6 {
    font-family: $font-family-base;
    font-weight: bold;
}

// 📌 Personnalisation des boutons Bootstrap
.btn-primary {
    background-color: $primary;
    color: white;

    &:hover {
        background-color: color-adjust($primary, -10%);
    }
}

.btn-danger {
    background-color: $danger;
    color: white;

    &:hover {
        background-color: color-adjust($danger, -10%);
    }
}
```

### Pourquoi cette personnalisation avec `@use` ?

- **Intégration propre des couleurs et typographies** dans `$theme-colors`.
- **Utilisation de `@use` au lieu de `@import`**, selon les recommandations Sass.
- **Migration vers `color-adjust()`** au lieu de `darken()`, évitant les warnings Sass.

### Pourquoi utiliser `@import`plutôt que `@use` ?

L'intégration de `@use` dans `custom-bootstrap.scss` **ne permet pas de modifier `$theme-colors`** de **Bootstrap**. En effet, les **variables Bootstrap** sont isolées dans des _namesspaces_, empêchant leur surcharge après importation. La solution `@import` reste fonctionnelle pour modifier `$theme-colors`, bien que Sass le déprécie pour préparer la version Sass3.0+.

### Synthèse : limitations de Bootstrap v5 avec Sass v3.0+

**Bootstrap v5 n'est pas encore totalement compatible avec Sass v3.0+**. La transition vers `@use` et `@forward` n'est pas complètement mise en place dans Bootstrap. Les modifications des variables globales ne fonctionnent pas bien avec `@use`, ce qui oblige à conserver `@import`.

Des références documentaires sur ce sujet sont disponibles dans le chapitre documentaire.
**Pour éviter ces limitations, il est recommandé de continuer à utiliser `@import` jusqu'à la sortie de Bootstrap 6.**

### Solution appliquée : Retour à `@import` pour la personnalisation des couleurs

- **Avec `@import`, les variables sont chargées globalement et peuvent être modifiées après coup.**  
- **Avec `@use`, Sass isole les modules, ce qui empêche de modifier `$theme-colors` après son importation.**.

**Modification dans `custom-bootstrap.scss`**

```scss
// Importation des variables Bootstrap AVANT les couleurs personnalisées
@import "bootstrap/scss/functions";
@import "bootstrap/scss/variables";

// Définition des couleurs personnalisées
$primary: #0074c7;
$secondary: #00497c;
$light: #f1f8fc;
$dark: #384050;
$danger: #cd2c2e;
$success: #82b864;

$theme-colors: (
    "primary": $primary,
    "secondary": $secondary,
    "light": $light,
    "dark": $dark,
    "danger": $danger,
    "success": $success
);

// Importation de Bootstrap après modification des couleurs
@import "bootstrap/scss/bootstrap";
```

---

## Références documentaires

**Liens utiles pour l’implémentation des styles :**

- [Bootstrap Docs](https://getbootstrap.com/docs/5.0/getting-started/) – Documentation officielle Bootstrap.
- [Sass Migration Guide](https://sass-lang.com/d/import) – Explication de `@import` → `@use`.  
- [Angular CLI Configuration](https://angular.io/guide/workspace-config) – Gestion des styles via `angular.json`.  

**Liens pour la problématique sur Sass et Bootstrap 5 :**

- [Stack Overflow - Bootstrap 5 et Sass @use](https://stackoverflow.com/questions/70474960/bootstrap-5-doesnt-work-with-sass-use-and-forward) : Discussion sur les problèmes rencontrés avec `@use` et `@forward` dans Bootstrap 5.  
- [Blog officiel de Bootstrap 5.3](https://getbootstrap.com/docs/5.3/customize/sass/#file-structure) : Mentionne en avertissement des avertissements liées à Node Sass, mais pas encore une transition complète vers `@use`.  
- [Guide de migration vers Bootstrap v5](https://getbootstrap.com/docs/5.0/migration/) : Explication des changements et des limitations actuelles de Sass dans Bootstrap.  
