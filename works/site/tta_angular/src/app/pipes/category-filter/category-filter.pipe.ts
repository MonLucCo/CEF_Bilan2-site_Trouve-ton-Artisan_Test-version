import { Pipe, PipeTransform } from '@angular/core';
import { ArtisanCard } from '../../models/artisan-card.models';

export function categoryFilter(artisans: ArtisanCard[], category: string): ArtisanCard[] {
  return artisans.filter((artisan) => artisan.category === category);
}
@Pipe({
  name: 'categoryFilter',
  standalone: false
})
export class CategoryFilterPipe implements PipeTransform {

  transform(artisans: ArtisanCard[], category: string): ArtisanCard[] {
    return categoryFilter(artisans, category);
  }

}
