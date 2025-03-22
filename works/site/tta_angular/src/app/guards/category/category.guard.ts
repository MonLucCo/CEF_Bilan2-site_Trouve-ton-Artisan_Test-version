import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { ArtisanService } from '../../services/artisan/artisan.service';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryGuard implements CanActivate {
  constructor(
    private artisanService: ArtisanService, // Accéder aux catégories valides
    private router: Router // Rediriger en cas d'erreur
  ) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const category = route.paramMap.get('category'); // Récupère la catégorie depuis l'URL

    return this.artisanService.getValidCategories().pipe(
      map(validCategories => {
        if (category && validCategories.includes(category)) {
          return true; // Autorise l'accès si la catégorie est valide
        }
        this.router.navigate(['/erreur-404']); // Redirige si catégorie invalide
        return false;
      }),
      catchError(() => {
        this.router.navigate(['/erreur-404']); // Redirige en cas d'erreur
        return of(false); // Refuse l'accès par défaut
      })
    );
  }
}
