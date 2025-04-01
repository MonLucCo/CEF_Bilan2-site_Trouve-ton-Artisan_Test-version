import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SharedService } from '../../services/shared/shared.service';
import { ArtisanService } from '../../services/artisan/artisan.service';

export const artisansGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const sharedService = inject(SharedService);
  const artisanService = inject(ArtisanService);

  console.log("[artisansGuard] Appel du Guard à partir de l'url :", { stateUrl: state.url });

  // Fonction utilitaire pour rediriger vers la page d'erreur
  const redirectToError = (message: string, details?: any): boolean => {
    console.warn(`[artisansGuard] ${message}`, details || '');
    router.navigate(['/erreur-404']);
    return false;
  };

  // Extraction des paramètres depuis queryParamMap et paramMap
  const queryParams = route.queryParamMap;
  const params = route.paramMap;
  const category = queryParams.get('categorie') || params.get('category');
  const keyword = queryParams.get('recherche') || params.get('keyword');
  const contactId = queryParams.get('contact') || params.get('id');

  console.log('[artisansGuard] Tentative de navigation vers :', {
    stateUrl: state.url,
    category,
    keyword,
    contactId,
  });

  // Vérification des contextes exclusifs
  const isListContext =
    (category && category.trim() !== '' && category.trim() !== 'undefined') ||
    (keyword && keyword.trim() !== '' && keyword.trim() !== 'undefined');
  const isContactContext = contactId && contactId.trim() !== '' && contactId.trim() !== 'undefined';

  console.log('[artisansGuard] état des éléments de tests :', {
    categorie: category,
    recherche: keyword,
    contact: contactId,
    isListContext,
    isContactContext,
  });

  // **Contexte contact**
  if (isContactContext && artisanService.isValidContact(contactId)) {
    console.log("[artisansGuard] Contexte 'Contact' détecté et validé.");
    sharedService.setContextMode('contact'); // Mise à jour du mode de contexte
    sharedService.setKeyword(''); // Réinitialise le mot-clé pour éviter des conflits
    router.navigate(['/artisans/contact', contactId]);
    return false;
  }

  // **Contexte liste**
  if (isListContext) {
    sharedService.setContextMode('list'); // Mise à jour du mode de contexte
    sharedService.setCategory(category || null);
    sharedService.setKeyword(keyword || '');

    if (category && keyword) {
      console.log('[artisansGuard] Contexte Liste avec Catégorie et Recherche détecté.');
      sharedService.setFiltredMode('fullFiltred'); // Mode combiné
      router.navigate(['/artisans/categorie', category], { queryParams: { recherche: keyword } });
    } else if (category) {
      console.log('[artisansGuard] Contexte Liste avec Catégorie détecté.');
      sharedService.setFiltredMode('categoryOnly'); // Filtrage par catégorie uniquement
      router.navigate(['/artisans/categorie', category]);
    } else if (keyword) {
      console.log('[artisansGuard] Contexte Liste avec Recherche détecté.');
      sharedService.setFiltredMode('searchOnly'); // Filtrage par recherche uniquement
      router.navigate(['/artisans/recherche', keyword]);
    }
    return false;
  }

  // Aucun contexte valide détecté
  console.warn('[artisansGuard] Aucun contexte valide détecté. Redirection vers la route /accueil.');
  sharedService.setContextMode('list'); // Définit le mode de contexte par défaut
  sharedService.setCategory(null); // Réinitialise la catégorie
  sharedService.setKeyword(''); // Réinitialise les mots-clés
  sharedService.setFiltredMode('searchOnly'); // Mode par défaut lors de la redirection
  router.navigate(['/accueil']);
  return false;
};
