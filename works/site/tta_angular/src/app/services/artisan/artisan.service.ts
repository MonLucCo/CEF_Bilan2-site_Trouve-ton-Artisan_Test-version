import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, startWith, tap } from 'rxjs/operators';
import { Artisan } from '../../models/artisan.models';
import { ArtisanCard } from '../../models/artisan-card.models';
import { ContactCard } from '../../models/contact-card.models';
import { toArtisanCard } from '../../utils/to-artisan-card.utils';
import { toContactCard } from '../../utils/to-contact-card.utils';
import { fromRawToArtisan } from '../../utils/from-raw-datas-to-artisan.utils';

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
 * - `searchArtisans(keyword: string)` : Recherche les artisans selon un mot-clé.
 * - `getArtisanByTop()` : Retourne les artisans ayant le statut "top".
 * - `getAllCategories()` : Retourne les catégories uniques des artisans.
 * - `reloadDatas()` : Recharge toutes les données artisans, contacts, et catégories.
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
  private dataUrl = '/datas.json';


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
   * Initialise le service en chargeant les artisans, les contacts et les catégories.
   * 
   * @param http - Service `HttpClient` utilisé pour effectuer les requêtes HTTP.
   * 
   * @remarks
   * Les appels aux méthodes privées `loadArtisans`, `loadContacts`, et `loadCategories` s'effectuent dès l'initialisation.
   * Cela garantit que tous les flux exposés par le service contiennent des valeurs dès leur abonnement.
   */
  constructor(private http: HttpClient) {
    this.loadArtisans();
    this.loadContacts();
    this.loadCategories();
  }

  /**
   * Charge les données des artisans et met à jour `_artisansSubject`.
   * 
   * @remarks
   * - Les données sont récupérées via `getDatasArtisans()` et transformées en `ArtisanCard`.
   * - Toute erreur survenue lors du chargement est capturée et loguée via `console.error`.
   * 
   * @private
   */
  private loadArtisans(): void {
    this.getDatasArtisans().pipe(
      map((artisans) => artisans.map(toArtisanCard)), // Transforme en ArtisanCard
      tap((artisans) => this._artisansSubject.next(artisans)), // Met à jour `_artisansSubject`
      catchError((error) => {
        console.error('[ArtisanService] : Erreur lors du chargement des artisans.', error);
        return of([]); // Retourne un tableau vide si erreur
      })
    ).subscribe(); // Nécessaire uniquement pour déclencher l'exécution.
  }

  /**
   * Charge les données de contact des artisans et met à jour `_contactsSubject`.
   * 
   * @remarks
   * - Les contacts sont transformés en objets `ContactCard`.
   * - Une erreur lors du chargement est capturée et un tableau vide est renvoyé.
   * 
   * @private
   */
  private loadContacts(): void {
    this.getDatasArtisans().pipe(
      map((artisans) => artisans.map(toContactCard)), // Transforme en ContactCard
      tap((contacts) => this._contactsSubject.next(contacts)), // Met à jour `_contactsSubject`
      catchError((error) => {
        console.error('[ArtisanService] : Erreur lors du chargement des contacts.', error);
        return of([]); // Retourne un tableau vide si erreur
      })
    ).subscribe();
  }

  /**
   * Extrait les catégories uniques des artisans et met à jour `_categoriesSubject`.
   * 
   * @remarks
   * - Les catégories sont déduites des données des artisans via une opération `Set` pour éviter les doublons.
   * - Une erreur lors du chargement est capturée et un tableau vide est renvoyé.
   * 
   * @private
   */
  private loadCategories(): void {
    this.getDatasArtisans().pipe(
      map((artisans) =>
        Array.from(new Set(artisans.map((artisan) => artisan.ranking.category)))
      ), // Extrait les catégories uniques
      tap((categories) => {
        console.log('[ArtisanService]-[loadCategories] : Catégories chargées :', categories);
        this._categoriesSubject.next(categories)
      }), // Met à jour `_categoriesSubject`
      catchError((error) => {
        console.error('[ArtisanService]-[loadCategories] : Erreur lors du chargement des catégories.', error);
        return of([]); // Retourne un tableau vide si erreur
      })
    ).subscribe();
  }

  /**
   * Recharge toutes les données artisans, contacts, et catégories.
   * Méthode publique permettant de recharger les données manuellement.
   */
  reloadDatas(): void {
    this.loadArtisans();
    this.loadContacts();
    this.loadCategories();
  }

  /**
   * Recharge toutes les données (artisans, contacts et catégories).
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
      map((artisans) => artisans.filter((artisan) => artisan.category === category))
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
      map((artisans) => artisans.find((artisan) => artisan.id === id))
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
      map((contacts) => contacts.find((contact) => contact.id === id))
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
      map((artisans) =>
        artisans.filter((artisan) =>
          artisan.name.toLowerCase().includes(keyword.toLowerCase()) ||
          artisan.specialty.toLowerCase().includes(keyword.toLowerCase()) ||
          artisan.location.toLowerCase().includes(keyword.toLowerCase())
        )
      )
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
      map((artisans) => artisans.filter((artisan) => artisan.top === true))
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

}
