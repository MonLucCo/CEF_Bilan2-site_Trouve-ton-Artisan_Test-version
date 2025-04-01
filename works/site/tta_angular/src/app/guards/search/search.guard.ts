import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { SharedService } from '../../services/shared/shared.service';

@Injectable({
  providedIn: 'root',
})
export class SearchGuard implements CanActivate {
  constructor(
    private router: Router, // Gestion des redirections
    private sharedService: SharedService // Service partagé pour les données réactives
  ) { }

  /**
   * Vérifie l'accès à une route en validant les paramètres de recherche et de catégorie.
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    console.log("[SearchGuard] Appel du Guard à partir de l'url :", { stateUrl: state.url });

    // Extraction des paramètres via `queryParamMap`
    const searchTerm = route.queryParamMap.get('recherche') || route.paramMap.get('keyword');
    const category = route.queryParamMap.get('categorie') || route.paramMap.get('category');

    console.log('[SearchGuard] Tentative de navigation avec paramètres :', {
      routeUrl: route.url,
      stateUrl: state.url,
      routeQueryParams: route.queryParamMap,
      routeParams: route.paramMap,
      extractedCategory: category,
      extractedSearchTerm: searchTerm,
    });

    // Validation des paramètres requis
    if ((!searchTerm || searchTerm.trim() === '' || searchTerm.trim() === 'undefined') &&
      (!category || category.trim() === '' || category.trim() === 'undefined')) {
      console.warn('[SearchGuard] : Paramètres absents ou invalides.');

      // Mise à jour des contextes pour l'erreur
      this.sharedService.setContextMode('erreur'); // Nouveau mode pour le contexte d'erreur
      this.sharedService.setCategory(null); // Réinitialise la catégorie
      this.sharedService.setKeyword(''); // Réinitialise les mots-clés

      this.router.navigate(['/erreur-404']); // Redirection vers la page 404
      return of(false); // Empêche la navigation
    }

    console.log('[SearchGuard] : Paramètres valides détectés :', {
      search: searchTerm,
      categorie: category,
    });

    // Mise à jour des données dans SharedService
    this.sharedService.setContextMode('list'); // Contexte liste pour la recherche
    this.sharedService.setCategory(category || null); // Mise à jour de la catégorie
    this.sharedService.setKeyword(searchTerm || ''); // Mise à jour des mots-clés

    if (category && searchTerm) {
      this.sharedService.setFiltredMode('fullFiltred'); // Mode combiné
    } else if (category) {
      this.sharedService.setFiltredMode('categoryOnly'); // Filtrage par catégorie uniquement
    } else if (searchTerm) {
      this.sharedService.setFiltredMode('searchOnly'); // Filtrage par recherche uniquement
    }

    return of(true); // Autorise la navigation si au moins un paramètre est valide
  }
}
