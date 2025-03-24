import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtisanCard } from '../../models/artisan-card.models';
import { ArtisanService } from '../../services/artisan/artisan.service';
import { map, Observable, switchMap } from 'rxjs';

/**
 * Composant pour afficher les artisans par catégorie.
 */
@Component({
  selector: 'app-category-artisans',
  standalone: false,
  templateUrl: './category-artisans.component.html',
  styleUrls: ['./category-artisans.component.scss']
})
export class CategoryArtisansComponent {
  artisans$: Observable<ArtisanCard[]>; // Observable des artisans
  category$: Observable<string | null>; // Observable de la catégorie

  constructor(
    private route: ActivatedRoute,
    private artisanService: ArtisanService
  ) {
    // Charger les artisans en fonction de la catégorie
    this.category$ = this.route.paramMap.pipe(map(params => params.get('category')));
    this.artisans$ = this.category$.pipe(
      switchMap(category => category ? this.artisanService.getArtisansByCategory(category) : [])
    );
  }
}
