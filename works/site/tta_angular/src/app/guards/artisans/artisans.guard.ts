import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ArtisanService } from '../../services/artisan/artisan.service';

export const artisansGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const artisanService = inject(ArtisanService);

  // passage dans le Guard à partir de quelle url
  console.log("[artisanGuard] Appel du Guard à partir de l'url :", { stateUrl: state.url });

  // Fonction utilitaire pour rediriger vers la page d'erreur
  const redirectToError = (message: string, details?: any): boolean => {
    console.warn(`[artisansGuard] ${message}`, details || '');
    router.navigate(['/erreur-404']);
    return false; // Bloque la navigation actuelle
  };

  // Extraction des segments et paramètres
  const queryParams = route.queryParamMap;
  const params = route.paramMap;
  const category = queryParams.get('categorie') || params.get('category');
  const keyword = queryParams.get('recherche') || params.get('keyword');
  const contactId = queryParams.get('contact') || params.get('id');

  // Recherche de paramètres incorrects
  const allowedParams = ['categorie', 'recherche', 'contact'];
  const extraParams = route.queryParamMap.keys.filter(
    (param) => !allowedParams.includes(param)
  );

  // Log de l'URL cible et des informations de débogage
  console.log('[artisansGuard] Tentative de navigation vers :', {
    stateUrl: state.url,
    queryParams: queryParams,
    params: params,
    allowedParams: allowedParams,
    extraParams: extraParams,
    category,
    keyword,
    contactId
  });

  // **Arrêt si paramètres interdits**
  if (extraParams.length > 0) {
    return redirectToError('Paramètres inattendus détectés.', extraParams);
  }

  // Validation des contextes exclusifs
  const isListContext =
    (category && category.trim() !== '' && category.trim() !== 'undefined') ||
    (keyword && keyword.trim() !== '' && keyword.trim() !== 'undefined');
  const isContactContext = contactId && contactId.trim() !== '' && contactId.trim() !== 'undefined';

  // Log des validations de contexte
  console.log('[artisansGuard] état des éléments de tests :', {
    categorie: category,
    recherche: keyword,
    contact: contactId,
    isListContext,
    isContactContext,
  });

  // **Priorité au contact, si identifiant valide**
  if (isContactContext && artisanService.isValidContact(contactId)) {
    console.log("[artisansGuard] Contexte 'Fiche contact' détecté et validé.");
    // return contactGuard.canActivate(route, state); // Appel du ContactGuard pour gérer le contexte
    router.navigate(['/artisans/contact', contactId]);
    return false;
  }

  // **Gestion du contexte Liste**
  if (isListContext) {
    // return searchGuard.canActivate(route, state); // Appel du SearchGuard pour gérer le contexte
    if (category && keyword) {
      console.log('[artisansGuard] Contexte Liste avec Catégorie et Recherche détecté.');
      router.navigate(['/artisans/categorie', category], { queryParams: { recherche: keyword } });
    } else if (category) {
      console.log('[artisansGuard] Contexte Liste avec Catégorie détecté.');
      router.navigate(['/artisans/categorie', category]);
    } else if (keyword) {
      console.log('[artisansGuard] Contexte Liste avec Recherche détecté.');
      router.navigate(['/artisans/recherche', keyword]);
    }
    return false;
  }

  // **Arrêt si incohérence des contextes**
  // if (isListContext && isContactContext) {
  //   return redirectToError('Conflit de contexte : Liste et Fiche simultanément.');
  // }

  // Aucun contexte valide, redirection vers l'accueil
  console.log('[artisansGuard] Aucun contexte particulier détecté. Redirection vers la route /accueil.');
  router.navigate(['/accueil']);
  return false;
};
