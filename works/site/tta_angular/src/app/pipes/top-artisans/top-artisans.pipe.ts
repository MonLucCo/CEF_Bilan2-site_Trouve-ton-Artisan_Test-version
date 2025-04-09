import { Pipe, PipeTransform } from '@angular/core';
import { Artisan, ArtisanCard } from '../../models/artisan-service.models';
import { transformToArtisan, transformToArtisanCard } from '../../utils/data-transform.utils';


/**
 * Pipe pour filtrer les artisans classés "top".
 */
@Pipe({
  name: 'topArtisans',
  standalone: false
})
export class TopArtisansPipe implements PipeTransform {
  /**
   * Filtre et transforme une liste d'artisans pour les artisans "top".
   * @param artisans - Liste brute d'artisans.
   * @returns Artisan[] ou ArtisanCard[] selon le modèle adapté.
   */
  transform(artisans: any[]): Artisan[] | ArtisanCard[] {
    const filtered = artisans
      .filter((artisan: any) => artisan && artisan.ranking?.top)
      .filter(Boolean); // Élimine les valeurs nulles

    const cardModel = filtered.map(transformToArtisanCard);
    const artisanModel = filtered.map(transformToArtisan);

    return artisanModel.length > 0 ? artisanModel : cardModel;
  }

}
