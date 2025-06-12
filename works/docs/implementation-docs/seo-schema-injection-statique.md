# Documentation Finale – SEO du Projet Trouve Ton Artisan

**🔹 Optimisation du SEO via un service dédié (`SeoService`)**  

---

- [Documentation Finale – SEO du Projet Trouve Ton Artisan](#documentation-finale--seo-du-projet-trouve-ton-artisan)
  - [Version](#version)
  - [Préambule](#préambule)
  - [Objectifs du `SeoService`](#objectifs-du-seoservice)
  - [Création du `SeoService` dans Angular](#création-du-seoservice-dans-angular)
    - [Génération du service](#génération-du-service)
    - [Implémentation de `seo.service.ts`](#implémentation-de-seoservicets)
  - [Mise à jour de `seo-config.json`](#mise-à-jour-de-seo-configjson)
  - [Suppression des scripts SEO dynamiques](#suppression-des-scripts-seo-dynamiques)
  - [Résultats et validation SEO](#résultats-et-validation-seo)
  - [Conclusion : Pourquoi cette mise à jour améliore le SEO ?](#conclusion--pourquoi-cette-mise-à-jour-améliore-le-seo-)

---

## Version

v1.0.6

---

## Préambule

Le référencement du projet **Trouve Ton Artisan** a évolué en **deux étapes distinctes** :  
1️⃣ **Une première version basée sur l’injection dynamique** ([lien](./seo-schema-injection-dynamique.md)), où les métadonnées `<meta>` et `Schema.org` étaient intégrées via des scripts externes (`meta-og.js` et `seo-loader.js`) dans `index.html`.  
2️⃣ **Une version finale optimisée avec un `SeoService` dédié**, garantissant une injection **statique** des balises dès le chargement Angular, pour une meilleure stabilité et évolutivité.  

Après tests et analyse SEO avec `Lighthouse`, il est apparau que l'injection dynamique des balises `<meta>` pouvait poser des problèmes de reconnaissance par Lighthouse et Google, notamment à cause du cache navigateur.
En effet, lorsque le cache n'était pas vidé, certaines mises à jour des metadonnées SEO n'était pasimmédiatement prise en compte. En utilisant une **injections statique** via `SeoService`, ces contraintes liées au cache navigateur ne sont plus.

Ainsi, **la seconde approche a été retenue**, car elle offre :

- **Une gestion plus stable des métadonnées**, sans dépendre d’un chargement dynamique et du cache navigateur.
- **Une meilleure compatibilité avec Google et Lighthouse**, assurant un SEO optimisé dès l’affichage initial.
- **Une évolutivité accrue**, permettant d’adapter les balises en fonction de chaque page du site (extension possible du service, mais non mis en oeuvre dans cette version).

🚀 **Cette documentation décrit en détail l’implémentation du `SeoService` et les améliorations qu’il apporte au projet.**  

---

## Objectifs du `SeoService`

✅ **Injection statique des balises `<meta>` et `Schema.org`**, dès le chargement de l’application.
✅ **Suppression des scripts dynamiques** (`meta-og.js`, `seo-loader.js`) pour une gestion SEO **centralisée**.
✅ **Gestion évolutive du SEO**, permettant d’adapter les métadonnées **selon la page visitée**.
✅ **Amélioration de la prise en compte des balises SEO par Google**, garantissant une meilleure indexation et un meilleur affichage sur les réseaux sociaux.

---

## Création du `SeoService` dans Angular

### Génération du service

**Créer le service Angular** avec la commande CLI :

```bash
ng generate service services/seo/seo
```

### Implémentation de `seo.service.ts`

```typescript
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  constructor(private meta: Meta, private title: Title, private http: HttpClient) {}

  loadSeoData() {
    Promise.all([
      firstValueFrom(this.http.get('/datas/seo-config.json')),
      firstValueFrom(this.http.get('/datas/site-schema.json')),
      firstValueFrom(this.http.get('/datas/artisan-schema.json'))
    ])
    .then(([seoConfig, siteSchema, artisanSchema]) => {
      this.updateMetaTags(seoConfig);
      this.injectSchema(siteSchema, "site-schema");
      this.injectSchema(artisanSchema, "artisan-schema");
    })
    .catch(error => console.error("Erreur de chargement des données SEO :", error));
  }

  private updateMetaTags(seoConfig: any) {
    this.title.setTitle(seoConfig.title);
    this.meta.updateTag({ name: 'description', content: seoConfig.description });
    this.meta.updateTag({ property: 'og:title', content: seoConfig.siteName });
    this.meta.updateTag({ property: 'og:description', content: seoConfig.description });
    this.meta.updateTag({ property: 'og:image', content: seoConfig.image });
    this.meta.updateTag({ property: 'og:url', content: seoConfig.siteUrl });
    this.meta.updateTag({ name: 'keywords', content: seoConfig.keywords.join(", ") });
    this.meta.updateTag({ name: 'author', content: seoConfig.author });
    this.meta.updateTag({ name: 'robots', content: seoConfig.robots });
  }

  private injectSchema(data: any, id: string) {
    if (data) {
      let scriptElement = document.createElement("script");
      scriptElement.type = "application/ld+json";
      scriptElement.id = id;
      scriptElement.textContent = JSON.stringify(data);
      document.head.appendChild(scriptElement);
    }
  }
}
```

---

## Mise à jour de `seo-config.json`

```json
{
    "title": "Trouve Ton Artisan | Plateforme de formation en développement web",
    "siteName": "Trouve Ton Artisan",
    "siteUrl": "https://www.trouve-ton-artisan.com",
    "description": "Plateforme de formation sur la mise en relation entre artisans et clients.",
    "keywords": ["artisan", "formation développement web", "Angular", "SEO"],
    "author": "Trouve Ton Artisan",
    "robots": "index, follow",
    "image": "https://www.trouve-ton-artisan.com/images/img/og-image.jpg"
}
```

---

## Suppression des scripts SEO dynamiques

✅ **Les fichiers `meta-og.js` et `seo-loader.js` sont supprimés**, car Angular injecte désormais les balises **directement via `SeoService`**.
✅ **`index.html` devient minimaliste**, ne contenant que :

```html
<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
  <app-root></app-root>
</body>
</html>
```

🚀 **Cette simplification garantit une prise en charge optimale des balises SEO par Angular dès le chargement de l’application.**  

---

## Résultats et validation SEO

✅ **Lighthouse détecte correctement toutes les balises `<meta>`**, et le score **SEO est à 100%**.
✅ **Les balises Open Graph (`og:image`, `og:title`, etc.) sont bien intégrées** pour le partage sur les réseaux sociaux.
✅ **Les données `Schema.org` sont validées via [Google Rich Results Test](https://search.google.com/test/rich-results)**, assurant une prise en compte optimale par Google.  
✅ **Le SEO est désormais évolutif**, avec des balises **adaptées à chaque page**.

---

## Conclusion : Pourquoi cette mise à jour améliore le SEO ?

✔️ **Fiabilité du référencement** → Balises injectées dès le chargement initial.  
✔️ **Évolutivité** → SEO personnalisable selon chaque page.  
✔️ **Optimisation des performances** → Suppression des scripts inutiles.  
✔️ **Gestion simplifiée** → Centralisation des métadonnées dans `SeoService`.  
