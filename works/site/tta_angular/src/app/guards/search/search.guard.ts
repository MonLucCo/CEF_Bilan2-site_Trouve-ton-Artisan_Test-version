import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchGuard implements CanActivate {
  constructor(private router: Router) { }

  /**
   * Vérifie l'accès à une route en validant les paramètres de recherche et de catégorie.
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    // passage dans le Guard à partir de quelle url
    console.log("[SearchGuard] Appel du Guard à partir de l'url :", { stateUrl: state.url });
    // Extraction des paramètres via `queryParamMap`
    const searchTerm = route.queryParamMap.get('recherche') || route.paramMap.get('keyword');
    const category = route.queryParamMap.get('categorie') || route.paramMap.get('category');

    // Log des informations pour le débogage
    console.log('[SearchGuard] Tentative de navigation avec paramètres :', {
      routeUrl: route.url,
      stateUrl: state.url,
      routeQueryParams: route.queryParamMap,
      routeParams: route.paramMap,
      extractedCategory: category,
      extractedSearchTerm: searchTerm
    });

    // Validation des paramètres requis
    if ((!searchTerm || searchTerm.trim() === '' || searchTerm.trim() === 'undefined') &&
      (!category || category.trim() === '' || category.trim() === 'undefined')) {
      console.warn('[SearchGuard] : Paramètres absents ou invalides.');
      this.router.navigate(['/erreur-404']); // Redirection vers la page 404 si aucun paramètre valide
      return of(false); // Empêche la navigation
    }

    console.log('[SearchGuard] : Paramètres valides détectés :', {
      search: searchTerm,
      categorie: category
    });
    return of(true); // Autorise la navigation si au moins un paramètre est valide
  }
}
