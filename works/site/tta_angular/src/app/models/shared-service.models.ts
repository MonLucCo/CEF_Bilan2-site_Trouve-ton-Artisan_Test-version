/**
 * Chaîne de caractères optionnelle.
 */
export type OptionalString = string | null;

/**
 * Mode de contexte global dans l'application.
 */
export type ContextMode = 'list' | 'accueil' | 'contact' | 'erreur';

/**
 * Mode de filtrage des artisans.
 */
export type FiltredMode = 'searchOnly' | 'categoryOnly' | 'fullFiltred' | null;

/**
 * Mode de recherche (avec validation ou instantanée).
 */
export type SearchMode = 'validateOn' | 'validateOff';
