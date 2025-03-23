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

    return this.artisanService.getAllCategories().pipe(
      map(validCategories => {
        if (category && validCategories.includes(category)) {
          console.log('[CategoryGard] : Valeur de la catégorie : ', category);
          this.sharedService.setCategory(category); // Définir la catégorie dans le service partagé
          return true; // Autorise l'accès si la catégorie est valide
        }
        this.sharedService.setCategory(null); // Réinitialise la catégorie si invalide
        this.router.navigate(['/erreur-404']); // Redirige si catégorie invalide
        return false;
      }),
      catchError(() => {
        this.sharedService.setCategory(null); // Réinitialise la catégorie si invalide
        this.router.navigate(['/erreur-404']); // Redirige en cas d'erreur
        return of(false); // Refuse l'accès par défaut
      })
    );
  }
}
