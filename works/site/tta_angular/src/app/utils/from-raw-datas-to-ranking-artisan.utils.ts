import { ArtisanRanking } from "../models/artisan-service.models";

/**
 * Transforme les données brutes en une structure `Ranking` de l'Artisan.
 * @param raw - Les données brutes contenant les propriétés `category` et `top`.
 * @returns Un objet `Ranking` ou `null` si les données sont invalides.
 */
export function fromRawToRanking(raw: any): ArtisanRanking | null {
  if (!raw || !raw.category) {
    console.warn('Données invalides pour Ranking.', raw);
    return null; // Retourne null si la catégorie est absente
  }

  return {
    category: raw.category,
    top: raw.top || false // Par défaut, non "top" si aucune valeur n'est fournie
  };
}
