# Document : Fiche de correction PB-[04]

---

## Sommaire

[TOC]

---

## Introduction

Cette fiche décrit le problème PB-[04] et propose une solution complète pour sa correction.

## 1. Description du problème PB-[04]

### 1.1 Problème identifié

Sur mobile, le champ de saisie **se réduit anormalement** lorsque le bouton catégorie est visible.  
En dessous de **425px**, l’affichage du champ de saisie devient insuffisant.
Le **responsive design mobile-first** n'est pas mis en oeuvre pour l'affichage de la barre de recherche.

### 1.2 Impact observé

L’expérience utilisateur est mauvaise du fait d'une ergonomie inadaptée pour les petits écrans.

---

## 2. Solution de correction PB-[04]

### 2.1. Correction n°1 : mettre en oeuvre un Responsive Design Mobile-First pour la SearchBar

#### 2.1.1. Problème identifié

- L'affichage doit être **responsive design mobile-first**.
- L'affichage pour les très petits écrans (de 0px à 425px) doit être **en colonne** sur plusieurs lignes (bouton filtre catégorie, champ de saisie, boutons de commande de la recherche) et doit évoluer progressivement en une ligne lorsque l'écran s'élargit.
- Indépendamment de l'affichage du bouton de filtre catégorie, le **champ de saisie doit rester suffisamment large** en exploitant au maximum la largeur de l'écran.
- La **transition** de 3 lignes à une seule doit être **fluide** dans le passage entre les différentes dispositions d'écran pour une **bonne expérience** utilisateur (UX).

#### 2.1.2. Solution proposée

- renommer les classes des éléments majeurs du responsive design.
- regrouper les éléments en groupe adapté aux différentes transitions d'affichage.
- utiliser les classes Boostrap pour un rendu flexible.

#### 2.1.3. Code mis à jour

1. **Classes nommées des éléments majeurs de la SearchBar**

    L'identification par un nom de classe permet de gérer de manière logique chaque élément majeur du composant :

    - `filter-btn` : bouton de la catégorie sélectionnée.
    - `instant-input` : champ de saisie de la recherche en mode _instantanée de saisie_.
    - `validate-input` : champ de saisie de la recherche en mode _validation standard_.
    - `reset-btn` : bouton de réinitialisation du champ de saisie.
    - `search-btn` : bouton de lancement de la recherche (validation de la saisie).

    ```html
    <!-- Bouton lié à la catégorie sélectionnée avec Case à cocher pour activer/désactiver la catégorie -->
    <button class="filter-btn btn btn-secondary d-flex align-items-center gap-2" (click)="toggleCategory()"
        [disabled]="!isKeywordValid()" [attr.aria-label]="'Activer ou désactiver la catégorie ' + categoryMemory">
        <input type="checkbox" [checked]="categoryActive" id="categoryCheckbox">
        <label for="categoryCheckbox" class="visually-hidden">Coche de la catégorie {{ categoryMemory}}</label>
        <span>{{ categoryMemory }}</span>
    </button>
    
    <!-- Champ de recherche (selon le mode de recherche) -->
    <ng-container class="instant-input" *ngIf="modeOnRealTimeSearch; else validateSearch">
        <!-- Mode instantané -->
        <label for="instant-search-input" class="visually-hidden">Recherche instantanée d’un artisan</label>
        <input type="text" class="form-control" [placeholder]="placeholder" [(ngModel)]="keyword"
            (input)="onInputChange()" />
    </ng-container>
    <ng-template class="validate-input" #validateSearch>
        <!-- Mode avec validation -->
        <label for="validate-search-input" class="visually-hidden">Recherche d’un artisan</label>
        <input type="text" class="form-control" [placeholder]="placeholder" [(ngModel)]="keyword"
            (keyup.enter)="triggerSearch()" />
    </ng-template>
        
    <!-- Bouton reset -->
    <button class="reset-btn btn btn-outline-secondary" (click)="resetSearchField()"
        [disabled]="!isKeywordValid()" aria-label="Réinitialiser la recherche">
        <i class="fas fa-undo"></i> <!-- Icône de reset -->
    </button>
    
    <!-- Bouton de recherche -->
    <button class="search-btn btn btn-outline-primary" (click)="triggerSearch()"
        [disabled]="modeOnRealTimeSearch || !isKeywordValid()" aria-label="Lancer la recherche">
        <i class="fas fa-search"></i> <!-- Icône recherche (loupe) -->
    </button>
    ```

2. **Regroupement des éléments pour le rendu responsive**

    Le regroupement des éléments en conteneur des éléments majeurs de SearchBar permet d'agir sur le rendu de l'affichage sans intervenir sur le code fonctionnel. Les éléments du rendu flexible (responsive) sont :

    - `search-group` : le conteneur flexible du **composant SearchBar**.
    - `search-filter` : le conteneur flexible du **filtre de recherche** regroupant `filter-btn`.
    - `field-imput` : le conteneur flexible du **champ saisie de recherche** regroupant `instant-search` et `validate-search`.
    - `field-cmd` : le conteneur flexible des **commandes de saisie de recherche** regroupant `reset-btn` et `search-btn`.
    - `search-field` : le conteneur flexible de la **saisie de recherche** regroupant les conteneurs flexibles `field-imput` et `field-cmd`.

    ```html
    <div class="search-group">
        <div *ngIf="categoryMemory" class="search-filter">
            <button class="filter-btn"></button>
        </div>
    
        <div class="search-field">
            <div class="field-input">
                <!-- Champ de recherche (selon le mode de recherche) -->
                <ng-container class="instant-search"></ng-container>
                <ng-template class="validate-input"></ng-template>
            </div>
    
            <div class="field-cmd">
                <!-- Bouton reset -->
                <button class="reset-btn"></button>
                <!-- Bouton de recherche -->
                <button class="search-btn"></button>
            </div>
        </div>
    </div>
    ```

3. **Classes Bootstrap de rendu flexible**

    Le **responsive design mobile-first** se définit en complétant les classes avec les méthodes Bootstrap de disposition.

    ```html
    <div class="search-group d-flex flex-wrap flex-md-nowrap justify-content-center gap-3 gap-md-2">
        <div *ngIf="categoryMemory" class="search-filter d-flex justify-content-center"></div>
        
        <div class="search-field d-flex flex-column flex-sm-row w-100 align-items-center gap-2 gap-sm-1">
            <div class="field-input w-100"></div>
    
            <div class="field-cmd d-flex gap-1"></div>
        </div>
    </div>
    ```

### 2.2. Résultat attendu

- Les éléments principaux (`field-input` et `field-cmd`) du champ de recherche (`search-field`) sont affichés :
  - en colonne pour les écrans petits (inférieur à 576px - point de rupture 'sm' de Bootstrap).
  - en ligne pour les écrans moyens (inférieur à 768px - point de rupture 'md' de Bootstrap).
- Les éléments principaux (`search-filter` et `search-field`) de la SearchBar (`search-group`) sont affichés :
  - en colonne pour les écrans de mobile (inférieur à 768px).
  - en ligne pour les écrans plus large.
- Les transitions doivent donner une impression de fluidité entre les modes mobile, tablette et desktop.

---

## 3. Test validation

### 3.1. Tests en développement

- Vérification du fonctionnement d'ensemble en responsive mobile first.
- Vérification de la fluidité de fonctionnement.
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

Le composant SearchBar est en élément **responsive design mobile-first**.
La fiche PB-04 est close.

✅ **Correction validée en production**

🚀 **Correction validée pour PB-04 !**

---
