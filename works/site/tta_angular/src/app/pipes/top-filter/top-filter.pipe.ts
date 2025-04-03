import { Pipe, PipeTransform } from '@angular/core';
import { ArtisanCard } from '../../models/artisan-card.models';

export function topFilter(artisans: ArtisanCard[]): ArtisanCard[] {
  return artisans.filter((artisan) => artisan.top);
}

@Pipe({
  name: 'topFilter',
  standalone: false
})
export class TopFilterPipe implements PipeTransform {

  transform(artisans: ArtisanCard[]): ArtisanCard[] {
    return topFilter(artisans);
  }

}
