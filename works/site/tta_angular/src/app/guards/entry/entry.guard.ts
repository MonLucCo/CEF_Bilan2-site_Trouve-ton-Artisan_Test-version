import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const entryGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // Fonction utilitaire pour rediriger vers la page d'erreur
  const redirectToError = (message: string, details?: any): boolean => {
    console.warn(`[entryGuard] ${message}`, details || '');
    router.navigate(['/erreur-404']);
    return false; // Bloque la navigation actuelle
  };

  // Extraction des queryParams
  const params = route.queryParamMap;
  const category = params.get('categorie');
  const keyword = params.get('recherche');

  // Recherche de paramètres icorrects à travers `queryParamMap`
  const allowedParams = ['categorie', 'recherche'];
  const extraParams = route.queryParamMap.keys.filter(
    (param) => !allowedParams.includes(param)
  );

  // Log de l'URL cible et des informations de débogage
  console.log('[artisansGuard] Tentative de navigation vers :', {
    stateUrl: state.url,
    routeQueryParams: params,
    routeParams: route.paramMap,
    allowedParams: allowedParams,
    extraParams: extraParams
  });

  if (extraParams.length > 0) {
    return redirectToError('Paramètres inattendus détectés.', extraParams);
  }

  // Log des informations pour le débogage
  console.log("[entryGuard] Validation des paramètres d'entrée :", { category, keyword });

  // Logique de validation
  if (category && keyword) {
    router.navigate(['/artisans/categorie', category], { queryParams: { recherche: keyword } });
  } else if (category) {
    router.navigate(['/artisans/categorie', category], { queryParams: { recherche: category } });
  } else if (keyword) {
    router.navigate(['/artisans/recherche', keyword], { queryParams: { recherche: keyword } });
  } else {
    // Aucune correspondance trouvée, redirection vers l'accueil
    router.navigate(['/accueil']);
  }

  return false; // Refuse l'accès direct à cette route
};
