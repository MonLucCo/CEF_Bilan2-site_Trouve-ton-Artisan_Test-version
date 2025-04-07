import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

/**
 * Redirection par le Guard pour une route dynamique : 
 *  de /artisans/contact/:id vers /artisans?contact=:id
 * 
 * @param route 
 * @param state 
 * @returns Navigation vers la route sous forme de requête ou erreur-404
 */
export const contactRedirectGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // Récupérer l'ID à partir des paramètres de l'URL
  const contactId = route.params['id'];

  // Log de l'URL cible
  console.log('[contactRedirectGuard] Tentative de navigation vers :',
    {
      routeUrl: route.url,
      routeQueryParams: route.queryParams,
      routeParams: route.params,
      extractedContactId: contactId
    });

  // Vérifier si l'ID est présent
  if (contactId) {
    // Redirection vers artisans avec le queryParam correspondant
    console.log('[contactRedirectGuard] Redirection vers /artisans?contact=', contactId);
    router.navigate(['/artisans'], { queryParams: { contact: contactId } });
    return false; // Stop la navigation vers la route actuelle
  }

  console.warn('[contactRedirectGuard] Paramètre "id" manquant dans la route.');
  router.navigate(['/erreur-404']); // Redirection en cas d'ID manquant
  return false; // Stop la navigation
};
