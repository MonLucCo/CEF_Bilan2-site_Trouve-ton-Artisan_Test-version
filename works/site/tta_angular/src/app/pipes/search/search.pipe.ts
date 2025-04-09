import { Pipe, PipeTransform } from '@angular/core';
import { Artisan, ArtisanCard } from '../../models/artisan-service.models';
import { transformToArtisan, transformToArtisanCard } from '../../utils/data-transform.utils';

/**
 * Pipe pour rechercher des artisans à partir d'un mot-clé.
 */
@Pipe({
  name: 'search',
  standalone: false
})
export class SearchPipe implements PipeTransform {
  /**
   * Recherche des artisans en fonction du mot-clé fourni.
   * @param artisans - Liste brute d'artisans à filtrer.
   * @param keyword - Mot-clé pour effectuer la recherche (ex. : "Paris", "Plombier").
   * @returns Une liste filtrée contenant uniquement les artisans correspondant au mot-clé.
   */
  transform(artisans: any[], keyword: string): Artisan[] | ArtisanCard[] {
    if (!keyword || keyword.trim().length === 0) {
      return artisans.filter(Boolean); // Ignore les artisans nuls
    }

    const lowercaseKeyword = keyword.toLowerCase(); // Convertir le mot-clé en minuscule pour une recherche non sensible à la casse

    // Filtrer les artisans contenant le mot-clé dans leurs informations principales
    const filtered = artisans
      .filter(artisan =>
        artisan.profile?.name?.toLowerCase().includes(lowercaseKeyword) || // Recherche dans le nom
        artisan.profile?.specialty?.toLowerCase().includes(lowercaseKeyword) || // Recherche dans la spécialité
        artisan.profile?.location?.toLowerCase().includes(lowercaseKeyword) // Recherche dans la localisation
      )
      .filter(Boolean); // Élimine les nulls

    // Appliquer les utilitaires pour la transformation des données
    const cardModel = filtered.map(transformToArtisanCard); // Utilise la fonction utilitaire pour ArtisanCard
    const artisanModel = filtered.map(transformToArtisan); // Utilise la fonction utilitaire pour Artisan

    // Retourner le modèle approprié (Artisan ou ArtisanCard)
    return artisanModel.length > 0 ? artisanModel : cardModel;
  }
}
