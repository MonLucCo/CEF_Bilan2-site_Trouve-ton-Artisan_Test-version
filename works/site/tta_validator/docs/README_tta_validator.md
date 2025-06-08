# Documentation : projet `tta_validator` - Automatisation de la validation W3C pour un SPA

---

## 1.Sommaire

[TOC]

---

## 2.Introduction

🔹 `tta_validator` est une **application Node.js** qui permet de **valider automatiquement** les pages HTML et CSS d’un **SPA** en exécutant JavaScript avant validation.
🔹 Il utilise **Puppeteer** pour capturer le **DOM généré dynamiquement**, puis valide les fichiers avec les **services W3C**.
🔹 Les **résultats sont archivés** et peuvent être **consultés via une interface web interactive** avec options d’export **PDF/CSV**.
🔹 Une **version binaire (`pkg`)** permet d’exécuter `tta_validator` **sans nécessiter Node.js**.

---

## 3.Installation du projet

### 3.1.Prérequis

✅ **Node.js** (`>= 18.0.0`) → [Télécharger Node.js](https://nodejs.org/)  
✅ **PowerShell (`pwsh`) ou terminal Bash** → Pour exécuter les commandes  
✅ **Visual Studio Code (optionnel)** → Pour l’édition du code  

### 3.2.Commandes d’installation

```powershell
# 1️⃣ Cloner le projet (si partagé via GitHub)
git clone https://github.com/MonLucCo/tta_validator.git
cd tta_validator

# 2️⃣ Initialiser le projet
npm init -y

# 3️⃣ Modifier package.json (nom, auteur, description)
notepad package.json

# 4️⃣ Installer les dépendances
npm install puppeteer express pkg node-fetch pdfkit json2csv fs-extra

# 5️⃣ Créer l’arborescence du projet
mkdir config results src src/scripts src/utils src/api views public

# 6️⃣ Création des fichiers essentiels
New-Item -Path config/pages.json -ItemType File
New-Item -Path server.js -ItemType File
New-Item -Path views/index.html -ItemType File
New-Item -Path public/script.js -ItemType File
New-Item -Path src/scripts/extract_html_css.js -ItemType File
New-Item -Path src/scripts/validate_w3c.js -ItemType File
New-Item -Path src/scripts/export_results.js -ItemType File
New-Item -Path src/utils/fileHelper.js -ItemType File
New-Item -Path src/utils/formatHelper.js -ItemType File
New-Item -Path src/api/routes.js -ItemType File
New-Item -Path src/api/middleware.js -ItemType File
```

✅ **Projet installé avec une structure bien définie**

---

## 4.Exploitation en développement

### 4.1.Commandes pour tester en dev

```powershell
# Démarrer le serveur Express
npm start

# Extraire HTML et CSS des pages définies
npm run extract

# Valider les fichiers avec le W3C
npm run validate

# Tester l’affichage des résultats (ouvrir dans le navigateur)
Start-Process "http://localhost:3010"

# Tester l’export PDF
Start-Process "http://localhost:3010/export/pdf"

# Tester l’export CSV
Start-Process "http://localhost:3010/export/csv"
```

✅ **Interface web opérationnelle avec affichage interactif des erreurs W3C**

---

## 5.Création et utilisation du binaire `pkg`

### 5.1.Commandes pour générer l’exécutable

```powershell
# Installer pkg si non présent
npm install -g pkg

# Compiler le projet pour Windows, Linux et Mac
pkg server.js --targets win,linux,mac --output tta_validator_bin
```

### 5.2.Exploitation du binaire

✅ **Exécution sans dépendances Node.js**

```powershell
./tta_validator_bin
```

✅ **Les validations peuvent être réalisées sans installation préalable des dépendances**

---

## 6.Fonctionnalités et suivi du projet

### 6.1.Fonctionnalités clés

✅ **Définition des pages SPA à tester** (`config/pages.json`).  
✅ **Extraction automatique du HTML/CSS après exécution JavaScript** (`extract_html_css.js`).  
✅ **Validation W3C avec vérification des erreurs** (`validate_w3c.js`).  
✅ **Interface web pour consulter les résultats** (`index.html`, `server.js`).  
✅ **Export des validations en PDF et CSV** (`export_results.js`).  
✅ **Génération d’un exécutable `pkg` pour usage sans Node.js**.  

### 6.2.Optimisations et évolutions possibles

🔹 **Améliorer la gestion des erreurs** en affichant plus de détails dans l’interface web.
🔹 **Optimiser la compatibilité avec CI/CD** pour validation automatique après déploiement.
🔹 **Ajouter un suivi des logs** pour identifier les erreurs W3C les plus fréquentes.
🔹 **Prévoir une version API REST** pour intégrer `tta_validator` à d’autres outils.
🔹 **Prévoir module de suivi avancé des validations** pour optimiser la correction des erreurs !  

## 7.Références utiles pour `tta_validator`

Voici les sources d'inspiration du code de cette application

### 7.1.Références techniques

📌 **1️⃣ Puppeteer : Automatisation du navigateur Chrome**
🔹 **Documentation officielle** → [Puppeteer](https://pptr.dev/)
🔹 **Pourquoi c’est utile ?** → `tta_validator` utilise **Puppeteer** pour récupérer le **HTML et CSS après exécution de JavaScript**.

📌 **2️⃣ Validateurs W3C pour HTML et CSS**
🔹 **Validateur HTML** → [W3C Validator](https://validator.w3.org/)
🔹 **Validateur CSS** → [Jigsaw CSS Validator](https://jigsaw.w3.org/css-validator/)
🔹 **Pourquoi c’est utile ?** → `tta_validator` envoie les fichiers aux validateurs pour **vérifier leur conformité** aux normes W3C.

📌 **3️⃣ Express.js : Création du serveur backend**
🔹 **Documentation officielle** → [Express.js](https://expressjs.com/fr/)
🔹 **Pourquoi c’est utile ?** → `tta_validator` utilise **Express** pour **servir l’interface web et gérer les exports**.

📌 **4️⃣ PDFKit : Génération de PDF dynamiques**
🔹 **Documentation officielle** → [PDFKit](https://pdfkit.org/)
🔹 **Pourquoi c’est utile ?** → `tta_validator` crée des **rapports de validation** en PDF pour une consultation facile.

📌 **5️⃣ json2csv : Exportation de données en CSV**
🔹 **Documentation officielle** → [json2csv](https://www.npmjs.com/package/json2csv)
🔹 **Pourquoi c’est utile ?** → `tta_validator` convertit les **résultats des validations W3C** en fichiers CSV.

📌 **6️⃣ pkg : Génération d’un exécutable autonome**
🔹 **Documentation officielle** → [pkg](https://www.npmjs.com/package/pkg)
🔹 **Pourquoi c’est utile ?** → `tta_validator` peut être **compilé en binaire** pour une exécution sans Node.js.

📌 **7️⃣ Standards W3C et accessibilité**
🔹 **Vue d’ensemble des standards W3C** → [W3C Accessibility](https://www.w3.org/WAI/standards-guidelines/fr)
🔹 **Pourquoi c’est utile ?** → Assurer la conformité aux normes W3C et améliorer l’accessibilité des sites SPA.

📌 **8️⃣ Impact du W3C sur le référencement**
🔹 **Article sur la validation W3C et SEO** → [Validation W3C et référencement](https://jaetheme.com/sxo-seo-marketing/w3c-referencement/)
🔹 **Pourquoi c’est utile ?** → Comprendre l’impact des erreurs HTML/CSS sur le référencement et l’expérience utilisateur.

### 7.2.Meilleures pratiques pour optimiser la validation W3C

📌 **1️⃣ Écrire un code HTML et CSS propre et structuré**  
🔹 **Utiliser une indentation claire** → Facilite la lecture et la maintenance.  
🔹 **Éviter les erreurs de syntaxe** → Vérifier les balises non fermées et les attributs incorrects.  
🔹 **Respecter les normes HTML5 et CSS3** → Assurer la compatibilité avec les navigateurs modernes.  
🔹 **Référence utile** → [Guide W3C sur HTML et CSS](https://www.mindsetmedia.ca/post/what-is-w3c-validation-and-its-best-practices)  

📌 **2️⃣ Vérifier la conformité avec les validateurs W3C**  
🔹 **Utiliser le validateur HTML** → [W3C Validator](https://validator.w3.org/)  
🔹 **Utiliser le validateur CSS** → [Jigsaw CSS Validator](https://validator.w3.org/)  
🔹 **Corriger les erreurs détectées** → Adapter le code pour respecter les standards.  

📌 **3️⃣ Gérer les erreurs JavaScript et le rendu dynamique**  
🔹 **Problème** → Les validateurs W3C ne prennent pas en compte le JavaScript.  
🔹 **Solution** → Utiliser **Puppeteer** pour capturer le HTML après exécution.  
🔹 **Référence utile** → [Puppeteer](https://www.mindsetmedia.ca/post/what-is-w3c-validation-and-its-best-practices)  

📌 **4️⃣ Assurer la compatibilité multi-navigateurs et mobile**  
🔹 **Tester le rendu sur différents navigateurs** → Chrome, Firefox, Edge, Safari.  
🔹 **Utiliser des outils comme BrowserStack** → Vérifier la compatibilité mobile.  
🔹 **Référence utile** → [Norme W3C et compatibilité](https://www.agence-ep.com/norme-w3c-les-bonnes-pratiques-pour-developper-un-site-web/)  

📌 **5️⃣ Optimiser l’accessibilité et le SEO**  
🔹 **Respecter les normes WCAG** → Améliorer l’accessibilité pour tous les utilisateurs.  
🔹 **Optimiser les balises `<title>`, `<meta>` et `<alt>`** → Impact direct sur le référencement.  
🔹 **Référence utile** → [Impact du W3C sur le SEO](https://www.mindsetmedia.ca/post/what-is-w3c-validation-and-its-best-practices)  

📌 **6️⃣ Automatiser la validation avec un workflow CI/CD**  
🔹 **Intégrer `tta_validator` dans un pipeline GitHub Actions ou GitLab CI**.  
🔹 **Exécuter les tests à chaque mise à jour du code** → Éviter les erreurs en production.  
🔹 **Référence utile** → [Automatisation des tests W3C](https://bing.com/search?q=best+practices+validation+W3C+SPA)  

---
