# Documentation : versionnement de ArtisanService  

---

- [Documentation : versionnement de ArtisanService](#documentation--versionnement-de-artisanservice)
  - [Version](#version)
  - [Préambule](#préambule)
  - [ArtisanService - Version Initiale (V1)](#artisanservice---version-initiale-v1)
    - [Objectifs \& Fonctionnalités de V1](#objectifs--fonctionnalités-de-v1)
    - [Points forts de V1](#points-forts-de-v1)
    - [Limites de V1](#limites-de-v1)
  - [ArtisanService - Optimisation des accès réseaux (V2)](#artisanservice---optimisation-des-accès-réseaux-v2)
    - [Objectifs \& Fonctionnalités de V2](#objectifs--fonctionnalités-de-v2)
    - [Points forts de V2](#points-forts-de-v2)
    - [Limites de V2](#limites-de-v2)
  - [ArtisanService - Passage à une approche 100% Réactive (V3)](#artisanservice---passage-à-une-approche-100-réactive-v3)
    - [Architecture réactive de `ArtisanService`](#architecture-réactive-de-artisanservice)
    - [Objectifs \& Fonctionnalités V3](#objectifs--fonctionnalités-v3)
    - [Points forts de V3](#points-forts-de-v3)
    - [Limites de V3](#limites-de-v3)
  - [Synthèse Comparative des versions de ArtisanService](#synthèse-comparative-des-versions-de-artisanservice)
  - [Conclusion \& Perspectives des traitements de ArtisanService](#conclusion--perspectives-des-traitements-de-artisanservice)
  - [Synthèse sur l'initialisation de ArtisanService"](#synthèse-sur-linitialisation-de-artisanservice)
    - [Initialisation de `ArtisanService` au démarrage de l’application](#initialisation-de-artisanservice-au-démarrage-de-lapplication)
      - [Problème rencontré : Double appel à l’initialisation](#problème-rencontré--double-appel-à-linitialisation)
      - [Solution retenue](#solution-retenue)
    - [Code utilisé dans `AppModule`](#code-utilisé-dans-appmodule)
    - [Impact et choix final](#impact-et-choix-final)
  - [Documentation de référence"](#documentation-de-référence)

---

## Version

v1.0.6

---

## Préambule

Le service ArtisanService permet de gérer tous les accès aux données d'artisans qui ont été fournies dans un fichier de données `datas.json`. Lors des travaux d'évaluation de la performance avec **Lighthouse**, il est apparu possible d'améliorer le codage de ce service pour réduire les délais réseaux de l'application. Cela a conduit à trois versions fonctionnelles de ArtisanService.

ce document décrit succinctement les particularités de chaqu'une des trois versions du service ArtisanService et aborde en fin de document, l'initialisation du service en début d'application.

## ArtisanService - Version Initiale (V1)

### Objectifs & Fonctionnalités de V1

✅ Chargement des artisans, contacts et catégories via des méthodes dédiées (`loadArtisans()`, `loadContacts()`, `loadCategories()`).
✅ Stockage des données dans des `BehaviorSubject` (`_artisansSubject`, `_contactsSubject`, `_categoriesSubject`).
✅ Réutilisation des données avec un cache `_dataCache` pour limiter les appels réseau.

### Points forts de V1

✅ Structure claire et compréhensible, chaque donnée étant manipulée séparément.
✅ Gestion du cache `_dataCache` pour éviter des appels réseau inutiles.

### Limites de V1

❌ Plusieurs appels réseau au fichier de données des artisans (`datas.json`).
❌ `loadContacts()` et `loadCategories()` nécessitent un appel explicite pour être mis à jour, ce qui entraîne une gestion supplémentaire.

---

## ArtisanService - Optimisation des accès réseaux (V2)

### Objectifs & Fonctionnalités de V2

✅ Suppression des appels répétitifs à `datas.json` en exploitant `_dataCache`.
✅ Réduction du nombre de chargements manuels grâce à `Promise.all()`.
✅ Meilleure structuration de `initialize()` pour éviter les doublons.

### Points forts de V2

✅ Réduction significative des appels réseau grâce à `_dataCache`.
✅ Optimisation de `initialize()` pour éviter les appels multiples inutiles.

### Limites de V2

❌ `loadContacts()` et `loadCategories()` toujours présents → Nécessité de les appeler manuellement.
❌ Code encore structuré autour d’un stockage manuel (`BehaviorSubject`) au lieu d’un modèle réactif pur.

---

## ArtisanService - Passage à une approche 100% Réactive (V3)

### Architecture réactive de `ArtisanService`

Dans `ArtisanService V3`, la gestion des données repose entièrement sur une approche **réactive**, permettant aux composants de recevoir automatiquement les mises à jour.

**Principe clé de l'architecture réactive :**

- `_dataCache$` est la **source centrale** des données artisans.
- `artisans$`, `contacts$`, et `categories$` dérivent directement de `_dataCache$`.
- Tout changement dans `_dataCache$` est immédiatement répercuté sur les flux abonnés.
- **Gestion des erreurs intégrée** : en cas de problème, les flux continuent de fonctionner avec des valeurs par défaut.

**Schéma de l'architecture réactive :**

![Architecture réactive de ArtisanService V3](./images/architecture-réactive-ArtisanService.jpeg)

**Impact de cette architecture réactive :**

- **Suppression des chargements manuels (`loadContacts()`, `loadCategories()`)**.
- **Réduction du code et meilleure séparation des responsabilités**.
- **Optimisation des performances sans altérer la structure globale de l’application**.

### Objectifs & Fonctionnalités V3

✅ Suppression de `loadContacts()` et `loadCategories()`, ainsi que `_artisansSubject`, `_contactsSubject` et `_categoriesSubject`.
✅ Transformation des `Observable` (`artisans$`, `contacts$` et `categories$`) pour qu’ils dérivent de `_dataCache$`.
✅ Remplacement de `_dataCache` (variable manuelle) par `_dataCache$` (Observable `BehaviorSubject`).

### Points forts de V3

✅ **Automatisation complète des mises à jour** → `artisans$`, `contacts$` et `categories$` se mettent à jour dynamiquement sans intervention.
✅ **Réduction du code** → Simplification en exploitant directement `_dataCache$`.

### Limites de V3

❌ **Pas d’amélioration du score Lighthouse (LH)** → L’optimisation est structurelle mais n’a pas réduit le temps de chargement de l’application.

---

## Synthèse Comparative des versions de ArtisanService

| Version | Gestion du cache | Réduction des appels réseau | Automatisation des mises à jour | Réactivité complète |
|---------|-----------------|----------------------------|--------------------------------|---------------------|
| **V1** | `_dataCache` (manuel) | ❌ (multiples appels) | ❌ (`loadContacts()`, `loadCategories()` requis) | ❌ |
| **V2** | `_dataCache` (optimisé) | ✅ (réduction des appels) | ❌ (`loadContacts()`, `loadCategories()` requis) | ❌ |
| **V3** | `_dataCache$` (`BehaviorSubject`) | ✅ (réduction des appels) | ✅ (`artisans$`, `contacts$` et `categories$` réactifs) | ✅ |

---

## Conclusion & Perspectives des traitements de ArtisanService

📌 **ArtisanService V3 permet une gestion totalement réactive, mais ne montre pas de gains sur la performance Lighthouse**.  
📌 **Si l’objectif était de réduire les appels réseau, la V2 était déjà suffisante**.  
📌 **Si l’objectif était d’optimiser la structure pour un code réactif et moderne, la V3 est la meilleure approche**.  

---

## Synthèse sur l'initialisation de ArtisanService"  

### Initialisation de `ArtisanService` au démarrage de l’application

Pour assurer que le service ArtisanService est **disponible dès le lancement de l’application**, il est essentiel de l’initialiser **avant l’instantiation du router**. Cela permet d’accéder aux données d’artisans sans attendre une requête réseau après le chargement de la page.  

#### Problème rencontré : Double appel à l’initialisation

🔹 En utilisant `provideAppInitializer()`, il est apparu que `initialize()` était exécuté **deux fois** lors du démarrage.  
🔹 Ce double appel provenait du fait qu’Angular réinjecte `ArtisanService`, ce qui déclenchait une **deuxième instanciation** du service.  

#### Solution retenue

🔹 **Garder le code original de `provideAppInitializer()` avec le double appel** pour garantir la compatibilité avec les redémarrages à chaud.  
🔹 **Accepter une légère redondance** pour assurer un bon fonctionnement global de l’application.  

### Code utilisé dans `AppModule`

```ts
providers: [
  provideHttpClient(),
  provideAppInitializer(() => {
    const artisanService = inject(ArtisanService);
    return artisanService.initialize();
  }),
],
```

### Impact et choix final

✅ **Assure que `ArtisanService` est disponible avant l’instantiation du router.**  
✅ **Garantit la stabilité des redémarrages à chaud** (évite l’erreur 404 due à une liste des catégories en cours de mise à jour).  
✅ **Aucune amélioration notable des délais de chargement** → Le choix est fait **de conserver la double initialisation** pour la fiabilité du service.  

---

## Documentation de référence"

- **Gestion des Observables et RxJS** (Documentation Angular)  
[https://angular.io/guide/observables](https://angular.io/guide/observables)  

- **Mise en place d’un service Angular**  
[https://angular.io/guide/architecture-services](https://angular.io/guide/architecture-services)  

- **Initialisation d’un service en Angular 19 (`provideAppInitializer`)**  
[https://angular.dev/api/core/provideAppInitializer](https://angular.dev/api/core/provideAppInitializer)  
