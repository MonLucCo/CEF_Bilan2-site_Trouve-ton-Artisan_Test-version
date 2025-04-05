import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtisanCard } from '../../models/artisan-card.models';
import { ArtisanService } from '../../services/artisan/artisan.service';
import { BehaviorSubject, catchError, map, Observable, Subject, switchMap, takeUntil } from 'rxjs';

/**
 * Composant pour afficher les artisans par catégorie à partir de l'url.
 */
@Component({
  selector: 'app-category-artisans',
  standalone: false,
  templateUrl: './category-artisans.component.html',
  styleUrl: './category-artisans.component.scss'
})
export class CategoryArtisansComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>(); // Pour gérer les abonnements
  private categorySubject = new BehaviorSubject<string | null>(null); // Stocker la catégorie

  artisans: ArtisanCard[] = []; // Liste des artisans
  category: string | null = null; // Catégorie actuelle

  constructor(
    private route: ActivatedRoute,
    private artisanService: ArtisanService
  ) { }

  ngOnInit(): void {
    // Trace du chemin de chargement du module
    console.log('[CategoryArtisan]-[ngOnInit] Initialisation du composant et des abonnements.');

    // Charger la catégorie depuis l'URL et mettre à jour le BehaviorSubject
    this.route.paramMap.pipe(
      takeUntil(this.destroy$)
    ).subscribe(params => {
      const category = params.get('category');
      this.categorySubject.next(category);
    });

    // Charger les artisans en fonction de la catégorie
    this.categorySubject.pipe(
      switchMap(category =>
        category ? this.artisanService.getArtisansByCategory(category) : []
      ),
      catchError(() => {
        console.error('Erreur lors du chargement des artisans.');
        return [];
      }),
      takeUntil(this.destroy$)
    ).subscribe(artisans => {
      this.artisans = artisans;
      this.category = this.categorySubject.getValue();
    });

  }

  ngOnDestroy(): void {
    // Trace du chemin de chargement du module
    console.log('[CategoryArtisan]-[ngOndestroy] Destruction du composant et des abonnements.');

    // Libérer les ressources
    this.destroy$.next();
    this.destroy$.complete();
  }
}