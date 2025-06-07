# Document : Fiche de correction PB-[06]

---

## Sommaire

[TOC]

---

## 1. Introduction

Cette fiche explicative vise à structurer la réflexion autour de l'utilisation de `tta_Angular` en production avec des terminaux mobiles et tablettes.
Elle analyse les différentes approches pour **le déploiement de `tta_MailDev`**, et conclut sur la **configuration retenue** en fonction des contraintes techniques et fonctionnelles.

---

## 2. Démarche discutée

### 2.1. Problématique initiale

🔹 `tta_Angular` doit être accessible sur **différents terminaux**, incluant les **mobiles et tablettes**.
🔹 Le backend `tta_MailDev` sert à **tester et gérer les emails**, mais il est actuellement **utilisé uniquement en local sous forme de binaire**.
🔹 Les mobiles et tablettes **ne peuvent pas exécuter le binaire**, ce qui entraîne une impasse pour le mailing.

### 2.2. Options envisagées

1️⃣ **Déploiement de `tta_MailDev` sur AlwaysData** pour le rendre accessible en ligne.  
2️⃣ **Maintien du binaire `tta_MailDev` en local** pour une utilisation sur desktop.  
3️⃣ **Simulation des mobiles/tablettes dans le navigateur** pour contourner l’absence d’un backend sur ces terminaux.  

---

## 3. Choix de privilégier un déploiement Node.js sur AlwaysData

### 3.1. Pourquoi éviter le binaire sur AlwaysData ?

🔹 **AlwaysData prend en charge Node.js nativement**, évitant la complexité liée à un exécutable.  
🔹 **Le serveur Node.js permet plus de flexibilité**, notamment pour les mises à jour et l’intégration avec `tta_Angular`.  
🔹 **Gestion simplifiée des dépendances** → Aucun besoin de manipuler un fichier binaire `pkg`.  
🔹 **Accès centralisé aux emails** → Les terminaux mobiles et tablettes pourront communiquer avec `tta_MailDev` sans restriction.  

### 3.2. Avantages du serveur Node.js sur AlwaysData

✅ Déploiement simplifié et compatible avec **le fonctionnement de MailDev**.
✅ **Facilité de maintenance et de mise à jour** du backend.
✅ **Meilleure intégration avec `tta_Angular`**, facilitant les tests et l’utilisation des emails.

### 3.3. Décision

**Déploiement sur AlwaysData est préférable à long terme** pour assurer une compatibilité avec tous les terminaux.

---

## 4. Impasse pour le mailing MailDev sur mobiles et tablettes

### 4.1. Pourquoi un problème se pose ?

🔹 **Les mobiles et tablettes ne peuvent pas exécuter `tta_MailDev` en local** car il repose sur un binaire `pkg`.  
🔹 **Sans backend accessible**, `tta_Angular` sur mobile ne peut pas afficher ou interagir avec les emails capturés.  
🔹 **Solution immédiate** → Simuler les mobiles/tablettes dans le navigateur pour garantir une expérience utilisateur proche d’un terminal réel.  

### 4.2. Options explorées

✅ **Déploiement distant sur AlwaysData** → Permettrait aux mobiles de récupérer les emails via API.
✅ **Utilisation d’un proxy local** pour simuler `tta_MailDev` sur les mobiles, mais non viable à long terme.

### 4.3. Décision

**Reporter le déploiement sur AlwaysData** jusqu’à ce que la nécessité soit confirmée.

---

## 5. Configuration retenue pour `tta_Angular` en dev et prod

### 5.1. Développement (`tta_Angular` et `tta_MailDev` en local)

🔹 **Le binaire `tta_MailDev` est utilisé comme backend** en local.
🔹 **Les tests se font sur desktop**, avec possibilité de simuler un affichage mobile.
🔹 **Les développeurs peuvent tester les emails sans dépendre d’un serveur distant**.

### 5.2. Production (`tta_Angular` avec simulation mobile)

🔹 **Maintien du binaire `tta_MailDev` pour desktop** et test sur navigateur.
🔹 **Simulation des mobiles et tablettes dans le navigateur** pour éviter les problèmes liés au mailing.
🔹 **Si besoin, déploiement futur de `tta_MailDev` sur AlwaysData** pour un accès distant aux emails.

### 5.3. Conclusion

**Configuration stable et sans modification majeure** tant que le besoin d’un serveur AlwaysData n’est pas confirmé.

---

## 6. Suivi et évolutions possibles

✅ **Évaluation continue du besoin de déploiement sur AlwaysData**.
✅ **Test d’autres solutions backend si nécessaire** pour éviter une dépendance au binaire `pkg`.
✅ **Amélioration progressive de `tta_MailDev`** pour anticiper une migration future vers un backend full Node.js.

---
