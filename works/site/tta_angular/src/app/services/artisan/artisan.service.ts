import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom, Observable, of } from 'rxjs';
import { catchError, map, startWith, tap } from 'rxjs/operators';
import { toArtisanCard } from '../../utils/to-artisan-card.utils';
import { toContactCard } from '../../utils/to-contact-card.utils';
import { fromRawToArtisan } from '../../utils/from-raw-datas-to-artisan.utils';
import { topFilter } from '../../pipes/top-filter/top-filter.pipe';
import { searchFilter } from '../../pipes/search-filter/search-filter.pipe';
import { categoryFilter } from '../../pipes/category-filter/category-filter.pipe';
import { idFilter } from '../../pipes/id-filter/id-filter.pipe';
import { Artisan, ArtisanCard, ContactCard } from '../../models/artisan-service.models';

/**
 * Service pour gérer les données des artisans (résumés) et des contacts (détails).
 * Permet de charger, récupérer, filtrer et partager les informations liées aux artisans.
 * 
 * ### Mécanismes réactifs :
 * Ce service garantit des flux sécurisés grâce à :
 * - **`startWith([])`** : Fournit des valeurs initiales pour éviter les comportements non prévisibles.
 * - **`catchError`** : Capture les erreurs et retourne des flux vides en cas de problème.
 * - **`BehaviorSubject`** : Gère l'état interne des données et émet automatiquement les mises à jour.
 * 
 * ### Observables exposés :
 * - **`artisans$`** : Observable contenant les résumés des artisans (`ArtisanCard`).
 * - **`contacts$`** : Observable contenant les détails de contact des artisans (`ContactCard`).
 * - **`categories$`** : Observable contenant les catégories uniques des artisans.
 * 
 * ### Méthodes exposées :
 * - `getAllArtisans()` : Récupère tous les artisans.
 * - `getArtisansByCategory(category: string)` : Filtre les artisans par catégorie.
 * - `getArtisanById(id: string)` : Retourne un artisan spécifique par son identifiant.
 * - `getContactById(id: string)` : Récupère les détails de contact d'un artisan par son identifiant.
 * - `getArtisansByCategoryAndSearch(category: string, keyword: string): Observable<ArtisanCard[]>` : Filtre les artisans par catégorie et mot-clé.
 * - `searchArtisans(keyword: string)` : Recherche les artisans selon un mot-clé.
 * - `getArtisanByTop()` : Retourne les artisans ayant le statut "top".
 * - `getAllCategories()` : Retourne les catégories uniques des artisans.
 * - `reloadDatas()` : Recharge toutes les données artisans, contacts, et catégories.
 * - `isValidCategory(category: string)` : Retourne un booléen qui indique si la catégorie donnée est valide.
 * 
 * ### Exemple d'utilisation :
 * ```typescript
 * export class ExampleComponent {
 *   artisans$ = this.artisanService.getAllArtisans();
 *   constructor(private artisanService: ArtisanService) {}
 * }
 * ```
 */

@Injectable({
  providedIn: 'root',
})
export class ArtisanService {
  /**
   * URL du fichier JSON contenant les données des artisans.
   * 
   * @remarks
   * Ce fichier sert de source principale pour charger les artisans, leurs contacts et les catégories.
   * La récupération est effectuée via `HttpClient`.
   */
  private readonly dataUrl: string = '/datas.json';



  /**
   * Sujet réactif contenant la liste interne des artisans sous forme de fiches (`ArtisanCard`).
   * 
   * @remarks
   * - Ce `BehaviorSubject` initialise son flux avec un tableau vide (`[]`) pour éviter tout comportement imprévisible.
   * - Les données sont mises à jour via `loadArtisans()` et propagées automatiquement aux abonnés.
   * 
   * @see artisans$
   */
  private _artisansSubject = new BehaviorSubject<ArtisanCard[]>([]);

  /**
   * Observable exposant la liste des artisans sous forme de fiches (`ArtisanCard`).
   * 
   * @remarks
   * - Ce flux est basé sur `_artisansSubject` et permet aux abonnés de recevoir les mises à jour en temps réel.
   * - Initialisé avec un tableau vide (`[]`) grâce au `BehaviorSubject`, il garantit une valeur par défaut.
   * 
   * @usageNotes
   * Utilisez ce flux pour afficher les artisans dans un composant, par exemple :
   * ```typescript
   * this.artisans$ = artisanService.artisans$;
   * ```
   */
  public artisans$: Observable<ArtisanCard[]> = this._artisansSubject.asObservable();

