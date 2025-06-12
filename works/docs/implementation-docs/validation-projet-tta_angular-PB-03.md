# Document : Fiche de correction PB-[03]

---

- [Document : Fiche de correction PB-\[03\]](#document--fiche-de-correction-pb-03)
  - [Version](#version)
  - [Introduction](#introduction)
  - [1. Description du problème PB-\[03\]](#1-description-du-problème-pb-03)
    - [1.1 Problème identifié](#11-problème-identifié)
    - [1.2 Impact observé](#12-impact-observé)
  - [2. Solution de correction PB-\[03\]](#2-solution-de-correction-pb-03)
    - [2.1. Correction n°1 : Désactivation du lien email et affichage d'un message d'information](#21-correction-n1--désactivation-du-lien-email-et-affichage-dun-message-dinformation)
      - [2.1.1. Problème identifié](#211-problème-identifié)
      - [2.1.2. Solution proposée](#212-solution-proposée)
      - [2.1.3. Code mis à jour](#213-code-mis-à-jour)
    - [2.2. Résultat attendu](#22-résultat-attendu)
  - [3. Test validation](#3-test-validation)
    - [3.1. Tests en développement](#31-tests-en-développement)
    - [3.2. Tests en production](#32-tests-en-production)
    - [3.3. Tests Lighthouse](#33-tests-lighthouse)
  - [4. Conclusion et suivi](#4-conclusion-et-suivi)

---

## Version

v1.0.6

---

## Introduction

Cette fiche décrit le problème PB-[03] et propose une solution complète pour sa correction.

## 1. Description du problème PB-[03]

### 1.1 Problème identifié

Actuellement, le lien email dans la fiche artisan **ouvre le client mail** via `mailto:`, ce qui permet à l’utilisateur de contacter directement l’artisan sans passer par le formulaire de contact.
Cela pose un **problème de traçabilité des échanges** et empêche la plateforme de modérer ou d’enregistrer les demandes.  
La solution doit **désactiver le `mailto:` tout en laissant le lien actif**, afin que l’utilisateur soit informé qu’il doit utiliser le formulaire.  

### 1.2 Impact observé

L’utilisateur doit obligatoirement passer par le formulaire, garantissant un suivi des échanges avec l’artisan.

---

## 2. Solution de correction PB-[03]

### 2.1. Correction n°1 : Désactivation du lien email et affichage d'un message d'information

#### 2.1.1. Problème identifié

- ouverture du client de messagerie (lien avec `mailto:`) lors du clic sur l'adresse email.
- pas de message d'information à l'utilisateur pour rediriger l'utilisateur.
- pas de redirection de l'utilisateur vers le formulaire de contact.

#### 2.1.2. Solution proposée

- supprimer la commande `mailto:` associé au lien email
- créer et gérer un message pour informer l'utilisateur d'exploiter le formulaire de contact.
- créer une gestion d'événement pour mettre le focus sur le premier champ du formulaire de contact.
- créer une méthode pour mettre le focus sur le premier champ du formulaire de contact.

#### 2.1.3. Code mis à jour

1. **Mise à jour du template `contact-artisan.component.html`**  

    ```html
    <p class="card-text" *ngIf="isEmailValid">
        <strong>E-mail : </strong>
        <a href="#" class="link-primary" (click)="showContactInfo($event)">
            {{ contact.email }}
        </a>
    </p>
    <p class="card-text text-danger" *ngIf="!isEmailValid">
        Adresse email incorrecte : contact par email impossible !
    </p>
    
    <!-- Message d'information -->
    <div *ngIf="emailInfoVisible" class="alert alert-info mt-2">
        <strong>⚠️ Information :</strong> Veuillez utiliser le formulaire de contact pour contacter cet artisan.
        <button class="btn btn-sm btn-secondary mt-2" (click)="closeInfoAndFocus()">Ok</button>
    </div>
    ```

2. **Mise à jour du fichier `contact-artisan.component.ts`**  

    ```typescript
    import { Component, EventEmitter, Output } from '@angular/core';
    
    @Component({
      selector: 'app-contact-artisan',
      templateUrl: './contact-artisan.component.html',
      styleUrls: ['./contact-artisan.component.scss']
    })
    export class ContactArtisanComponent {
      emailInfoVisible = false;
    
      @Output() requestFocus = new EventEmitter<string>();
    
      showContactInfo(event: Event): void {
        event.preventDefault(); // Empêcher l'ouverture du mailto
        this.emailInfoVisible = true;
      }
    
      closeInfoAndFocus(): void {
        this.emailInfoVisible = false;
        this.requestFocus.emit('focusOnName'); // Notifier ContactPageComponent
      }
    }
    ```

3. **Mise à jour du fichier `contact-page.component.ts`**  

    ```typescript
    import { Component, ViewChild } from '@angular/core';
    import { ContactFormComponent } from '../contact-form/contact-form.component';
    
    @Component({
      selector: 'app-contact-page',
      templateUrl: './contact-page.component.html',
      styleUrls: ['./contact-page.component.scss']
    })
    export class ContactPageComponent {
      @ViewChild(ContactFormComponent, { static: false }) contactForm!: ContactFormComponent;
    
      focusOnNameField(eventName: string): void {
        console.log(`Événement reçu : ${eventName}`);
        setTimeout(() => {
          this.contactForm?.setFocusOnName();
        }, 100);
      }
    }
    ```

4. **Ajout de l’écoute de l’événement dans `contact-page.component.html`**  

    ```html
    <app-contact-artisan 
      *ngIf="selectedContact" 
      [contact]="selectedContact" 
      (requestFocus)="focusOnNameField($event)">
    </app-contact-artisan>
    ```

5. **Modification de `contact-form.component.ts` pour ajouter une méthode de focus**  

    ```typescript
    import { Component, ElementRef, ViewChild } from '@angular/core';
    
    @Component({
      selector: 'app-contact-form',
      templateUrl: './contact-form.component.html',
      styleUrls: ['./contact-form.component.scss']
    })
    export class ContactFormComponent {
      @ViewChild('contactFormName', { static: false }) nameField!: ElementRef;
    
      setFocusOnName(): void {
        setTimeout(() => {
          this.nameField?.nativeElement.focus();
        }, 100);
      }
    }
    ```

6. **Ajout d’un identifiant au champ "Nom" dans `contact-form.component.html`**  

    ```html
    <input 
        id="name" 
        #contactFormName 
        type="text" 
        formControlName="name" 
        class="form-control" 
        placeholder="Entrez votre nom" 
    />
    ```

### 2.2. Résultat attendu

- Le **lien email** est affiché mais ne lance plus `mailto:`.
- Au clic du lien email, un **message d'information** est affiché.
- À la fermeture du message, le **focus est placé directement sur le champ `name` du formulaire.**
- L’expérience utilisateur est fluide et intuitive.

---

## 3. Test validation

### 3.1. Tests en développement

- Le message d'information s'affiche lors du clic sur le lien email.
- Le premier champ du formulaire prend le focus lorsque l'utilisateur clic sur le bouton du message d'information
- Pas de message d'erreur dans la console.
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

La fiche PB-01 est close.

✅ **Correction validée en production**

🚀 **Correction validée pour PB-01 !**

---
