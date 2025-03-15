import { Pipe, PipeTransform } from '@angular/core';
import { Artisan } from '../../services/data/data.service';

@Pipe({
  name: 'filterByCategory',
  standalone: false
})
export class FilterByCategoryPipe implements PipeTransform {
  transform(artisans: Artisan[], category: string): Artisan[] {
    if (!artisans || !category) {
      return artisans;
    }
    return artisans.filter((artisan) =>
      artisan.category.toLowerCase() === category.toLowerCase()
    );
  }
}
