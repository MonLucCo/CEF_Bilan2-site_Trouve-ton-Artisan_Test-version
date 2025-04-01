import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const clearUrlGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // Vérification s'il y a des paramètres dans l'URL
  const queryParams = route.queryParamMap.keys;

  if (queryParams.length > 0) {
    console.log('[clearUrlGuard] Paramètres détectés et supprimés :', { url: state.url, queryParams });

    // Redirection vers l'URL propre sans paramètres
    router.navigate([state.url.split('?')[0]]);
    return false; // Bloque la navigation vers l'URL avec paramètres
  }

  console.log('[clearUrlGuard] Aucun paramètre détecté, navigation autorisée.', { url: state.url });
  return true; // Autorise la navigation si aucun paramètre
};

