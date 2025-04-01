import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ArtisanService } from '../../services/artisan/artisan.service';
import { SharedService } from '../../services/shared/shared.service';

@Injectable({
  providedIn: 'root',
})
export class ContactGuard implements CanActivate {
  constructor(
    private artisanService: ArtisanService, // Service pour valider l'ID de contact
    private sharedService: SharedService, // Gestion des données réactives
    private router: Router // Gestion des redirections
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    console.log("[ContactGuard] Appel du Guard à partir de l'url :", { stateUrl: state.url });

    // Utilisation de `queryParamMap` et `paramMap` pour extraire l'ID de contact
    const contactId = route.queryParamMap.get('contact') || route.paramMap.get('id');

    console.log('[ContactGuard] Tentative de navigation vers :', {
      routeUrl: route.url,
      stateUrl: state.url,
      routeQueryParams: route.queryParamMap,
      routeParams: route.paramMap,
      extractedContactId: contactId,
    });

    // Vérification de la validité de l'ID de contact
    if (!contactId || contactId.trim() === '' || contactId.trim() === 'undefined') {
      console.warn('[ContactGuard] : Paramètre contact manquant ou invalide.');

      // Mise à jour des contextes pour l'erreur
      this.sharedService.setContextMode('erreur');
      this.sharedService.setCategory(null); // Réinitialise la catégorie
      this.sharedService.setKeyword(''); // Réinitialise les mots-clés

      this.router.navigate(['/erreur-404']); // Redirection vers la route d'erreur
      return of(false); // Empêche la navigation
    }

    // Validation de l'ID via le service ArtisanService
    return this.artisanService.isValidContact(contactId).pipe(
      map((isValid) => {
        if (isValid) {
          console.log('[ContactGuard] : Contact ID valide :', contactId);

          // Mise à jour des contextes pour le contact
          this.sharedService.setContextMode('contact');
          this.sharedService.setKeyword(''); // Réinitialise les mots-clés pour éviter des conflits
          this.sharedService.setCategory(null); // Réinitialise la catégorie pour le contexte contact

          return true; // Autoriser la navigation
        } else {
          console.warn('[ContactGuard] : Contact ID invalide :', contactId);

          // Mise à jour des contextes pour l'erreur
          this.sharedService.setContextMode('erreur');
          this.sharedService.setCategory(null);
          this.sharedService.setKeyword('');

          this.router.navigate(['/erreur-404']); // Redirection si l'ID est invalide
          return false; // Empêche la navigation
        }
      }),
      catchError((error) => {
        console.error('[ContactGuard] : Erreur lors de la validation de contact.', error);

        // Mise à jour des contextes pour l'erreur
        this.sharedService.setContextMode('erreur');
        this.sharedService.setCategory(null);
        this.sharedService.setKeyword('');

        this.router.navigate(['/erreur-404']); // Redirection en cas d'erreur
        return of(false); // Empêche la navigation par défaut
      })
    );
  }
}