  /**
   * Sujet réactif contenant les détails de contact des artisans (`ContactCard`).
   * 
   * @remarks
   * - Le flux est initialisé avec un tableau vide (`[]`) pour éviter tout comportement non défini dans les composants abonnés.
   * - Mis à jour via la méthode `loadContacts()`.
   * 
   * @see contacts$
   */
  private _contactsSubject = new BehaviorSubject<ContactCard[]>([]);

  /**
   * Observable exposant les détails de contact des artisans sous forme de fiches (`ContactCard`).
   * 
   * @remarks
   * - Fournit une vue réactive des contacts des artisans.
   * - Les composants abonnés peuvent consommer ce flux pour afficher des informations détaillées.
   */
  public contacts$: Observable<ContactCard[]> = this._contactsSubject.asObservable();

  /**
   * Sujet réactif contenant les catégories uniques des artisans sous forme de chaînes (`string[]`).
   * 
   * @remarks
   * - Les catégories sont extraites à partir des données des artisans.
   * - Ce flux est initialisé avec un tableau vide (`[]`) pour garantir une valeur par défaut lors de l'abonnement.
   * - Mis à jour via la méthode `loadCategories()`.
   * 
   * @see categories$
   */
  private _categoriesSubject = new BehaviorSubject<string[]>([]);

  /**
   * Observable exposant les catégories uniques des artisans.
   * 
   * @remarks
   * - Ce flux est basé sur `_categoriesSubject` et assure une gestion fluide des mises à jour des catégories.
   * - Idéal pour les composants affichant des listes de catégories ou filtrant des artisans par catégorie.
   */
  public categories$: Observable<string[]> = this._categoriesSubject.asObservable();

  /**
   * État d'initialisation du service ArtisanService.
   * 
   * @private
   * @property _isInitialized - Indique si le service a été correctement initialisé.
   * @property _initializePromise - Contient la promesse liée à l'initialisation asynchrone.
   * @remarks
   * Ces variables garantissent que l'initialisation n'est exécutée qu'une seule fois, 
   * même si plusieurs appels à `initialize()` sont effectués.
   */
  private _isInitialized = false;
  private _initializePromise!: Promise<void>; // Désactivation des vérifications strictes de TypeScript : la propriété sera initialisée avant emploi.
  /**
 * Initialise le service ArtisanService.
 * 
 * @returns Promise<void> - Une promesse résolue une fois que toutes les données (artisans, contacts, catégories) ont été chargées.
 * @remarks
 * - Si le service est déjà initialisé, la méthode retourne la promesse existante.
 * - Utilise les méthodes privées `loadArtisans`, `loadContacts`, et `loadCategories` pour charger les données nécessaires.
 * - Destinée à être utilisée avec Angular APP_INITIALIZER pour garantir que l'application démarre uniquement 
 * lorsque l'initialisation du service est terminée.
 */
  initialize(): Promise<void> {
    if (this._isInitialized) {
      console.warn('[ArtisanService] Initialisation déjà effectuée.');
      return this._initializePromise; // Retourne la même promesse pour les appels répétés
    }

    console.log('[ArtisanService] Initialisation en cours...');
    this._initializePromise = Promise.all([
      this.loadArtisans(),
      this.loadContacts(),
      this.loadCategories(),
    ])
      .then(() => {
        console.log('[ArtisanService] Initialisation réussie.');
        this._isInitialized = true;
      })
      .catch((error) => {
        console.error('[ArtisanService] Erreur pendant l\'initialisation.', error);
      })

    return this._initializePromise;
  }

  /**
   * Constructeur du service ArtisanService.
   * 
   * @param http - Instance de `HttpClient` utilisée pour effectuer les requêtes HTTP.
   * @remarks
   * - Initialise le service en appelant la méthode `initialize()`.
   * - Garantit que les données des artisans, des contacts, et des catégories sont disponibles 
   * dès le démarrage de l'application.
   */
  constructor(private http: HttpClient) {
    if (!this._initializePromise) { // Vérifie si la promesse est déjà définie
      this._initializePromise = this.initialize();
    }
  }

