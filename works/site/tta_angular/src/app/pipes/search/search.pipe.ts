import { Pipe, PipeTransform } from '@angular/core';
import { Artisan } from '../../services/data/data.service';

@Pipe({
  name: 'search',
  standalone: false
})
export class SearchPipe implements PipeTransform {
  transform(artisans: Artisan[], keyword: string): Artisan[] {
    if (!artisans || !keyword) {
      return artisans;
    }
    return artisans.filter((artisan) =>
      [artisan.name, artisan.location, artisan.specialty].some((field) =>
        field.toLowerCase().includes(keyword.toLowerCase())
      )
    );
  }
}
