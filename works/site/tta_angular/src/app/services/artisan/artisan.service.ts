import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Artisan } from '../../models/artisan.models';
import { ArtisanCard } from '../../models/artisan-card.models';
import { toArtisanCard } from '../../utils/to-artisan-card.utils';
import { ArtisanContact } from '../../models/artisan-contact.models';
import { toArtisanContact } from '../../utils/to-artisan-contact.utils';
import { fromRawToArtisan } from '../../utils/from-raw-datas-to-artisan.utils';

@Injectable({
  providedIn: 'root'
})
export class ArtisanService {
  private dataUrl = '/datas.json'; // URL du fichier JSON contenant les artisans

  constructor(private http: HttpClient) { }

  /**
   * Récupère les données de la liste complète des artisans à partir du fichier JSON.
   * @returns Observable contenant un tableau d'artisans.
   */
  private getDatasArtisans(): Observable<Artisan[]> {
    return this.http.get<Artisan[]>(this.dataUrl).pipe(
      map(rawData => rawData.map(fromRawToArtisan))
    );
  }

  /**
   * Récupère les données des détails d'un artisan spécifique en fonction de son ID.
   * @param id - L'identifiant unique de l'artisan.
   * @returns Observable contenant l'artisan correspondant, ou undefined s'il n'est pas trouvé.
   */
  private getDatasArtisanById(id: string): Observable<Artisan | undefined> {
    return this.getDatasArtisans().pipe(
      map(artisans => artisans.find(artisan => artisan.ranking.id === id))
    );
  }

  /**
   * Filtre les données des artisans selon une catégorie spécifique.
   * @param category - La catégorie à utiliser pour filtrer les artisans (ex. : "Bâtiment").
   * @returns Observable contenant un tableau d'artisans correspondant à la catégorie.
   */
  private getDatasArtisansByCategory(category: string): Observable<Artisan[]> {
    return this.getDatasArtisans().pipe(
      map(artisans => artisans.filter(artisan => artisan.ranking.category === category))
    );
  }

  /**
   * Récupère les données des artisans marqués comme étant "top".
   * @returns Observable contenant un tableau des artisans marqués comme "top".
   */
  private getDatasArtisansByTop(): Observable<Artisan[]> {
    return this.getDatasArtisans().pipe(
      map(artisans => artisans.filter(artisan => artisan.ranking.top === true))
    );
  }

  /**
   * Effectue une recherche parmi les données des artisans selon des mots-clés.
   * Les mots-clés sont recherchés dans les champs nom, spécialité et localisation.
   * @param keyword - Le mot-clé utilisé pour la recherche (ex. : "menuisier").
   * @returns Observable contenant un tableau d'artisans correspondant aux critères de recherche.
   */
  private searchDatasArtisans(keyword: string): Observable<Artisan[]> {
    return this.getDatasArtisans().pipe(
      map(artisans =>
        artisans.filter(artisan =>
          artisan.profile.name.toLowerCase().includes(keyword.toLowerCase()) ||
          artisan.profile.specialty.toLowerCase().includes(keyword.toLowerCase()) ||
          artisan.profile.location.toLowerCase().includes(keyword.toLowerCase())
        )
      )
    );
  }

  /**
   * Fourni tous les résumés des artisans.
   * @returns Observable contenant un tableau de résumés ArtisanSummary.
   */
  getAllArtisans(): Observable<ArtisanCard[]> {
    return this.getDatasArtisans().pipe(
      map(artisans => artisans.map(toArtisanCard)) // Convertir tous les artisans
    );
  }

  /**
   * Fourni les résumés des artisans pour une catégorie donnée.
   * @param category - La catégorie utilisée pour filtrer les artisans (ex. : "Bâtiment").
   * @returns Observable contenant un tableau de résumés ArtisanSummary.
   */
  getArtisansByCategory(category: string): Observable<ArtisanCard[]> {
    return this.getDatasArtisansByCategory(category).pipe(
      map(artisans =>
        artisans.map(toArtisanCard) // Convertir chaque Artisan en ArtisanSummary
      )
    );
  }

  /**
   * Récupère les résumés des artisans marqués comme étant "top".
   * @returns Observable contenant un tableau de résumés ArtisanSummary.
   */
  getArtisansByTop(): Observable<ArtisanCard[]> {
    return this.getDatasArtisansByTop().pipe(
      map(artisans => artisans.map(toArtisanCard) // Convertir chaque Artisan en ArtisanSummary
      )
    );
  }

  /**
 * Fourni les données d'un artisan spécifique en fonction de son ID sous forme de résumé.
 * @param id - L'identifiant unique de l'artisan.
 * @returns Observable contenant le résumé de l'artisan, ou undefined s'il n'est pas trouvé.
 */
  geArtisan(id: string): Observable<ArtisanCard | undefined> {
    return this.getDatasArtisanById(id).pipe(
      map(artisan => artisan ? toArtisanCard(artisan) : undefined) // Appliquer toArtisanSummary si artisan existe
    );
  }


  /**
 * Fourni les données des informations complémentaires (détails) d'un artisan spécifique en fonction de son ID.
 * @param id - L'identifiant unique de l'artisan.
 * @returns Observable contenant les informations complémentaires de l'artisan, ou undefined s'il n'est pas trouvé.
 */
  getContactArtisan(id: string): Observable<ArtisanContact | undefined> {
    return this.getDatasArtisanById(id).pipe(
      map(artisan => artisan ? toArtisanContact(artisan) : undefined) // Appliquer toArtisanDetails si artisan existe
    );
  }

  /**
   * Fourni une recherche parmi les artisans selon des mots-clés.
   * Les mots-clés sont recherchés dans les champs nom, spécialité et localisation.
   * @param keyword - Le mot-clé utilisé pour la recherche (ex. : "menuisier").
   * @returns Observable contenant un tableau d'artisans correspondant aux critères de recherche.
   */
  searchArtisans(keyword: string): Observable<ArtisanCard[]> {
    return this.searchDatasArtisans(keyword).pipe(
      map(artisans => artisans.map(toArtisanCard)) // Convertir chaque Artisan en ArtisanSummary
    );
  }

}
