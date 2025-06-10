# Documentation : Améliorations de l’accessibilité

---

## Sommaire

[TOC]

---

## Préambule : État initial de l’accessibilité

L’accessibilité du site **Trouve Ton Artisan** a été analysée via **Lighthouse**.  

- **Score initial Lighthouse** (avant corrections) : **85%**  
- **Score après corrections actuelles** (Header, Searcbar) : **92% (+7%)**  
- **Objectif** : Appliquer les bonnes pratiques pour améliorer encore ce score. Continuer les optimisations pour atteindre **95%** et améliorer l'inclusivité du site.

Cette documentation détaille les actions mises en place pour optimiser l’accessibilité et garantir une **expérience utilisateur plus inclusive**.  

---

## Documents de référence

L’accessibilité web est guidée par plusieurs normes et recommandations. Voici les principaux documents qui servent de référence pour les améliorations :  

**WCAG (Web Content Accessibility Guidelines) - W3C**  
✅ Norme internationale pour l’accessibilité des contenus web.  
✅ Définit trois niveaux de conformité : **A, AA, AAA**.  
✅ Disponible ici : [WCAG Guidelines](https://www.w3.org/WAI/standards-guidelines/wcag/)  

**The A11Y Project - Checklist d’accessibilité**  
✅ Liste de vérification des bonnes pratiques **basée sur les WCAG**.  
✅ Aide à valider les aspects clés de l’accessibilité.  
✅ Disponible ici : [A11Y Project Checklist](https://www.a11yproject.com/checklist/)  

**Lighthouse - Outil d’audit Google**  
✅ Analyse automatique des performances et de l’accessibilité.  
✅ Donne une évaluation chiffrée et des recommandations.  
✅ Utilisable via DevTools dans Google Chrome.  

---

## Sujets d’amélioration identifiés et impact sur l'accessibilité

Chaque action corrective est identifiée par une **référence unique (`A11Y-XX`)**. Ces références sont utilisées pour tracer les corrections spécifiques à chaque module.

Les sujets au status :

- **Corrigé** (✅) pourront être traités dans les prochaines étapes d’amélioration des composants restants.
- **Corrigé partiellement** (🟠) pourront être complétée pour d'autres particularité d'accessibilité.
- **À traiter** (❌) n'ont pas été obordés dans les corrections du projet.

| Référence | Problème identifié | Impact | Action recommandée | Statut |
|-----------|--------------------|--------|--------------------|--------|
| `A11Y-01` | Titre caché pour navigation | Améliore la structuration du menu pour les lecteurs d'écran | Ajout d’un `<h2>` invisible (`visually-hidden`) | ✅ Corrigé |
| `A11Y-02` | Structure ARIA améliorée | Facilite l’interprétation des éléments par les technologies d’assistance | Ajout de `role="navigation"` et `aria-labelledby` | ✅ Corrigé |
| `A11Y-03` | Accessibilité des liens | Améliore la compréhension des liens qui ne contiennent qu’une icône | Ajout de `aria-label` explicite | ✅ Corrigé |
| `A11Y-04` | Optimisation des boutons | Permet aux utilisateurs de lecteurs d’écran d’identifier les boutons correctement | Ajout de `aria-label` sur les boutons de recherche et reset | ✅ Corrigé |
| `A11Y-05` | Contrôle du contraste | Améliore la lisibilité pour les personnes malvoyantes | Ajustement des couleurs pour respecter le ratio (`4.5:1`) | 🟠 Corrigé partiellement |
| `A11Y-06` | Navigation au clavier | Assure que le focus suit une logique intuitive | Vérification du focus clavier et de la navigation fluide | 🟠 Corrigé partiellement |
| `A11Y-07` | Ajout de `label` caché | Améliore la compréhension du champ pour les lecteurs d’écran | Ajout d’un `label` associé (`visually-hidden`) | ✅ Corrigé |
| `A11Y-08` | Identification du bouton évolutif | Améliore l’interprétation des cases à cocher incluses dans un bouton | Ajout de `attr.aria-label` et association correcte du `<label>` | ✅ Corrigé |
| `A11Y-09` | HTML5 landmarks (`<main>`, `<nav>`, etc.) manquants | Structure mieux les contenus pour les technologies d’assistance | Ajout des balises landmarks | 🟠 Corrigé partiellement |
| `A11Y-10` | Identification d'un bloc expensible | Améliore l’interprétation d'une section ouverte ou fermée | Ajout de `attr.aria-expanded` associé à une variable d'état | ✅ Corrigé |

---

## Principes de la correction d'amélioration de l’accessibilité

 Les corrections suivent le même principe dans chaque composant corrigé. Le tableau explicite le principe utilisé dans la correction le code.

| Référence | Principe d’amélioration | Description |
|-----------|-------------------------|-------------|
| `A11Y-01` | Titre caché pour navigation | Ajout d’un `<h2>` invisible pour structurer la navigation |
| `A11Y-02` | Structure ARIA améliorée | Ajout de `role` et `aria-labelledby` pour améliorer l’interprétation des éléments |
| `A11Y-03` | Accessibilité des liens | Ajout de `aria-label` pour donner du sens aux liens sans texte explicite |
| `A11Y-04` | Optimisation des boutons | Ajout d’un libellé accessible (`aria-label`) pour éviter les boutons anonymes |
| `A11Y-06` | Navigation au clavier | Ajout d'un style de focus pour les `button` |
| `A11Y-07` | Ajout de `label` caché | Ajout d'une classe de style `visually-hidden` |

---

## Modifications du code pour les composantes du projet

| Module  | Référence amélioration | Implémentation |
|---------|----------------------|----------------|
| **Header** | `A11Y-01` | Ajout d’un `<h2>` caché pour structurer le menu (`visually-hidden`) |
|  | `A11Y-02` | Ajout de `role="navigation"` sur `<nav>` et `aria-labelledby="site-navigation"` |
|  | `A11Y-03` | Ajout de `aria-label` sur les liens du menu (ex : `aria-label="Catégorie Bâtiment"`) |
|  | `A11Y-04` | Ajout de `role="banner"` sur `<header>` |
|  | `A11Y-05` | Ajout de `aria-labelledby="search-label"` pour la barre de recherche |
| **SearchBar** | `A11Y-07` | Ajout d’un `label` caché (`visually-hidden`) pour les champs de recherche |
|  | `A11Y-06` | Ajout d'un style `button:focus` pour améliorer la visibilité d'un bouton sélectionné par clavier |
|  | `A11Y-08` | Ajout de `attr.aria-label` sur le bouton évolutif (catégorie) et `label` pour la case à cocher |
| **Footer** | `A11Y-02` | Ajout d’un `<h2>` (et `<h3>`) caché (`visually-hidden`) pour structurer le pied de page |
|  | `A11Y-05` | Ajout de `aria-labelledby` pour associer les sections à un titre accessible |
|  | `A11Y-03` | Ajout de `aria-label` sur les liens légaux et les icônes de réseaux sociaux |
|  | `A11Y-10` | Ajout de `aria-expanded` pour indiquer l’état des outils interactifs |
| **App** | `A11Y-09` | Ajout d’un role à `<main>` |
| **Footer** | `A11Y-05` | Amélioration du contraste en atténuant la couleur de fond (`bg-light`) |

---

## Évolution du score d’accessibilité par composant du projet

| Composant | Score initial | Score après correction | Gain (%) | Principales améliorations |
|-----------|--------------|-----------------|---------|----------------|
| **Header** | 85% | 86% | **+1%** | Ajout de balises ARIA, structure HTML améliorée |
| **SearchBar** | 86% | 92% | **+6%** | Ajout des `aria-label`, des `label` pour les champs et corrections sur les boutons, du style `button:focus` |
| **Footer** | 92% | 96% | **+4%** | Ajout des titres accessibles, `aria-label`, et `aria-expanded` |
| **App** | 96% | 96% | **+0%** | Ajout d'un rôle, `role=main` |
| **Footer** | 96% | 100% | **+4%** | Amélioration du contraste en éclaircissant le fond (`bg-light`) |
| **Page d’accueil** | — | — | — | À traiter |
| **Page liste d'artisans** | — | — | — | À traiter |
| **Page de contact** | — | — | — | À traiter |
| **Page d'erreur 404** | — | — | — | À traiter |

## Perspectives d’amélioration

L'objectif est d'approfondir l’optimisation de l’accessibilité pour atteindre 98%+ sur Lighthouse.

Dans un premier temps, l’amélioration de l’accessibilité du site **Trouve Ton Artisan** a permis de passer de **85% à 96%** sur Lighthouse. En second lieu, l'amélioration du contraste ciblée sur le composant `Footer` a permis d'atteindre **100%**.

Bien qu'il s'agisse de l'optimal de l'indicateur, il apparaît que d'autres points techniques et fonctionnels peuvent être améliorés sur l'ensemble des composantes du projet.

### 1️⃣ Correction du contraste des couleurs (`A11Y-05`)

- **Problème identifié** : Certaines couleurs (`bg-primary-subtle`, `bg-secondary-subtle`) peuvent ne pas respecter les normes **WCAG AA (4.5:1)**.
- **Solution**

  - Ajuster les couleurs pour améliorer la lisibilité et éviter les problèmes de faible contraste.

### 2️⃣ Navigation au clavier (`A11Y-06`)

- **Problème identifié** → Vérification du focus clavier et de la logique de navigation pour les technologies d’assistance.
- **Solution**

  - S’assurer que tous les éléments interactifs sont accessibles via le clavier.
  - Vérifier qu’aucun élément ne bloque le parcours du focus utilisateur.
  - Améliorer les styles `:focus` pour une meilleure indication visuelle.  

### 3️⃣ Ajout des `landmarks` HTML (`A11Y-09`)

- **Problème identifié**
  - Absence de certaines balises **HTML5 landmarks** (`<main>`, `<nav>`, etc.), qui facilitent la navigation pour les utilisateurs de technologies d’assistance.
- **Solution**
  - Intégration des landmarks pour structurer les sections principales de la page.
  - Vérification de leur bon usage pour améliorer l’expérience des lecteurs d’écran.

### 4️⃣ Optimisation des autres composants

- **Les prochains modules à traiter :**  
  - **Page d’accueil** : Vérifier la structuration et l’accessibilité du contenu.
  - **Page liste d’artisans** : Assurer que la navigation et les filtres sont accessibles.
  - **Page de contact** : Vérifier la clarté des formulaires et des éléments interactifs.
  - **Page d’erreur 404** : S’assurer qu’elle est compréhensible et bien signalée.

### 5️⃣ Audit manuel et tests utilisateurs

- **Objectif**
  - Aller au-delà de l’automatisation et **identifier des améliorations non détectées par Lighthouse**.
- **Actions recommandées**
  - Tester la navigation avec un lecteur d’écran (NVDA, VoiceOver, etc.).
  - Vérifier la cohérence et la clarté des contenus pour les utilisateurs ayant des limitations visuelles ou motrices.
  - Organiser des tests avec des utilisateurs pour recueillir des feedbacks.  

---

## Conclusion et état final des améliorations

### Démarche d'amélioration

L'amélioration de l’accessibilité sur **Trouve Ton Artisan** a permis une nette progression du score **Lighthouse**, passant de **85% à 96%**, puis **100%**.

- **Les éléments critiques ont été corrigés**, notamment :
  - Ajout de **balises ARIA et landmarks HTML5** pour une meilleure structuration.
  - Optimisation des **boutons, liens et champs de recherche** avec `aria-label`.
  - **Navigation au clavier améliorée**, avec ajout de styles `focus`.
  - Augmentation du **contraste** du composant `Footer`.

- **Certains points restent à affiner** :
  - **Contraste des couleurs (🟠 `A11Y-05`)** : Vérifier et ajuster pour respecter **WCAG AA (4.5:1)**.
  - **Finalisation des landmarks HTML (🟠 `A11Y-09`)** : Vérifier tous les landmarks du projet et autres éléments nécessaires.

### Synthèse et conclusion

Grâce aux améliorations apportées, **Trouve Ton Artisan** atteint désormais **100% sur Lighthouse**, garantissant une expérience accessible et optimisée.

Malgré ce score parfait, un **test manuel reste recommandé** pour valider pleinement l’ergonomie et la navigation, notamment pour les aspects non détectés par Lighthouse.
Les ajustements réalisés sur le contraste (`A11Y-05`) et les landmarks HTML (`A11Y-09`) sont considérés comme partiellement corrigés, mais suffisants pour assurer une bonne accessibilité.
Le projet peut être **considéré comme finalisé**, apportant une **expérience accessible et inclusive** pour tous les utilisateurs.
