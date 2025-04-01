import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { ArtisanService } from '../../services/artisan/artisan.service';
import { SharedService } from '../../services/shared/shared.service';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryGuard implements CanActivate {
  constructor(
    private artisanService: ArtisanService, // Vérifie les catégories valides
    private sharedService: SharedService,  // Gère les données partagées
    private router: Router                 // Gère les redirections
  ) { }

  /**
   * Vérifie l'accès à une route en validant la catégorie fournie dans l'URL (via segments ou requêtes).
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    // passage dans le Guard à partir de quelle url
    console.log("[CategoryGuard] Appel du Guard à partir de l'url :", { stateUrl: state.url });

    // Extraction de la catégorie via `paramMap` ou `queryParamMap`
    const category = route.queryParamMap.get('categorie') || route.paramMap.get('category');

    // Log des informations pour le débogage
    console.log('[CategoryGuard] Tentative de navigation vers :', {
      routeUrl: route.url,
      stateUrl: state.url,
      routeQueryParams: route.queryParamMap,
      routeParams: route.paramMap,
      extractedCategory: category,
    });

    // Vérifier si la catégorie est absente ou invalide
    if (!category || category.trim() === '' || category.trim() === 'undefined') {
      console.warn('[CategoryGuard] : Catégorie absente ou invalide.');
      this.sharedService.setCategory(null);
      this.router.navigate(['/erreur-404']); // Redirection vers une page d'erreur
      return of(false); // Empêche la navigation
    }

    // Validation de la catégorie via ArtisanService
    return this.artisanService.isValidCategory(category).pipe(
      map(isValid => {
        if (!isValid) {
          console.warn('[CategoryGuard] : Catégorie non valide :', category);
          this.sharedService.setCategory(null);
          this.router.navigate(['/erreur-404']); // Redirection si non valide
          return false; // Empêche la navigation
        }

        console.log('[CategoryGuard] : Catégorie validée :', category);
        this.sharedService.setCategory(category); // Mise à jour avec la catégorie
        return true; // Autorise la navigation
      }),
      catchError((error) => {
        console.error('[CategoryGuard] : Erreur lors de la validation.', error);
        this.sharedService.setCategory(null); // Nettoyage en cas d'erreur
        this.router.navigate(['/erreur-404']); // Redirection en cas d'erreur
        return of(false); // Empêche la navigation
      })
    );
  }
}