  /**
   * Charge les données des artisans depuis la source et met à jour `_artisansSubject`.
   * 
   * @private
   * @returns Promise<boolean> - Retourne `true` si le chargement est réussi, `false` en cas d'échec.
   * @remarks
   * - Les données sont transformées en `ArtisanCard` via `toArtisanCard`.
   * - En cas d'erreur, `_artisansSubject` est mis à jour avec un tableau vide et l'erreur est loguée.
   * - Cette méthode est utilisée par `initialize()` et `reloadDatas()` pour actualiser les artisans.
   */
  private async loadArtisans(): Promise<boolean> {
    try {
      await firstValueFrom(
        this.getDatasArtisans().pipe(
          map((artisans) => artisans.map(toArtisanCard)),
          tap((artisans) => this._artisansSubject.next(artisans)), // Met à jour le BehaviorSubject
          catchError((error) => {
            console.error('[ArtisanService] Erreur lors du chargement des artisans.', error);
            this._artisansSubject.next([]); // Tableau vide si erreur
            return of([]); // Évite l'interruption du flux
          })
        )
      );
      console.log('[ArtisanService] Chargement des artisans terminé.');
      return true; // Succès
    } catch (error) {
      console.error('[ArtisanService] Erreur dans le chargement des artisans (loadArtisans).', error);
      return false; // Échec
    }
  }

  /**
 * Charge les données de contact des artisans depuis la source et met à jour `_contactsSubject`.
 * 
 * @private
 * @returns Promise<boolean> - Retourne `true` si le chargement est réussi, `false` en cas d'échec.
 * @remarks
 * - Les données sont transformées en `ContactCard` via `toContactCard`.
 * - En cas d'erreur, `_contactsSubject` est mis à jour avec un tableau vide et l'erreur est loguée.
 * - Cette méthode est utilisée par `initialize()` et `reloadDatas()` pour actualiser les contacts.
 */
  private async loadContacts(): Promise<boolean> {
    try {
      await firstValueFrom(
        this.getDatasArtisans().pipe(
          map((artisans) => artisans.map(toContactCard)),
          tap((contacts) => this._contactsSubject.next(contacts)), // Met à jour le BehaviorSubject
          catchError((error) => {
            console.error('[ArtisanService] Erreur lors du chargement des contacts.', error);
            this._contactsSubject.next([]); // Tableau vide si erreur
            return of([]); // Évite l'interruption du flux
          })
        )
      );
      console.log('[ArtisanService] Chargement des contacts terminé.');
      return true; // Succès
    } catch (error) {
      console.error('[ArtisanService] Erreur dans le chargement des contacts (loadContacts).', error);
      return false; // Échec
    }
  }

  /**
 * Charge les catégories uniques des artisans depuis la source et met à jour `_categoriesSubject`.
 * 
 * @private
 * @returns Promise<boolean> - Retourne `true` si le chargement est réussi, `false` en cas d'échec.
 * @remarks
 * - Les catégories sont déduites des données des artisans en éliminant les doublons.
 * - En cas d'erreur, `_categoriesSubject` est mis à jour avec un tableau vide et l'erreur est loguée.
 * - Cette méthode est utilisée par `initialize()` et `reloadDatas()` pour actualiser les catégories.
 */
  private async loadCategories(): Promise<boolean> {
    try {
      await firstValueFrom(
        this.getDatasArtisans().pipe(
          map((artisans) =>
            Array.from(new Set(artisans.map((artisan) => artisan.ranking.category)))
          ),
          tap((categories) => {
            this._categoriesSubject.next(categories);
            console.log('[ArtisanService] Catégories chargées :', categories);
          }),
          catchError((error) => {
            console.error('[ArtisanService] Erreur lors du chargement des catégories.', error);
            this._categoriesSubject.next([]);  // Tableau vide si erreur
            return of([]); // Évite l'interruption du flux
          })
        )
      );
      console.log('[ArtisanService] Chargement des catégories terminé.');
      return true; // Succès
    } catch (error) {
      console.error('[ArtisanService] Erreur dans le chargement des catégories (loadCategories).', error);
      return false; // Échec
    }
  }

