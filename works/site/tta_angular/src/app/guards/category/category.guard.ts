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
    console.log("[CategoryGuard] Appel du Guard à partir de l'url :", { stateUrl: state.url });

    // Extraction de la catégorie via `paramMap` ou `queryParamMap`
    const category = route.queryParamMap.get('categorie') || route.paramMap.get('category');

    console.log('[CategoryGuard] Tentative de navigation avec catégorie :', {
      stateUrl: state.url,
      extractedCategory: category,
    });

    // Vérifier si la catégorie est absente ou invalide
    if (!category || category.trim() === '' || category.trim() === 'undefined') {
      console.warn('[CategoryGuard] : Catégorie absente ou invalide.');

      // Mise à jour du contexte et des données partagées
      this.sharedService.setContextMode('erreur'); // Contexte d'erreur
      this.sharedService.setCategory(null); // Réinitialise la catégorie
      this.sharedService.setKeyword(''); // Réinitialise les mots-clés

      this.router.navigate(['/erreur-404']); // Redirection vers la page d'erreur
      return of(false); // Empêche la navigation
    }

    // Validation de la catégorie via ArtisanService
    return this.artisanService.isValidCategory(category).pipe(
      map(isValid => {
        if (!isValid) {
          console.warn('[CategoryGuard] : Catégorie non valide :', category);

          // Mise à jour du contexte et des données partagées pour une erreur
          this.sharedService.setContextMode('erreur');
          this.sharedService.setCategory(null);
          this.sharedService.setKeyword('');

          this.router.navigate(['/erreur-404']); // Redirection si la catégorie est invalide
          return false; // Empêche la navigation
        }

        console.log('[CategoryGuard] : Catégorie validée :', category);

        // Mise à jour du contexte et des données pour un succès
        this.sharedService.setContextMode('list'); // Contexte liste
        this.sharedService.setCategory(category); // Mise à jour de la catégorie
        this.sharedService.setKeyword(''); // Réinitialise les mots-clés (aucun mot-clé pour le contexte catégorie)
        this.sharedService.setFiltredMode('categoryOnly'); // Mode filtré par catégorie

        return true; // Autorise la navigation
      }),
      catchError((error) => {
        console.error('[CategoryGuard] : Erreur lors de la validation de la catégorie.', error);

        // Mise à jour du contexte et des données partagées pour une erreur
        this.sharedService.setContextMode('erreur');
        this.sharedService.setCategory(null);
        this.sharedService.setKeyword('');

        this.router.navigate(['/erreur-404']); // Redirection en cas d'erreur
        return of(false); // Empêche la navigation
      })
    );
  }
}
