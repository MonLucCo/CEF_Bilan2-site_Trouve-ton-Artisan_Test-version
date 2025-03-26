import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { ArtisanService } from '../../services/artisan/artisan.service';
import { SharedService } from '../../services/shared/shared.service';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryGuard implements CanActivate {
  constructor(
    private artisanService: ArtisanService, // Accéder aux catégories valides
    private sharedService: SharedService, // Service partagé
    private router: Router // Rediriger en cas d'erreur
  ) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const category = route.paramMap.get('category'); // Récupère la catégorie depuis l'URL

    // Vérifie si la catégorie est nulle
    if (!category) {
      console.log('[CategoryGuard] : Aucune catégorie fournie.');
      this.sharedService.setCategory(null);
      this.router.navigate(['/erreur-404']); // Redirige si catégorie invalide
      return of(false); // Observable<boolean> renvoyant false
    }
    return this.artisanService.isValidCategory(category).pipe(
      map(isValid => {
        if (isValid) {
          console.log('[CategoryGard] : Catégorie validée : ', category);
          this.sharedService.setCategory(category); // Définir la catégorie dans le service partagé
          console.log('[CategoryGard] : Valeur de la catégorie mise à jour')
          return true; // Autorise l'accès si la catégorie est valide
        } else {
          console.log('[CategoryGard] : Valeur non valide pour la catégorie : ', category);
          this.sharedService.setCategory(null); // Réinitialise la catégorie si invalide
          console.log('[CategoryGard] : Valeur de la catégorie mise à jour : ', null);
          this.router.navigate(['/erreur-404']); // Redirige si catégorie invalide
          console.log('[CategoryGard] : Redirection vers erreur-404')
          return false;
        }
      }),
      catchError((error) => {
        console.error('[CategoryGard]-[Erreur] : Erreur lors de la validation de la catégorie', error);
        this.sharedService.setCategory(null); // Réinitialise la catégorie si invalide
        console.log('[CategoryGard]-[Erreur] : Valeur de la catégorie mise à jour : ', null);
        this.router.navigate(['/erreur-404']); // Redirige en cas d'erreur
        console.log('[CategoryGard]-[Erreur] : Redirection vers erreur-404')
        return of(false); // Refuse l'accès par défaut
      })
    );
  }
}
