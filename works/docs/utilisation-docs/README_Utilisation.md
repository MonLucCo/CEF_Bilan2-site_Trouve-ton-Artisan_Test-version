# Guide d'utilisation – Trouve Ton Artisan

---

- [Guide d'utilisation – Trouve Ton Artisan](#guide-dutilisation--trouve-ton-artisan)
  - [Version](#version)
  - [1-Introduction](#1-introduction)
  - [2-Installation du projet principal (TTA)](#2-installation-du-projet-principal-tta)
    - [2.1 - Récupération du dépôt](#21---récupération-du-dépôt)
    - [2.2 - Installation des dépendances](#22---installation-des-dépendances)
    - [2.3 - Lancement en mode développement](#23---lancement-en-mode-développement)
  - [3-Installation et configuration des sous-projets](#3-installation-et-configuration-des-sous-projets)
    - [3.1 - `TTA_MailDev` (Service d'envoi d'emails)](#31---tta_maildev-service-denvoi-demails)
    - [3.2 - `TTA_Validator` (Validation W3C automatique)](#32---tta_validator-validation-w3c-automatique)
  - [4-Organisation des services](#4-organisation-des-services)
    - [4.1 - Fonctionnement de TTA avec MailDev](#41---fonctionnement-de-tta-avec-maildev)
    - [4.2 - Fonctionnement de TTA\_Validator](#42---fonctionnement-de-tta_validator)
  - [5-Conclusion](#5-conclusion)

---

## Version

v1.0.6

---

## 1-Introduction

Ce document fournit les **instructions détaillées** pour **installer, configurer et utiliser** *Trouve Ton Artisan* ainsi que ses sous-projets associés (**TTA_MailDev** et **TTA_Validator**).

## 2-Installation du projet principal (TTA)

### 2.1 - Récupération du dépôt

```bash
git clone https://github.com/MonLucCo/CEF_Bilan2-site_Trouve-ton-Artisan_Test-version.git
cd CEF_Bilan2-site_Trouve-ton-Artisan_Test-version
```

### 2.2 - Installation des dépendances

```bash
cd works/site/tta_angular
npm install
```

### 2.3 - Lancement en mode développement

```bash
ng serve
```

📌 **Accès en local** : `http://localhost:4200`
📌 **Accès hébergé** : [https://perlucco.alwaysdata.net/trouve-ton-artisan/accueil](https://perlucco.alwaysdata.net/trouve-ton-artisan/accueil)

---

## 3-Installation et configuration des sous-projets

### 3.1 - `TTA_MailDev` (Service d'envoi d'emails)

📌 **Installation**

```bash
cd works/site/tta_maildev
npm install
```

📌 **Lancement du serveur en mode développement**

```bash
node server-smtp.js
```

📌 **Mode binaire (Windows/Linux)**

- Windows : `server-smtp.exe`
- Linux : `server-smtp-linux`

🔗 **Documentation complète :**
[Guide `tta_maildev`](https://github.com/MonLucCo/CEF_Bilan2-site_Trouve-ton-Artisan_Test-version/blob/main/works/site/tta_maildev/docs/README_tta_maildev.md)

---

### 3.2 - `TTA_Validator` (Validation W3C automatique)

📌 **Installation**

```bash
cd works/site/tta_validator
npm install
```

📌 **Configuration du fichier `pages.json`**

```bash
nano works/site/tta_validator/config/pages.json
```

📌 **Vider le dossier des résultats avant chaque validation**

```bash
rm -rf works/site/tta_validator/results
```

📌 **Lancement du serveur en mode développement**

```bash
npm start
```

📌 **Accès au serveur de validation** : `http://localhost:3010`

🔗 **Documentation complète :**
[Guide `tta_validator`](https://github.com/MonLucCo/CEF_Bilan2-site_Trouve-ton-Artisan_Test-version/blob/main/works/site/tta_validator/docs/README_tta_validator.md)

---

## 4-Organisation des services

### 4.1 - Fonctionnement de TTA avec MailDev

✔ **TTA** (`Angular` → Interface utilisateur)
📌 **Lancement en local** :

```bash
cd works/site/tta_angular
ng serve
```

📌 **Accès hébergé** :
🔗 [https://perlucco.alwaysdata.net/trouve-ton-artisan/accueil](https://perlucco.alwaysdata.net/trouve-ton-artisan/accueil)

✔ **TTA_MailDev** (`Node.js` → Service de messagerie)
📌 **Lancement en local** :

```bash
cd works/site/tta_maildev
node server-smtp.js
```

---

### 4.2 - Fonctionnement de TTA_Validator

✔ **Lancement du serveur**

```bash
cd works/site/tta_validator
npm start
```

✔ **Gestion des résultats**

📌 **Vider le dossier des résultats avant relancer les validations**

```bash
rm -rf works/site/tta_validator/results
npm start
```

---

## 5-Conclusion

Ce guide offre **toutes les étapes essentielles** pour **installer et utiliser le projet Trouve Ton Artisan** avec ses **modules complémentaires (`TTA_MailDev` et `TTA_Validator`)**. Les procédures décrites permettent **une mise en place efficace et rapide**.

📌 **Références GitHub pour accéder à l’ensemble des projets** :
🔗 [Vue globale des sous-projets](https://github.com/MonLucCo/CEF_Bilan2-site_Trouve-ton-Artisan_Test-version/blob/main/works/site/README_site.md)