  /**
   * Recharge toutes les données artisans, contacts, et catégories.
   * 
   * @returns Promise<void> - Une promesse résolue une fois que toutes les données ont été rechargées.
   * @remarks
   * - Cette méthode appelle les fonctions asynchrones `loadArtisans`, `loadContacts`, et `loadCategories`.
   * - Les résultats de chaque chargement sont logués individuellement pour faciliter le diagnostic.
   * - Utilisable dans des cas de rechargement manuel des données ou après un changement dans la source.
   *
   * @example
   * **Rechargement manuel des données :**
   * ```typescript
   * this.artisanService.reloadDatas().then(() => {
   *   console.log('Données rechargées avec succès.');
   * });
   * ```
   */
  async reloadDatas(): Promise<void> {
    console.log('[ArtisanService] Rechargement des données en cours...');
    const artisansLoaded = await this.loadArtisans();
    const contactsLoaded = await this.loadContacts();
    const categoriesLoaded = await this.loadCategories();

    if (!artisansLoaded || !contactsLoaded || !categoriesLoaded) {
      console.warn('[ArtisanService] Certaines données n\'ont pas pu être rechargées.',
        {
          artisansLoaded: artisansLoaded,
          contactsLoaded: contactsLoaded,
          categoriesLoaded: categoriesLoaded,
        });
    } else {
      console.log('[ArtisanService] Rechargement des données terminé avec succès.',
        {
          artisansLoaded: artisansLoaded,
          contactsLoaded: contactsLoaded,
          categoriesLoaded: categoriesLoaded,
        });
    }
  }

  /**
   * Recharge toutes les données à partir de la source de données.
   * 
   * @remarks
   * Appelle les méthodes internes `loadArtisans`, `loadContacts`, et `loadCategories` pour rafraîchir les flux réactifs.
   * Idéal pour gérer des cas de rechargement manuel ou des changements dans la source de données.
   */
  private getDatasArtisans(): Observable<Artisan[]> {
    return this.http.get<any[]>(this.dataUrl).pipe(
      map((rawData) =>
        rawData
          .map(fromRawToArtisan) // Transforme chaque entrée brute en Artisan
          .filter((artisan): artisan is Artisan => artisan !== null) // Élimine les valeurs nulles
      ),
      catchError((err) => {
        console.error('[ArtisanService] : Erreur lors de la récupération des données (brutes) des artisans', err);
        return of([]); // Retourne un tableau vide en cas d'erreur
      })
    );
  }

  /**
   * Récupère tous les artisans sous forme de fiches (`ArtisanCard`).
   * 
   * @remarks
   * Cette méthode utilise un tableau vide (`[]`) en valeur initiale.
   * Les composants recevront toujours un flux valide, même si aucun artisan ne correspond.
   *
   * @returns Observable contenant un tableau de fiches ArtisanCard.
   */
  getAllArtisans(): Observable<ArtisanCard[]> {
    return this.artisans$.pipe(
      startWith([]),
      map((artisans) => artisans)
    );
  }

  /**
   * Récupère les artisans selon une catégorie spécifique.
   * 
   * @remarks
   * Cette méthode utilise un tableau vide (`[]`) en valeur initiale.
   * Les composants recevront toujours un flux valide, même si aucun artisan ne correspond.
   *
   * @param category - La catégorie à utiliser pour filtrer les artisans (ex. : "Bâtiment").
   * @returns Observable contenant un tableau d'artisans correspondant à la catégorie.
   */
  getArtisansByCategory(category: string): Observable<ArtisanCard[]> {
    return this.artisans$.pipe(
      startWith([]),
      map((artisans) => categoryFilter(artisans, category))
    );
  }

  /**
   * Recherche combinée par catégorie et mot-clé.
   * @param category La catégorie pour filtrer les artisans.
   * @param keyword Le mot-clé pour rechercher les artisans.
   * @returns Observable de la liste filtrée des artisans.
   */
  getArtisansByCategoryAndSearch(category: string, keyword: string): Observable<ArtisanCard[]> {
    // Charger les artisans par catégorie
    return this.getArtisansByCategory(category).pipe(
      // Appliquer le filtre par mot-clé
      map((artisans) => searchFilter(artisans, keyword))
    );
  }

  /**
   * Récupère un artisan spécifique sous forme de fiche (`ArtisanCard`).
   *  
   * @remarks
   * Cette méthode utilise un tableau vide (`[]`) en valeur initiale.
   * Les composants recevront toujours un flux valide, même si aucun artisan ne correspond.
   *
   * @param id - Identifiant unique de l'artisan.
   * @returns Observable contenant ArtisanCard ou undefined s'il n'est pas trouvé.
   */
  getArtisanById(id: string): Observable<ArtisanCard | undefined> {
    return this.artisans$.pipe(
      startWith([]),
      map((artisans) => idFilter(artisans, id))
    );
  }

