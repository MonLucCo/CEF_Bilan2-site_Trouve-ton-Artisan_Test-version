import { Pipe, PipeTransform } from '@angular/core';
import { ArtisanCard } from '../../models/artisan-service.models';

export function searchFilter(artisans: ArtisanCard[], keyword: string): ArtisanCard[] {
  return artisans.filter((artisan) =>
    artisan.name.toLowerCase().includes(keyword.toLowerCase()) ||
    artisan.specialty.toLowerCase().includes(keyword.toLowerCase()) ||
    artisan.location.toLowerCase().includes(keyword.toLowerCase())
  );
}
@Pipe({
  name: 'searchFilter',
  standalone: false
})
export class SearchFilterPipe implements PipeTransform {

  transform(artisans: ArtisanCard[], keyword: string): ArtisanCard[] {
    return searchFilter(artisans, keyword);
  }
}
