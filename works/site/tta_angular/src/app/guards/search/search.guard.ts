import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SearchGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const queryParams = route.queryParams;
    const keyword = queryParams['keyword'];
    const category = queryParams['category'];

    if (keyword || category) {
      return true; // Autoriser si l'un des paramètres est présent
    }

    this.router.navigate(['/erreur-404']);
    return false; // Rediriger si aucun paramètre n'est fourni
  }
}
