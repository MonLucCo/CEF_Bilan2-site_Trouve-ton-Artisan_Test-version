import { Pipe, PipeTransform } from '@angular/core';
import { Artisan } from '../../services/data/data.service';

@Pipe({
  name: 'topArtisans',
  standalone: false
})
export class TopArtisansPipe implements PipeTransform {
  transform(artisans: Artisan[]): Artisan[] {
    return artisans.filter((artisan) => artisan.top);
  }
}
