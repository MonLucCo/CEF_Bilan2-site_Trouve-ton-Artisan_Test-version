# **Documentation – Remplacement des CDN de Bootstrap (BS) et FontAwesome (FA)**

---

- [**Documentation – Remplacement des CDN de Bootstrap (BS) et FontAwesome (FA)**](#documentation--remplacement-des-cdn-de-bootstrap-bs-et-fontawesome-fa)
  - [Version](#version)
  - [Introduction](#introduction)
  - [Installation de Bootstrap et FontAwesome via `npm`](#installation-de-bootstrap-et-fontawesome-via-npm)
    - [Commandes à exécuter dans le terminal](#commandes-à-exécuter-dans-le-terminal)
  - [Déplacement des fichiers vers `app/assets/`](#déplacement-des-fichiers-vers-appassets)
    - [Structure après déplacement](#structure-après-déplacement)
    - [Copie des fichiers depuis `node_modules`](#copie-des-fichiers-depuis-node_modules)
  - [Modification de `angular.json`](#modification-de-angularjson)
    - [Modifications dans `angular.json`](#modifications-dans-angularjson)
  - [Mise à jour de `index.html`](#mise-à-jour-de-indexhtml)
    - [Version initiale du fichier `index.html` (avec CDN)](#version-initiale-du-fichier-indexhtml-avec-cdn)
    - [Version mise à jour du fichier `index.html` (avec fichiers locaux)](#version-mise-à-jour-du-fichier-indexhtml-avec-fichiers-locaux)
  - [Pourquoi éviter les CDN en production ?](#pourquoi-éviter-les-cdn-en-production-)
  - [Références](#références)

---

## Version

v1.0.6

---

## Introduction

Lors du développement, les CDN sont une solution pratique pour accéder rapidement aux dernières versions de **Bootstrap** et **FontAwesome**. Cependant, en production, une **intégration locale** améliore la stabilité et les performances du projet.

**Cette documentation décrit comment installer Bootstrap et FontAwesome localement**, supprimant les dépendances aux CDN.

**Avantages :**

- Meilleure autonomie du projet.  
- Suppression des appels externes.  
- Optimisation du chargement des ressources.
- Contrôle totale des versions utilisées.

---

## Installation de Bootstrap et FontAwesome via `npm`

L'**installation avec `npm` est recommandée pour Angular**, évitant les téléchargements manuels.

### Commandes à exécuter dans le terminal

```sh
npm install bootstrap @fortawesome/fontawesome-free
```

🚀 **Les fichiers sont installés dans `node_modules/`.**

---

## Déplacement des fichiers vers `app/assets/`

L'objectif est de regrouper les ressources statiques dans `app/assets/`.

### Structure après déplacement

``` txt
/src/app/assets/
 ├── styles/                    ✅ Fichiers Bootstrap
 │   ├── bootstrap.min.css      
 │   ├── custom-bootstrap.scss  
 │   ├── bootstrap.bundle.min.js 
 ├── fonts/                      ✅ Polices et icônes
 │   ├── fontawesome/
 │   │   ├── css/all.min.css
 │   │   ├── webfonts/
```

### Copie des fichiers depuis `node_modules`

```sh
cp node_modules/bootstrap/dist/css/bootstrap.min.css src/app/assets/styles/
cp node_modules/bootstrap/dist/js/bootstrap.bundle.min.js src/app/assets/styles/
cp node_modules/@fortawesome/fontawesome-free/css/all.min.css src/app/assets/fonts/fontawesome/css/
cp -r node_modules/@fortawesome/fontawesome-free/webfonts/ src/app/assets/fonts/fontawesome/
```

---

## Modification de `angular.json`

L'objectif est d'ajouter des styles et scripts aux `assets` pour qu’Angular les serve.

### Modifications dans `angular.json`

```json
"assets": [
  {
    "glob": "**/*",
    "input": "public"
  },
  {
    "glob": "**/*",
    "input": "public/datas",
    "output": "/datas"
  },
  {
    "glob": "**/*",
    "input": "src/seo",
    "output": "/seo"
  },
  {
    "glob": "**/*",
    "input": "src/app/assets/fonts/fontawesome/webfonts",
    "output": "/fonts/fontawesome/webfonts"
  },
  {
    "glob": "**/*",
    "input": "src/app/assets/fonts/Graphik Family",
    "output": "/fonts/graphik"
  }
],
"styles": [
  "src/app/assets/fonts/fontawesome/css/all.min.css",
  "src/app/assets/styles/bootstrap.min.css",
  "src/app/assets/styles/custom-bootstrap.scss"
],
"scripts": [
  "src/app/assets/styles/bootstrap.bundle.min.js"
]
```

---

## Mise à jour de `index.html`

**Avant la modification `index.html` utilisait les CDN** pour charger Bootstrap et FontAwesome.

### Version initiale du fichier `index.html` (avec CDN)

```html
<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <title>Trouve Ton Artisan | Plateforme de formation en développement web</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">

  <!-- Chargement dynamique des métadonnées SEO et Schema.org -->
  <script type="text/javascript" src="/seo/meta-og.js" defer></script>
  <script type="text/javascript" src="/seo/seo-loader.js" defer></script>

  <!-- 🔹 Font Awesome via CDN -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
    integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg=="
    crossorigin="anonymous" referrerpolicy="no-referrer" />

  <!-- Bootstrap via CDN -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-SgOJa3DmI69IUzQ2PVdRZhwQ+dy64/BUtbMJw1MZ8t5HZApcHrRKUc4W0kG879m7" crossorigin="anonymous">
  <!-- personnalisation de la palette dans Bootstrap -->
  <link href="styles/custom-bootstrap.scss" rel="stylesheet">
</head>

<body>
  <app-root></app-root>

  <!-- Chargement dynamique des scripts Bootstrap via CDN -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-k6d4wzSIapyDyv1kpU366/PK5hCdSbCRGRCMv+eplOQJWyd1fbcAu9OCUj5zNLiq"
    crossorigin="anonymous"></script>

</body>
</html>
```

### Version mise à jour du fichier `index.html` (avec fichiers locaux)

```html
<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <title>Trouve Ton Artisan | Plateforme de formation en développement web</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">

  <!-- Chargement dynamique des métadonnées SEO et Schema.org -->
  <script type="text/javascript" src="/seo/meta-og.js" defer></script>
  <script type="text/javascript" src="/seo/seo-loader.js" defer></script>

  <!-- 🔹 FontAwesome (installation locale) -->
  <link rel="stylesheet" href="/fonts/fontawesome/css/all.min.css">

  <!-- 🔹 Bootstrap (installation locale) -->
  <link rel="stylesheet" href="/styles/bootstrap.min.css">
  <link rel="stylesheet" href="/styles/custom-bootstrap.scss">
</head>

<body>
  <app-root></app-root>

  <!-- 🔹 Chargement dynamique des scripts Bootstrap -->
  <script src="/styles/bootstrap.bundle.min.js"></script>

</body>
</html>
```

🚀 **Finalisation : Redémarrer Angular avec**

```sh
ng serve
```

## Pourquoi éviter les CDN en production ?

- **Variabilité des performances** selon les fournisseurs.
- **Risque de rupture** si le CDN devient indisponible.
- **Dépendance externe** supprimée pour un projet autonome.
- **Meilleure optimisation** des ressources chargées localement.

---

## Références

- [Bootstrap Documentation](https://getbootstrap.com/) – Guide officiel  
- [FontAwesome Documentation](https://fontawesome.com/) – Guide officiel  
- [Angular Assets Configuration](https://angular.io/guide/workspace-config) – Gestion des `assets`  
