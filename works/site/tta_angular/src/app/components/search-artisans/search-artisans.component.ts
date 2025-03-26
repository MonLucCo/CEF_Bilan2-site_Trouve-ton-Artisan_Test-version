
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ArtisanCard } from '../../models/artisan-card.models';
import { ArtisanService } from '../../services/artisan/artisan.service';

@Component({
  selector: 'app-search-artisans',
  standalone: false,
  templateUrl: './search-artisans.component.html',
  styleUrl: './search-artisans.component.scss'
})
export class SearchArtisansComponent {
  artisans$: Observable<ArtisanCard[]>;

  constructor(private route: ActivatedRoute, private artisanService: ArtisanService) {
    this.artisans$ = this.route.queryParams.pipe(
      switchMap(params => {
        const category = params['category']; // Domaine
        const keyword = params['keyword']; // Mot-clé

        if (category && keyword) {
          return this.artisanService.searchArtisans(keyword).pipe(
            switchMap(results =>
              this.artisanService.getArtisansByCategory(category).pipe(
                map(categoryResults => categoryResults.filter(artisan => results.includes(artisan)))
              )
            )
          );
        } else if (keyword) {
          return this.artisanService.searchArtisans(keyword);
        } else if (category) {
          return this.artisanService.getArtisansByCategory(category);
        } else {
          return this.artisanService.getAllArtisans();
        }
      })
    );
  }
}
