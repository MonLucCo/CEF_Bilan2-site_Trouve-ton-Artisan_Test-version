import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, combineLatest, switchMap, map, takeUntil } from 'rxjs';
import { ArtisanCard } from '../../models/artisan-service.models';
import { ArtisanService } from '../../services/artisan/artisan.service';
import { SharedService } from '../../services/shared/shared.service';

@Component({
  selector: 'app-list-artisans',
  standalone: false,
  templateUrl: './list-artisans.component.html',
  styleUrl: './list-artisans.component.scss'
})
export class ListArtisansComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>(); // Pour gérer les abonnements
  artisans: ArtisanCard[] = []; // Liste des artisans récupérés
  isLoading: boolean = true; // Indicateur de chargement

  constructor(
    private artisanService: ArtisanService,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    combineLatest([
      this.sharedService.currentCategory$, // Observable pour la catégorie
      this.sharedService.currentKeyword$   // Observable pour le mot-clé
    ])
      .pipe(
        switchMap(([category, keyword]) => {
          // Charger les données minimales nécessaires selon les critères
          if (category && keyword) {
            return this.artisanService.getArtisansByCategoryAndSearch(category, keyword);
          } else if (category) {
            return this.artisanService.getArtisansByCategory(category);
          } else if (keyword) {
            return this.artisanService.searchArtisans(keyword);
          } else {
            return this.artisanService.getAllArtisans(); // Charger tout si aucun critère
          }
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (artisans) => {
          this.artisans = artisans; // Mettre à jour la liste des artisans
          this.isLoading = false; // Fin du chargement
        },
        error: () => {
          console.error('Erreur lors de la récupération des artisans.');
          this.artisans = [];
          this.isLoading = false;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
function searchFilter(categoryResults: ArtisanCard[], keyword: string): any {
  throw new Error('Function not implemented.');
}

