import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { SharedService } from '../../services/shared/shared.service';

export const clearUrlGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const sharedService = inject(SharedService);

  // Vérification s'il y a des paramètres dans l'URL
  const queryParams = route.queryParamMap.keys;

  if (queryParams.length > 0) {
    console.log('[clearUrlGuard] Paramètres détectés et supprimés :', { url: state.url, queryParams });

    // Redirection vers l'URL propre sans paramètres
    router.navigate([state.url.split('?')[0]]);
    return false; // Bloque la navigation vers l'URL avec paramètres
  }

  // Gestion spécifique pour la route `/erreur-404`
  if (state.url === '/erreur-404') {
    console.log('[clearUrlGuard] Contexte d\'erreur détecté. Mise à jour des données de SharedService.');
    sharedService.setContextMode('erreur'); // Nouveau contexte pour le mode erreur
    sharedService.setCategory(null); // Réinitialise la catégorie
    sharedService.setKeyword(''); // Réinitialise les mots-clés
    // Ne modifie pas FiltredMode ni SearchMode
    return true;
  }

  // Gestion spécifique pour la route `/accueil`
  if (state.url === '/accueil') {
    console.log('[clearUrlGuard] Contexte d\'accueil détecté. Mise à jour des données de SharedService.');
    sharedService.setContextMode('list'); // Contexte liste par défaut pour l'accueil
    sharedService.setCategory(null); // Réinitialise la catégorie
    sharedService.setKeyword(''); // Réinitialise les mots-clés
    // Ne modifie pas FiltredMode ni SearchMode
    return true;
  }

  // Cas générique pour les routes futures
  console.warn('[clearUrlGuard] Route inattendue détectée. Aucun traitement spécifique appliqué.', { url: state.url });
  // Par précaution, ne modifie pas les observables du SharedService ici
  return true; // Autorise la navigation pour éviter un blocage
};
