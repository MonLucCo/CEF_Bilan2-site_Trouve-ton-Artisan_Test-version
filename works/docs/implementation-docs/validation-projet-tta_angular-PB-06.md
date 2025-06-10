# Document : Fiche de correction PB-[06]

---

## Sommaire

[TOC]

---

## Introduction

Cette fiche décrit le problème PB-[06] et propose une solution complète pour sa correction.

## 1. Description du problème PB-[06]

### 1.1 Problème identifié

La **disposition du tableau des emails reçus de MailDev** dans l'outil de tests de l'application (accès par la signature en bas de page) n'est pas correctement alignée.  
Pour les écrans de petite taille, le rendu n'est pas adapté pour une bonne expérience utilisateur.
Le tableau ne présente pas le contenu des emails reçus de Maildev.
Cet outil n'est pas **Responsive Design Mobile-First**.

D'autre part, acune indication de version de l'application n'était présente (dans le Footer).

### 1.2 Impact observé

L’expérience utilisateur est mauvaise du fait d'une ergonomie inadaptée pour les petits écrans.

---

## 2. Solution de correction PB-[06]

### 2.1. Correction n°1 : uniformisation du tableau des emails

#### 2.1.1. Problème identifié

- Les colonnes du tableau ne sont pas en cohérence en largeur, entraînant un affichage déséquilibré.
- L'affichage des emails manque de flexibilité, ne permettant d'explorer facilement les détails.
- Le contenu de l'email n'est pas accessible.

#### 2.1.2. Solution proposée

- Garantir des colonnes homogènes en définissant des proportions de colonnes.
- Eviter les débordements du texte contenu dans la colonne
- Ajouter une colonne pour accéder au contenu de l'email.

#### 2.1.3. Code mis à jour

1. **Redimensionner l'image du logo et rendre fluide son chargement**

    Les corrections concernent :

    - `<table>` : ajouter la classe `table-fixed` pour fixer les dimensions du tableau (`table-layout`).
    - `style="..."` : définir les proportions des colonnes.
    - `text-truncate` : ajouter la classe Bootstrap pour éviter le débordement du texte.
    - ajouter une colonne dans `thead` et le `tbody` pour le contenu de l'email.

    ```html
    <table class="table table-striped table-fixed">
        <thead>
            <tr>
                <th style="width: 20%;">Expéditeur</th>
                <th style="width: 20%;">Destinataire</th>
                <th style="width: 30%;">Objet</th>
                <th style="width: 30%;">Contenu</th>
            </tr>
        </thead>
        <tbody>
            <tr *ngFor="let email of emails">
                <td style="width: 20%;" class="text-truncate">{{ email.from[0].address }}</td>
                <td style="width: 20%;" class="text-truncate">{{ email.to[0].address }}</td>
                <td style="width: 30%;" class="text-truncate">{{ email.subject }}</td>
                <td style="width: 30%;" class="text-truncate">{{ email.text }}</td>
            </tr>
        </tbody>
    </table>
    ```

2. **Mode Accordéon Bootstrap pour un affichage dynamique Mobile-First**

    Ajout de la possibilité de visualiser les emails sous la forme d'accordéons. A partir d'un bouton de bascule, chaque email peut être affiché sous la forme soit d'une ligne de tableau, soit d'un accordéon expansible.

    - `isAccordeonView` : variable d'état booléenne pour gérer l'état d'affichage des emails reçus.
    - exploitation de l'élément `accordeon` de Bootstrap dans `card-body`.
    - ajout d'un `form-switch` dans `card-header` pour basculer dynamiquement grâce à `[(ngModel)]="isAccordionView"`.

    ```html
    <div class="card">
        <div class="card-header">
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="toggleViewMode" [(ngModel)]="isAccordionView">
                <label class="form-check-label text-center" for="toggleViewMode">Mode Accordéon</label>
            </div>
        </div>
        <div class="card-body">
            <table *ngIf="!isAccordionView" class="table table-striped table-fixed">
                    <!-- ... -->
            </table>
    
            <!-- Mode Accordéon Bootstrap -->
            <div *ngIf="isAccordionView">
                <div class="accordion" id="emailAccordion">
                    <div *ngFor="let email of emails; let i = index" class="accordion-item">
                        <h6 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                [attr.data-bs-target]="'#email'+i">
                                <strong>{{ email.subject }}</strong> – <span>{{ email.from[0].address }}</span>
                            </button>
                        </h6>
                        <div [id]="'email'+i" class="accordion-collapse collapse">
                            <div class="accordion-body">
                                <p class="bg-secondary-subtle p-2"><strong>Expéditeur :</strong> {{ email.from[0].address }}</p>
                                <p class="bg-dark-subtle p-2"><strong>Destinataire :</strong> {{ email.to[0].address }}</p>
                                <p class="bg-success-subtle m-2 p-3">{{ email.text }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    ```

3. **Ajout de la version de l'applicatin dans le Footer**

    Ajout d'une indication de version, avec une taille réduite, pour un affichage discret dans `sign-block`. Alignement du texte `version-app` de la version avec la signature `sign-content`.

    ```html
    <div class="sign-block d-flex flex-wrap align-items-center justify-content-between">
        <p class="version-app text-dark-emphasis m-0" style="font-size: 0.6rem;">TTA v1.0.6</p>
        <button class="sign-content btn p-0 text-decoration-none text-dark" (click)="toggleToolAccess()"
            [attr.aria-expanded]="showTools">
            ⚡️ Propulsé par PerLucCo &copy; <span class="text-danger">&hearts;</span>
        </button>
    </div>
    ```

### 2.2. Résultat attendu

- **Cohérence des largeurs des colonnes** du tableau pour toutes les largeurs d'écran.
- **Commutation par switch** entre les modes **accordéon** et **tableau**.
- **expérience utilisateur** amélioré sur petit écran avec le mode **accordéon**.
- Affichage optimisé du texte de version de l'application.
- L'affichage est fluide et rapide (tests Lighthouse).

---

## 3. Test validation

### 3.1. Tests en développement

- Vérification de la cohérence des largeurs de colonne du tableau.
- Vérification de la commutation du modes d'affichage (tableau / accordéon) des emails.
- Vérification de l'affichage dynamique de l'accordéon de chaque email reçu.
- Vérification de l'affichage optimisé de la version dans le Footer.
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

La version est visible dans le Footer. La cohérence d'affichage est rendu en mode **tableau**. L'expérience utilisateur est améliorée avec le mode **Accordéon**.
Le fonctionnement est fluide et responsive mobile-first.
La fiche PB-06 est close.

✅ **Correction validée en production**

🚀 **Correction validée pour PB-06 !**

---
