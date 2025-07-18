# Document : validation du projet `tta_angular`

---

- [Document : validation du projet `tta_angular`](#document--validation-du-projet-tta_angular)
  - [Version](#version)
  - [Introduction](#introduction)
  - [1- Organisation de la validation](#1--organisation-de-la-validation)
    - [1-1. Tableau des problèmes à corriger et état d’avancement](#1-1-tableau-des-problèmes-à-corriger-et-état-davancement)
    - [1-2. Méthodologie de validation](#1-2-méthodologie-de-validation)
  - [2- Détails des fiches de correction](#2--détails-des-fiches-de-correction)
    - [2-1. Fiche de correction PB-01 : Accès aux données (`datas.json`)](#2-1-fiche-de-correction-pb-01--accès-aux-données-datasjson)
    - [2-2. Fiche de correction PB-02 : Accès aux polices (`Graphik`)](#2-2-fiche-de-correction-pb-02--accès-aux-polices-graphik)
    - [2-3. Fiche de correction PB-03 : Désactiver l'accès à l'email de la fiche de contact](#2-3-fiche-de-correction-pb-03--désactiver-laccès-à-lemail-de-la-fiche-de-contact)
    - [2-4. Fiche de correction PB-04 : Responsivité de la `SearchBar` sur mobile](#2-4-fiche-de-correction-pb-04--responsivité-de-la-searchbar-sur-mobile)
    - [2-5. Fiche de correction PB-05 : Disposition du header sur mobile (`< 450px`)](#2-5-fiche-de-correction-pb-05--disposition-du-header-sur-mobile--450px)
    - [2-6. Fiche de correction PB-06 : Rendu du tableau `MailDev` dans le footer](#2-6-fiche-de-correction-pb-06--rendu-du-tableau-maildev-dans-le-footer)
    - [2-7. Fiche de correction PB-07 : Déploiement du backend `MailDev` pour test avec Mobile](#2-7-fiche-de-correction-pb-07--déploiement-du-backend-maildev-pour-test-avec-mobile)
    - [2-8. Fiche de correction PB-08 : Suppression des logs Angular en production](#2-8-fiche-de-correction-pb-08--suppression-des-logs-angular-en-production)
    - [2-9. Fiche de correction PB-09 : configuration de l'application par fichier](#2-9-fiche-de-correction-pb-09--configuration-de-lapplication-par-fichier)
    - [2-10. Fiche de correction PB-09 : \[libellé du problème\]](#2-10-fiche-de-correction-pb-09--libellé-du-problème)

---

## Version

v1.0.6

---

## Introduction

Ce document centralise le suivi des corrections du projet `tta_angular`, avec une validation détaillée et un contrôle de l'impact sur **Lighthouse**.

---

## 1- Organisation de la validation  

### 1-1. Tableau des problèmes à corriger et état d’avancement

| Réf Fiche | Problème identifié | État correction | Date validation | Score LH impact |
|-----------|--------------------|-----------------|-----------------|-----------------|
| **[PB-01](#2-1-fiche-de-correction-pb-01--accès-aux-données-datasjson)** | Accès aux données (`datas.json`) | ✅ Corrigé | 04/06/2025 au 05/06/2025 | ✅ Pas d'impact |
| **[PB-02](#2-2-fiche-de-correction-pb-02--accès-aux-polices-graphik)** | Accès aux polices `Graphik` | ✅ Corrigé | 05/06/2025 | ✅ Pas d'impact |
| **[PB-03](#2-3-fiche-de-correction-pb-03--désactiver-laccès-à-lemail-de-la-fiche-de-contact)** | Affichage de l’e-mail en fiche contact (non cliquable) | ✅ Corrigé | 05/06/2025 | ✅ Pas d'impact |
| **[PB-04](#2-4-fiche-de-correction-pb-04--responsivité-de-la-searchbar-sur-mobile)** | Responsivité de la `SearchBar` sur mobile | ✅ Corrigé | 06/06/2025 | ✅ Pas d'impact |
| **[PB-05](#2-5-fiche-de-correction-pb-05--disposition-du-header-sur-mobile--450px)** | Disposition du header sur mobile (`< 450px`) | ✅ Corrigé | 06/06/2025 | ✅ Pas d'impact |
| **[PB-06](#2-6-fiche-de-correction-pb-06--rendu-du-tableau-maildev-dans-le-footer)** | Rendu du tableau `MailDev` dans le footer | ✅ Corrigé | 07/06/2025 | 🚧 À vérifier |
| **[PB-07](#2-7-fiche-de-correction-pb-07--déploiement-du-backend-maildev-pour-test-avec-mobile)** | Déploiement du backend `MailDev` pour test avec Mobile | 🔄 En cours | 07/06/2025 | 🚧 À vérifier |
| **[PB-08](#2-8-fiche-de-correction-pb-08--suppression-des-logs-angular-en-production)** | Suppression des logs Angular en production | 🔄 En cours | 07/06/2025 au [date] | 🚧 À vérifier |
| **[PB-09](#2-9-fiche-de-correction-pb-09--configuration-de-lapplication-par-fichier)** | configurer l'application `tta_angular` par fichiers JSON | ⏳ À faire - 🔄 En cours | — | 🚧 À vérifier |
| **[PB-10](#2-10-fiche-de-correction-pb-09--libellé-du-problème)** | [libellé du problème] | ⏳ À faire - 🔄 En cours | — | 🚧 À vérifier |

### 1-2. Méthodologie de validation

Chaque correction suit le processus suivant :

1. **Identification** du problème et impact sur le projet.
2. Proposition de **solution** et mise en œuvre **technique**.
3. **Test** en environnement **développement** et **production**.
4. **Vérification** du score **Lighthouse** et impact sur les performances.

---

## 2- Détails des fiches de correction

### 2-1. Fiche de correction PB-01 : Accès aux données (`datas.json`)

- Problème : l'accès aux données `datas.json` de l'application est en erreur.
- Synthèse : problème de codage de l'adresse URL et de paramétrage de l'application.
- Accès : [fiche de correction](./validation-projet-tta_angular-PB-01.md).
- Etat : close.
- Dates : du 4 juin 2025 au 5 juin 2025.

### 2-2. Fiche de correction PB-02 : Accès aux polices (`Graphik`)

- Problème : l'accès aux polices `Graphik` de l'application est en erreur.
- Synthèse : problème résolu dans la **correction n°4 de PB-01**.
- Accès : [fiche de correction](./validation-projet-tta_angular-PB-01.md).
- Etat : close.
- Dates : le 5 juin 2025.

### 2-3. Fiche de correction PB-03 : Désactiver l'accès à l'email de la fiche de contact

- Problème : éviter la création d'un message en dehors de la plateforme en informant l'utilisateur et en le redirigeant vers le formulaire de contact.
- Synthèse : suppression de l'ouverture du client de messagerie, information de l'utilisateur et redirection vers le formulaire de contact.
- Accès : [fiche de correction](./validation-projet-tta_angular-PB-03.md).
- Etat : close.
- Dates : le 5 juin 2025.

### 2-4. Fiche de correction PB-04 : Responsivité de la `SearchBar` sur mobile

- Problème : l'affichage du champ de saisie de la recherche est insuffisant pour les petits écrans.
- Synthèse : mise en oeuvre de l'affichage flexible en **responsive design mobile-first** du composant SearchBar pour corriger le problème.
- Accès : [fiche de correction](./validation-projet-tta_angular-PB-04.md).
- Etat : close.
- Dates : le 6 juin 2025.

### 2-5. Fiche de correction PB-05 : Disposition du header sur mobile (`< 450px`)

- Problème : l'affichage du menu de navigation et du logo est incorrect pour les petits écrans.
- Synthèse : affichage correcte pour écrans supérieur à 330px et menu fixé en haut de l'écran.
- Accès : [fiche de correction](./validation-projet-tta_angular-PB-05.md).
- Etat : close.
- Dates : le 6 juin 2025.

### 2-6. Fiche de correction PB-06 : Rendu du tableau `MailDev` dans le footer

- Problème : incohérence des colonnes du tableau des emails reçu par MailDev, pas de version de l'application.
- Synthèse : affichage cohérent du tableau, amélioration de lUX pour les petits écrans avec un affichage par **Accordéon**, affichage dans le Footer de la version de l'application.
- Accès : [fiche de correction](./validation-projet-tta_angular-PB-06.md).
- Etat : à faire.
- Dates : le 7 juin 2025.

### 2-7. Fiche de correction PB-07 : Déploiement du backend `MailDev` pour test avec Mobile

- Problème : pas d'accès au serveur MailDev pour les mobiles utilisant tta_angular déployé.
- Synthèse : une analyse conduit à reporter le traitement de ce problème.
- Accès : [fiche de correction](./validation-projet-tta_angular-PB-07_analyse.md).
- Etat : en cours.
- Dates : du 7 juin 2025 au [date].

### 2-8. Fiche de correction PB-08 : Suppression des logs Angular en production

- Problème : [description succincte du problème à traiter].
- Synthèse : [description succincte de la conclusion].
- Accès : [fiche de correction](./validation-projet-tta_angular-PB-Exemple.md).
- Etat : à faire.
- Dates : du [date] au [date].

### 2-9. Fiche de correction PB-09 : configuration de l'application par fichier

- Problème : [description succincte du problème à traiter].
- Synthèse : [description succincte de la conclusion].
- Accès : [fiche de correction](./validation-projet-tta_angular-PB-Exemple.md).
- Etat : à définir.
- Dates : du [date] au [date].

### 2-10. Fiche de correction PB-09 : [libellé du problème]

- Problème : [description succincte du problème à traiter].
- Synthèse : [description succincte de la conclusion].
- Accès : [fiche de correction](./validation-projet-tta_angular-PB-Exemple.md).
- Etat : à définir.
- Dates : du [date] au [date].
