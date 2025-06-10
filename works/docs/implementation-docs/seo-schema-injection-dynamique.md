# **Documentation – SEO Dynamique du Projet Trouve Ton Artisan**

---

## Sommaire

[TOC]

---

## **Préambule**  

La documentation du SEO est réalisée en deux parties documentaires car l'analyse et le codage ont dû être revus pour obtenir une qualité optimale du SEO.

Ainsi ce document constitue la **Première version du SEO – Injection Dynamique**.

La seconde partie concerne la version finale ([injection statique par un service SEO](./seo-schema-injection-statique.md)) de l'intégration du SEO dans le projet.

---

## Objectifs du **SEO Dynamique**

### La mise en place d’un **SEO dynamique**

Le SEO dynamique permet d'adapter les _paramètres du SEO_ sans modifier le code, garantissant une meilleure visibilité du site sur Google et les réseaux sociaux (**Open Graph – OG**). Grâce aux fichiers JSON, l'optimisation SEO devient flexible et évolutive.  

Les _paramètres du SEO_ concernent :

- **l’indexation sur Google** en adaptant les métadonnées à chaque page.  
- **le partage sur les réseaux sociaux** grâce aux balises OG.  
- **les données structurées `Schema.org`** (du site et des artisans référencés), améliorant la compréhension du contenu pour Google.  

### Utilisation des **données structurées `Schema.org`**

- **Site global** (`site-schema.json`) : Optimisation du référencement du projet.  
- **Artisans** (`artisan-schema.json`) : Amélioration du référencement des profils d’artisans.  

🚀 **Exemples de données structurées** : Dans le dossier `/seo/schema-examples` un exemple est disponible pour le modèle de structure adaptée au référencement d'un artisan (structure JSON ou Txt) ainsi qu'une application à quelques données d'artisans fournies.

---

## Organisation du SEO Dynamique

Le projet configure à partir du fichier `index.html` le SEO en injectant des scripts dans le `<head>` de l'application. L'injection des scripts est réalisée avec une commande `defer` pour permettre un chargement en parallèle du script.
Le code des scripts liés au SEO utilise **un chargement asynchrone** des paramètres du SEO pour éviter les blocages et optimiser la rapidité du site :

- **Chargement via `seo-loader.js`**, qui injecte dynamiquement les `<meta>` et les données `Schema.org`.  
- **Centralisation des métadonnées dans `seo-config.json`**, permettant des modifications simples.  
- **Adaptation des balises Open Graph (`meta-og.js`)** pour améliorer la visibilité sur les réseaux sociaux.  
- **Injection dynamique des `Schema.org` via `seo-loader.js`**, facilitant l'indexation de Google.  

**Scripts liés au SEO** :

- `/seo/meta-og.js` → Gestion des balises Open Graph.  
- `/seo/seo-loader.js` → Chargement dynamique des métadonnées et `Schema.org`.  

---

## Fichiers **JSON Modifiables**

Tous les paramètres SEO sont **centralisés** dans des fichiers JSON situés dans `/public/datas/`.

**Fichiers JSON importants** :

| **Fichier** | **Rôle** |
|-------------|---------|
| `seo-config.json` | Métadonnées `<meta>` pour Google (title, description, keywords, robots). |
| `site-schema.json` | Données `Schema.org` pour la plateforme TTA. |
| `artisan-schema.json` | Données `Schema.org` pour les artisans (catégories, notes). |

🚀 **Modification rapide** : Ces fichiers peuvent être mis à jour sans modifier le code JavaScript.

---

## Organisation de `robots.txt`

Le fichier `robots.txt` définit **les accès aux moteurs de recherche**.  

**Raisons des exclusions** :

- **Exclusion de `/datas/` et `/images/`** : Ces dossiers contiennent des fichiers JSON et des images **qui ne doivent pas être indexés**.  
- **Blocage des pages dynamiques `/contact/` et `/recherche/`** : Ces pages n'ont pas de contenu SEO pertinent.  
- **Exclusion temporaire de `/legal/`** : Ces pages sont _en construction_, mais pourront avoir un contenu pertinent lors de leur développement opérationnel. C'est pourquoi **les pages en construction ne sont pas incluses** dans `sitemap.xml` et un mécanisme dynamique empêche leur indexation via le fichier `robots.txt` et le composant Angular `app-construction`.

**Configuration actuelle de `robots.txt`** :

```TXT
User-agent: *
Disallow: /datas/
Disallow: /images/
Disallow: /contact/
Disallow: /recherche/
Allow: /
Sitemap: https://www.trouve-ton-artisan.com/sitemap.xml
```

---

## Organisation de `sitemap.xml`

Pour définir les pages référencées, toutes les routes possibles de l'application (Single Page Application) ont été identifiées. Deux types de page ont été identifiées :

1. les _pages fixes_ dans leurs adressage (les routes principales)
2. les _pages calculées_ à partir d'un identifiant des données (identifiant de l'artisan ou critère de recherche).

Les _pages calculées_, bien que pertinentes, n'ont pas été retenues pour être indiquées dans le fichier `sitemap.xml`. Ce point pourra être complété ultérieurement par une construction dynamique qui calcule chaque adresse en fonction des données fournies pour les artisans.

Certaines _pages fixes_ n'ont pas été retenues. Il s'agit des _pages en construction_.

### Pourquoi exclure les pages en construction ?

- **Google indexe uniquement des pages accessibles**, donc les pages non terminées ne doivent pas être incluses.  
- **Une mise à jour du sitemap sera réalisée une fois ces pages opérationnelles**.  

### Pages incluses dans `sitemap.xml`

| **URL** | **Priorité SEO** |
|---------|---------------|
| `/` | **1.0** (page d’accueil). |
| `/artisans/categorie/Bâtiment` | **0.8** |
| `/artisans/categorie/Services` | **0.8** |
| `/artisans/categorie/Fabrication` | **0.8** |
| `/artisans/categorie/Alimentation` | **0.8** |
| `/erreur-404` | **0.5** |

---

## Modification Dynamique du `meta robots`

### Gestion automatique du `meta robots` pour les pages en construction

- **Injection de `noindex, nofollow` dans `<head>` lorsque la page "construction" est affichée**.  
- **Restitution de `index, follow` lorsqu’une autre page est chargée**.  

### Géré via le composant `app-construction`

```typescript
ngOnInit() {
    this.metaElement = document.querySelector('meta[name="robots"]') || this.renderer.createElement('meta');
    this.renderer.setAttribute(this.metaElement, 'name', 'robots');
    this.renderer.setAttribute(this.metaElement, 'content', 'noindex, nofollow');
    document.head.appendChild(this.metaElement);
}

ngOnDestroy() {
    this.metaElement.setAttribute('content', 'index, follow'); // Restauration automatique
}
```

🚀 **Résultat** : Les pages en construction ne sont pas indexées, mais le SEO reste fonctionnel pour les pages finales.

---

## Documents de Référence

- [Google Search Console](https://search.google.com/search-console) : Vérifier l’indexation du site.  
- [Google Rich Results Test](https://search.google.com/test/rich-results) : Tester `Schema.org`.  
- [Documentation `Schema.org`](https://schema.org) : Structuration des données pour le SEO.  