  /**
   * Récupère les détails de contact d'un artisan spécifique (`ContactCard`).
   *  
   * @remarks
   * Cette méthode utilise un tableau vide (`[]`) en valeur initiale.
   * Les composants recevront toujours un flux valide, même si aucun artisan ne correspond.
   *
   * @param id - Identifiant unique de l'artisan.
   * @returns Observable contenant ContactCard ou undefined s'il n'est pas trouvé.
   */
  getContactById(id: string): Observable<ContactCard | undefined> {
    return this.contacts$.pipe(
      startWith([]),
      map((contacts) => idFilter(contacts, id))
    );
  }

  /**
   * Effectue une recherche parmi les artisans par mot-clé.
   *  
   * @remarks
   * Cette méthode utilise un tableau vide (`[]`) en valeur initiale.
   * Les composants recevront toujours un flux valide, même si aucun artisan ne correspond.
   * Les mots-clés sont recherchés dans le nom, la spécialité et la localisation.
   * 
   * @param keyword - Mot-clé utilisé pour la recherche.
   * @returns Observable contenant les artisans correspondant aux critères de recherche.
   */
  searchArtisans(keyword: string): Observable<ArtisanCard[]> {
    return this.artisans$.pipe(
      startWith([]),
      map((artisans) => searchFilter(artisans, keyword))
    );
  }

  /**
   * Retourne les artisans marqués comme étant "top".
   *  
   * @remarks
   * Cette méthode utilise un tableau vide (`[]`) en valeur initiale.
   * Les composants recevront toujours un flux valide, même si aucun artisan ne correspond.
   *
   * @returns Observable contenant les artisans ayant le statut "top".
   */
  getArtisanByTop(): Observable<ArtisanCard[]> {
    return this.artisans$.pipe(
      startWith([]),
      map((artisans) => topFilter(artisans))
    );
  }

  /**
   * Retourne toutes les catégories uniques des artisans stockées dans l'élément réactif 'categories$'.
   *  
   * @remarks
   * Les composants recevront toujours un flux valide, même si aucune catégorie n'est définie.
   *
   * @returns Observable contenant un tableau des catégories uniques.
   */
  getAllCategories(): Observable<string[]> {
    return this.categories$
  }

  /**
   * Vérifie si la catégorie donnée est valide.
   * 
   * Cette méthode utilise un flux réactif (`categories$`) contenant la liste des catégories valides pour 
   * vérifier si la catégorie passée en paramètre est incluse dans cette liste. 
   * Retourne un `Observable<boolean>` qui émet :
   * - `true` si la catégorie est valide,
   * - `false` sinon.
   * 
   * @param category - La catégorie à vérifier.
   * @returns `Observable<boolean>` indiquant la validité de la catégorie.
   * 
   * @remarks
   * - Cette méthode est idéale pour valider dynamiquement une catégorie dans des composants ou des Guards.
   * - En cas de mise à jour de `categories$`, la logique restera réactive.
   * 
   * @see `categories$` pour la liste des catégories valides.
   */
  isValidCategory(category: string): Observable<boolean> {
    return this.categories$.pipe(
      map((validcategories) => validcategories.includes(category)),
    );
  }

  /**
   * Liste des identifiants uniques des contacts.
   * 
   * Cette variable privée est dérivée dynamiquement de `contacts$`.
   * Elle est utilisée pour valider un identifiant de contact via `isValidContact`.
   * 
   * @see `contacts$` pour la liste des contacts.
   * @see `isValidContact()` pour valider un identifiant.
   */
  private _contactsIds$: Observable<Set<string>> = this.contacts$.pipe(
    map(contacts => new Set(contacts.map(contact => contact.id))) // Transforme en Set d'IDs uniques
  );

  /**
   * Vérifie si l'identifiant fourni correspond à un contact valide.
   * 
   * Cette méthode utilise un flux réactif pour vérifier si l'identifiant 
   * existe dans la liste des identifiants de contacts valides.
   * 
   * @param id - L'identifiant de contact à valider.
   * @returns Un `Observable<boolean>` qui émet :
   * - `true` si l'identifiant est valide.
   * - `false` sinon.
   * 
   * @remarks
   * - Idéal pour une utilisation dans des Guards ou des composants nécessitant une validation dynamique.
   * 
   * @see `_contactsIds$` pour la liste des identifiants dérivés.
   * @see `contacts$` pour les données brutes des contacts.
   */
  public isValidContact(id: string): Observable<boolean> {
    return this._contactsIds$.pipe(
      map(contactIds => contactIds.has(id)), // Vérifie si l'ID existe dans le Set
    );
  }

}
