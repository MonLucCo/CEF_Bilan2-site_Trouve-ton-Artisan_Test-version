# Document : Fiche de correction PB-[05]

---

## Sommaire

[TOC]

---

## Introduction

Cette fiche décrit le problème PB-[05] et propose une solution complète pour sa correction.

## 1. Description du problème PB-[05]

### 1.1 Problème identifié

Sur mobile, la **navbar** et le **logo** du **Header** ne sont pas correctement positionnés pour les écrans de taille inférieure à 450px.  
En dessous de **450px**, l’affichage se désaligne car ces éléments sont trop larges et n'évoluent pas en largeur.
Le Header n'est pas fixe en haut de l'écran.
L'alignement des contenus de page est décalé à droite. Cela concerne toutes les pages (Homepage, ArtisansPage, ContactPage et Error404page).

### 1.2 Impact observé

L’expérience utilisateur est mauvaise du fait d'une ergonomie inadaptée pour les très petits écrans.

---

## 2. Solution de correction PB-[05]

### 2.1. Correction n°1 : mettre en oeuvre un Responsive Design Mobile-First pour la SearchBar

#### 2.1.1. Problème identifié

- La largeur du **Header** doit être ajustée pour garantir **une seule ligne logo et menu** sur petis écrans.
- La **navbar** doit être fixée en haut de l'écran. Valable pour tous les écrans.
- Les marges des contenus des pages principales doivent être corrigées pour recentrer l'affichage. Valable pour toutes les pages, même si plus sensible sur les petits écrans.

#### 2.1.2. Solution proposée

- Redimensionner l'image du logo `navbar-brand` et rendre fluide le chargement de l'image.
- Fixer la `navbar` en haut de l'écran et ajuster le `margin-top` de son conteneur `app-navbar`.
- Corriger l'affichage responsive du Header avec les classes de flexibilité et de disposition Bootstrap.
- Corriger les marges latérales de conteneurs des pages (AppComponent, HomepageComponent, ArtisansPageComponent, ContactpageComponent et Error404PageComponent).

#### 2.1.3. Code mis à jour

1. **Redimensionner l'image du logo et rendre fluide son chargement**

    Les corrections concernent :

    - `<img>` : ajouter la classe `img-fluid` et son style d'adaptation des proportions.
    - `navbar-brand` : fixer la hauteur du conteneur de `<img>`.

    ```html
    <a class="navbar-brand" routerLink="/accueil"
        style="max-height: 60px;">
        <img class="logo img-fluid" src="images/logos/LogoTTA.svg" alt="Logo Trouve Ton Artisan" role="img"
            width="240" height="60" style="max-width: 100%; height: auto;">
    </a>
    ```

2. **Fixer `navbar` et ajuster le décalage de son conteneur**

    La fixation de la position de la **barre de navigation** en haut de l'écran avec la classe `fixed-top` de Bootstrap engendre un décalage du contenu car l'élément fixé est retiré normal du flux du document. Une compensation de la marge du conteneur de l'élément fixé doit être faite pour équilibrer l'espace laissé.

    - `fixed-top` : fixe l'élément `navbar-brand` défini avec un style d'une hauteur de 60px.
    - `margin-top` : compensation de l'élément fixé de `app-header`.

    ```html
    <header class="app-header" role="banner" style="margin-top: 60px;">
        <nav class="navbar navbar-expand-lg fixed-top" role="navigation">
            <div class="container">
                <a class="navbar-brand" routerLink="/accueil" style="max-height: 60px;">
                    <!-- ... -->
                </a>
                <!-- ... -->
            </div>
        </nav>
        <!-- ... -->
    </header> 
    ```

3. **Affichage responsive du Header**

    Le **responsive design mobile-first** se définit en complétant les classes avec les méthodes Bootstrap de disposition.

4. **Corriger les marges latérales de conteneurs des pages**

    Le désalignement est corrigé en modifiant la marge latérale à la valeur `mx-0` des conteneur principaux des pages. Il s'agissait d'une coquille qui indiquait `mx-3`.

### 2.2. Résultat attendu

- Barre de navigation fixée en haut de l'écran.
- Alignement et fluidité du Header pour les écrans de plus 330px.
- L'affichage est fluide et rapide (tests Lighthouse).

---

## 3. Test validation

### 3.1. Tests en développement

- Vérification du fonctionnement du header en responsive mobile first.
- Vérification de la fluidité de fonctionnement.
- Vérification des marges uniformes sur toutes les pages.
- Tests Lighthouse.

### 3.2. Tests en production

- Même tests que pour la phase de fonctionnement sur différents terminaux (mobile, tablette et desktop).

### 3.3. Tests Lighthouse

Les scores après correction sont présentés ci-dessous :

| Phase | Mobile Dev | Mobile Prod | Desktop Dev | Desktop Prod |
|-------|-----------|------------|------------|------------|
| Performance | [49]% | [97]% | [60]% | [100]% |
| Accessibilité | [100]% | [100]% | [100]% | [100]% |
| SEO | [100]% | [100]% | [100]% | [100]% |
| Best Practices | [100]% | [100]% | [100]% | [100]% |

---

## 4. Conclusion et suivi

Le composant Header maintient une disposition fluide pour tous les écrans à partir de 330px de large.
La fiche PB-05 est close.

✅ **Correction validée en production**

🚀 **Correction validée pour PB-05 !**

---
