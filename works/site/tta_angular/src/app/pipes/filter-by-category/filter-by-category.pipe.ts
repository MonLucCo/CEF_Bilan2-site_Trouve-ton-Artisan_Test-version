import { Pipe, PipeTransform } from '@angular/core';
import { Artisan } from '../../models/artisan.models';
import { ArtisanCard } from '../../models/artisan-card.models';
import { transformToArtisan, transformToArtisanCard } from '../../utils/data-transform.utils';

/**
 * Pipe pour filtrer les artisans par catégorie.
 */
@Pipe({
  name: 'filterByCategory',
  standalone: false
})
export class FilterByCategoryPipe implements PipeTransform {
  /**
   * Filtre et transforme une liste d'artisans en fonction d'une catégorie donnée.
   * @param artisans - Liste brute d'artisans.
   * @param category - Catégorie cible pour le filtrage.
   * @returns Artisan[] ou ArtisanCard[] selon le modèle adapté.
   */
  transform(artisans: any[], category: string): Artisan[] | ArtisanCard[] {
    const filtered = artisans
      .filter((artisan: any) => artisan && artisan.ranking?.category === category)
      .filter(Boolean); // Élimine les valeurs nulles

    const cardModel = filtered.map(transformToArtisanCard);
    const artisanModel = filtered.map(transformToArtisan);

    return artisanModel.length > 0 ? artisanModel : cardModel;
  }

}
