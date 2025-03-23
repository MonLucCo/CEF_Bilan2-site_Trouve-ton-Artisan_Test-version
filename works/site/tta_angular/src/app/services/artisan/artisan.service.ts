import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
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
 * ### Observables exposés :
 * - `artisans$` : Observable contenant les résumés des artisans (`ArtisanCard`).
 * - `contacts$` : Observable contenant les détails de contact des artisans (`ContactCard`).
 * - `categories$` : Observable contenant les catégories uniques des artisans.
 *
 * ### Méthodes exposées :
 * - `getAllArtisans()` : Récupère tous les artisans.
 * - `getArtisansByCategory(category: string)` : Récupère tous les artisans selon une catégorie spécifique.
 * - `getArtisanById(id: string)` : Récupère un artisan spécifique par son identifiant.
 * - `getContactById(id: string)` : Récupère les détails de contact d'un artisan par son identifiant.
 * - `searchArtisans(keyword: string)` : Effectue une recherche parmi les artisans par mot-clé.
 * - `getArtisanByTop()` : Retourne les artisans ayant le statut "top".
 * - `getAllCategories()` : Retourne les catégories uniques des artisans.
 * - `reloadDatas()` : Recharge toutes les données artisans, contacts, et catégories.
 */
@Injectable({
  providedIn: 'root',
})
export class ArtisanService {
  // URL du fichier JSON contenant les données des artisans
  private dataUrl = '/datas.json';

  // Sujet réactif pour gérer les fiches des artisans (ArtisanCard)
  private _artisansSubject = new BehaviorSubject<ArtisanCard[]>([]);
  /**
   * Observable exposant la liste des artisans sous forme de fiches (`ArtisanCard`).
   * Abonnez-vous pour accéder aux artisans ou recevoir les mises à jour en temps réel.
   */
  public artisans$: Observable<ArtisanCard[]> = this._artisansSubject.asObservable();

  // Sujet réactif pour gérer les détails de contact des artisans (ContactCard)
  private _contactsSubject = new BehaviorSubject<ContactCard[]>([]);
  /**
   * Observable exposant la liste des contacts des artisans (`ContactCard`).
   * Permet de récupérer les informations détaillées des artisans.
   */
  public contacts$: Observable<ContactCard[]> = this._contactsSubject.asObservable();

  // Sujet réactif pour gérer les catégories uniques des artisans
  private _categoriesSubject = new BehaviorSubject<string[]>([]);
  /**
   * Observable exposant les catégories uniques des artisans.
   * Utilisé pour gérer les filtres ou afficher les catégories dans les composants.
   */
  public categories$: Observable<string[]> = this._categoriesSubject.asObservable();

  constructor(private http: HttpClient) {
    // Charger les données des artisans, des contacts et des catégories à l'initialisation
    this.loadArtisans();
    this.loadContacts();
    this.loadCategories();
  }

  /**
   * Charge les données des artisans et met à jour `_artisansSubject`.
   * Utilise le mécanisme `tap` pour affecter les données au BehaviorSubject.
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
   * Charge les données des contacts et met à jour `_contactsSubject`.
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
   * Charge les catégories uniques des artisans et met à jour `_categoriesSubject`.
   */
  private loadCategories(): void {
    this.getDatasArtisans().pipe(
      map((artisans) =>
        Array.from(new Set(artisans.map((artisan) => artisan.ranking.category)))
      ), // Extrait les catégories uniques
      tap((categories) => this._categoriesSubject.next(categories)), // Met à jour `_categoriesSubject`
      catchError((error) => {
        console.error('[ArtisanService] : Erreur lors du chargement des catégories.', error);
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
   * Récupère les données brutes des artisans à partir du fichier JSON.
   * @returns Observable contenant un tableau des artisans (`Artisan`).
   */
  private getDatasArtisans(): Observable<Artisan[]> {
    return this.http.get<any[]>(this.dataUrl).pipe(
      map((rawData) =>
        rawData
          .map(fromRawToArtisan) // Transforme chaque entrée brute en Artisan
          .filter((artisan): artisan is Artisan => artisan !== null) // Élimine les valeurs nulles
      ),
      catchError((err) => {
        console.error('Erreur lors de la récupération des artisans', err);
        return of([]); // Retourne un tableau vide en cas d'erreur
      })
    );
  }

  /**
   * Récupère tous les artisans sous forme de fiches (`ArtisanCard`).
   * @returns Observable contenant un tableau de fiches ArtisanCard.
   */
  getAllArtisans(): Observable<ArtisanCard[]> {
    return this.artisans$.pipe(
      map((artisans) => artisans)
    );
  }

  /**
   * Récupère les artisans selon une catégorie spécifique.
   * @param category - La catégorie à utiliser pour filtrer les artisans (ex. : "Bâtiment").
   * @returns Observable contenant un tableau d'artisans correspondant à la catégorie.
   */
  getArtisansByCategory(category: string): Observable<ArtisanCard[]> {
    return this.artisans$.pipe(
      map((artisans) => artisans.filter((artisan) => artisan.category === category))
    );
  }

  /**
   * Récupère un artisan spécifique sous forme de fiche (`ArtisanCard`).
   * @param id - Identifiant unique de l'artisan.
   * @returns Observable contenant ArtisanCard ou undefined s'il n'est pas trouvé.
   */
  getArtisanById(id: string): Observable<ArtisanCard | undefined> {
    return this.artisans$.pipe(
      map((artisans) => artisans.find((artisan) => artisan.id === id))
    );
  }

  /**
   * Récupère les détails de contact d'un artisan spécifique (`ContactCard`).
   * @param id - Identifiant unique de l'artisan.
   * @returns Observable contenant ContactCard ou undefined s'il n'est pas trouvé.
   */
  getContactById(id: string): Observable<ContactCard | undefined> {
    return this.contacts$.pipe(
      map((contacts) => contacts.find((contact) => contact.id === id))
    );
  }

  /**
   * Effectue une recherche parmi les artisans par mot-clé.
   * Les mots-clés sont recherchés dans le nom, la spécialité et la localisation.
   * @param keyword - Mot-clé utilisé pour la recherche.
   * @returns Observable contenant les artisans correspondant aux critères de recherche.
   */
  searchArtisans(keyword: string): Observable<ArtisanCard[]> {
    return this.artisans$.pipe(
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
   * @returns Observable contenant les artisans ayant le statut "top".
   */
  getArtisanByTop(): Observable<ArtisanCard[]> {
    return this.artisans$.pipe(
      map((artisans) => artisans.filter((artisan) => artisan.top === true))
    );
  }

  /**
   * Retourne toutes les catégories uniques des artisans.
   * @returns Observable contenant un tableau des catégories uniques.
   */
  getAllCategories(): Observable<string[]> {
    return this.categories$;
  }
}
