# Document : Fiche de correction PB-01

---

- [Document : Fiche de correction PB-01](#document--fiche-de-correction-pb-01)
  - [1.Version](#1version)
  - [Introduction](#introduction)
  - [1 Description du problème PB-01](#1-description-du-problème-pb-01)
  - [2. Solution de correction PB-01](#2-solution-de-correction-pb-01)
    - [2.1. Correction n°1 : Gestion dynamique de `dataUrl` de `ArtisanService`](#21-correction-n1--gestion-dynamique-de-dataurl-de-artisanservice)
    - [2.2. Correction n°2 : Gestion du chargement des données avec signalement d’erreur (`ArtisanService`)](#22-correction-n2--gestion-du-chargement-des-données-avec-signalement-derreur-artisanservice)
    - [2.3. Correction n°3 : Gestion des messages conditionnels (`TopArtisan`)](#23-correction-n3--gestion-des-messages-conditionnels-topartisan)
    - [2.4. Correction n°4 : Correction dynamique des URL de fichiers à charger](#24-correction-n4--correction-dynamique-des-url-de-fichiers-à-charger)
  - [3. Test validation](#3-test-validation)
    - [3.1. Test en développement](#31-test-en-développement)
    - [3.2. Test en production sur AlwaysData](#32-test-en-production-sur-alwaysdata)
    - [3.3. Tests Lighthouse](#33-tests-lighthouse)
  - [4. Conclusion](#4-conclusion)

---

## 1.Version

v1.0.6

---

## Introduction

Fiche de correction PB-01 concerne l'accès aux données (`datas.json`).

## 1 Description du problème PB-01

- **Aucune fiche d'artisan ne s’affiche** lorsqu’il manque les données. Aucun message de rendu.
- **Erreur d’accès à `datas.json`** en production (base href différent de la version dev).

---

## 2. Solution de correction PB-01

### 2.1. Correction n°1 : Gestion dynamique de `dataUrl` de `ArtisanService`

**Solution** → Calcul automatique de `baseHref` pour définir `dataUrl` dynamiquement lors de l'initialisation du service.

```typescript
@Injectable({
  providedIn: 'root',
})
export class ArtisanService {
  private readonly baseHref: string = document.getElementsByTagName('base')[0]?.getAttribute('href') || '/';
  private readonly dataUrl: string = `${this.baseHref}datas/datas.json`;

  constructor(private http: HttpClient) {}
}
```

✅ **Résultat de correction n°1** → L’application ajuste automatiquement l’URL des données selon l’environnement (`dev` ou `prod`). La correction est insuffisante car les erreurs de PB-01 persistent.

### 2.2. Correction n°2 : Gestion du chargement des données avec signalement d’erreur (`ArtisanService`)

**Solution** :

- Ajout d’une variable privée `dataError` pour identifier un problème d’accès aux données.
- Mise à jour explicite des erreurs dans la méthode privée `getDatasArtisans()`.
- Ajout d'une méthode synchrone `hasDataError()` pour accéder à l'état d'accès aux données.

```typescript
private dataError: boolean = false; // Correction : variable d'état d'accès aux données

private getDatasArtisans(): Observable<Artisan[]> {
return this.http.get<Artisan[]>(this.dataUrl).pipe(
    map((rawData) =>
    rawData
        .map(fromRawToArtisan)
        .filter((artisan): artisan is Artisan => artisan !== null)
    ),
    tap(data => {
        this._dataError = data.length === 0; // Correction : détection d'une erreur si aucune donnée reçue
    }),
    shareReplay(1),
    catchError((err) => {
    console.error('[ArtisanService] : Erreur lors de la récupération des données (brutes) des artisans', err);
    this._dataError = true; // Correction : active l’état d’erreur global
    return of([]);
    })
);
}

hasDataError(): boolean {  // Correction : méthode synchrone de l'état d'accès aux données
  return this.dataError;
}
```

✅ **Résultat de correction n°2** → Le service `ArtisanService` gère dynamiquemet l'accès au fichier de données et met à disposition une méthode synchrone pour connaître l'état de cet accès. La correction est insuffisante car les erreurs de PB-01 persistent.

### 2.3. Correction n°3 : Gestion des messages conditionnels (`TopArtisan`)

**Solution** :

- Ajout d’une variable `dataError` pour identifier l'état d’accès aux données.
- Ajout d'une varaible `hasNoTopArtisans` pour identifier l'état "aucun artisan au top".
- Initialisation de ces états dans `ngOnInit()` de `TopArtisans`.
- Mise à jour des messages conditionnels d'alerte du code`html` de `TopArtisans`.

```typescript
export class TopArtisansComponent implements OnInit {
  dataError: boolean = false;
  topArtisans$: Observable<ArtisanCard[]> | undefined;
  hasNoTopArtisans: boolean = false;

  constructor(private artisanService: ArtisanService) { }

  ngOnInit(): void {
    this.dataError = this.artisanService.hasDataError();  // Correction : état d'accès aux données
    this.topArtisans$ = this.artisanService.getArtisanByTop();

    this.topArtisans$.subscribe(topArtisans => {
      this.hasNoTopArtisans = (topArtisans.length === 0); // Correction : état de l'existence d'artisans au top
    });
  }
}
```

✅ **Résultat de la correction n°3** → Les erreurs sont correctement identifiées et exploitées par `TopArtisansComponent`. La correction est insuffisante car les erreurs de PB-01 persistent.

### 2.4. Correction n°4 : Correction dynamique des URL de fichiers à charger

La correction numéro 1 (ci-dessus) a mis en évidence le problème de l'url du fichier de données `data.json` et de la nécessité de calculer l'url. Ce problème est apparu plus général lors du test de la version déployée grâce à l'utilisation des outils d'inspection du navigateur et des tests Lighthouse. Ainsi, tous les fichiers à charger (polices, configuration du SEO, favicon) présentent des erreurs d'accès (error 404 sur le réseau) soit dans la version de développement, soit dans la version déployée, soit dans les deux versions. Cette correction généralise la correction des URLs pour tous les fichiers à charger pour le bon fonctionnement du site.

**Analyse**
Les adresses de ces fichiers utilisent des méthodes d'accès différentes qui n'exploitent pas de la même manière les adresses indiquées afin de s'adapter à la cible d'exécution. Le tableau suivant fait une synthèse des différentes situations identifiées.

| N° | Sujet | Problème | Action |
|----|-------|----------|--------|
| 1 | Accès par `http.get()` aux fichier de données json | L'URL transmise en paramètre peut-être relative ou absolue selon la rédaction. Une adresse relative dépend de la **configuration de l'adresse de base** de l'application. | Utiliser une rédaction d'adresse relative de l'URL et configurer les adresses de base |
| 2 | Accès au fichier de `fonts` pour les styles `@font-face` des fichiers `Sass` | Le style `@font-face` configure la police en définissant la source `src` qui utilise la propriété `url`. Cette propriété doit définir le chemin vers le fichier concerné (pour le projet .woff2) avec une adresse complète | Utiliser une rédaction d'adresse absolue |
| 3 | Accès au fichier de `fonts` pour le lien de pré-chargement dans le `<head>` de l'application | Le lien de pré-chargement utilise une propriété `href` qui définie une URL avec une adresse absolue. Ce préchargement doit être réutilisé, sinon il crée une information d'avertissement | Utiliser une rédaction d'adresse absolue ou supprimer le lien s'il n'y a pas d'utilité |

**Solution** :

- **Configurer l'application** (`angular.json`) pour expliciter les adresses de base en développement et en déploiement.
- **Définir les adresses relatives** pour les fichiers `json` des services SeoService et ArtisanService.
- **Définir les adresses absolues** des polices dans le fichier de style `Sass`.
- **Supprimer les liens de pré-chargement** dans le `<head>` de l'application.
- **Créer une fonction utilitaire** pour le calcul dynamique de la base (`base-href.utils.ts`). Action optionnelle, car ce calcul dynamique n'est plus utile avec les corrections ci-dessus.

**Correction : Configurer l'application** :

- Pour `angular.json`

    ```json
    "options": {
      "outputPath": "dist/tta_angular",
      "index": "src/index.html",
      "browser": "src/main.ts",
      "polyfills": ["zone.js"],
      "tsConfig": "tsconfig.app.json",
      "inlineStyleLanguage": "scss",
    
      "baseHref": "/trouve-ton-artisan/",
      "deployUrl": "/trouve-ton-artisan/",
    
      "assets": [...],
      "styles": [...],
      "scripts": []
    }
    ```

**Correction : Définir les adresses relatives** :

- pour **ArtisanService**

    ```typescript
    @Injectable({
      providedIn: 'root',
    })
    export class ArtisanService {
      private readonly dataUrl: string = `datas/datas.json`; // Correction
    
      constructor(private http: HttpClient) {}
    
      private getDatasArtisans(): Observable<Artisan[]> {
        return this.http.get<Artisan[]>(this.dataUrl).pipe(...);
      }
    }
    ```

- pour **SeoService**

    ```typescript
    @Injectable({
      providedIn: 'root'
    })
    export class SeoService {
      constructor(private meta: Meta, 
        private title: Title, private http: HttpClient) { }
    
      loadSeoData() {
        Promise.all([
          firstValueFrom(this.http.get('datas/seo-config.json')),  // Correction
          firstValueFrom(this.http.get('datas/site-schema.json')),  // Correction
          firstValueFrom(this.http.get('datas/artisan-schema.json'))  // Correction
        ])
          .then(([seoConfig, siteSchema, artisanSchema]) => {
            this.updateMetaTags(seoConfig);
            this.injectSchema(siteSchema, "site-schema");
            this.injectSchema(artisanSchema, "artisan-schema");
          })
          .catch(error => console.error("Erreur de chargement des données SEO :", error));
      }
    ```

**Correction : Définir les adresses absolues** :

- Pour fichier Sass `custom-bootstrap.scss`

    ```typescript
    @font-face {
        font-family: 'Graphik';
        src: url(/trouve-ton-artisan/fonts/graphik/graphik-regular.woff2) 
             format('woff2'); // Correction
        font-weight: normal;
        font-style: normal;
        font-display: swap;
    }
    
    @font-face {
        font-family: 'Graphik';
        src: url(/trouve-ton-artisan/fonts/graphik/graphik-bold.woff2) 
             format('woff2');  // Correction
        font-weight: bold;
        font-style: normal;
        font-display: swap;
    }
    ```

**Correction : Supprimer les liens de pré-chargement** :

- Pour `index.html`

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

**Correction : Créer une fonction utilitaire** :

- Création du composant `src/app/utils/base-href.utils.ts` :
  - En cas de besoin pour un calcul dynamique de l'URL.
  - La méthode similaire de **ArtisanService** est supprimée.

    ```typescript
    /**
     * Génère dynamiquement un chemin basé sur la metadonnée `href` de `<base>`.
     *
     * @param {string} path - Le chemin relatif à adapter.
     * @returns {string} Le chemin complet basé sur `baseHref`.
     *
     * @remarks
     * Cette adresse varie selon l’environnement :
     * - **Développement** : `'/'`
     * - **Production** : `'trouve-ton-artisan/'`
     *
     * @example
     * ```typescript
     * const dataUrl = baseHref('datas/datas.json'); // Résultat : '/datas/datas.json' ou 'trouve-ton-artisan/datas/datas.json'
     * ```
     */
    export function baseHref(path: string): string {
        const base = (document.getElementsByTagName('base')[0]?.getAttribute('href') || '/').replace(/\/$/, '');
        const value = `${base}/${path}`.replace(/\/\//g, '/'); // Correction des doubles '/'
        console.log('[baseHref] : valeur calculée du chemin', { initial: path, result: value })
        return value;
    }
    ```

✅ **Résultat** :

- La correction est suffisante car les erreurs de PB-01 ont disparues.
- Les tests (mobile et desktop) avec Lighthouse sont décrits dans la section suivante.

---

## 3. Test validation

### 3.1. Test en développement

- Les données s’affichent correctement et le message d’erreur apparaît si `datas.json` est absent ou si aucun artisan n'est identifié au _top_.
- Les données SEO et les polices sont bien chargées.

### 3.2. Test en production sur AlwaysData

- Les données sont bien chargées et les rendus sont identiques à la phase de développement.

### 3.3. Tests Lighthouse

Les résultats après corrections sont présentés dans le tableau suivant :

| Phase | Mobile Dév. | Mobile Prod. | Desktop Dév. | Desktop Prod. |
|-------|------|-------|------|-------|
| Performance | 49% | 99% | 60% | 100% |
| Accessibilité | 100% | 100% | 100% | 100% |
| SEO | 100% | 100% | 100% | 100% |
| Best Practices | 100% | 100% | 100% | 100% |

## 4. Conclusion

La fiche PB-01 est close.

🚀 **Correction validée pour PB-01 !**
