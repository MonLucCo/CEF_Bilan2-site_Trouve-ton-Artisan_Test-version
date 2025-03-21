import { ArtisanRanking } from "../models/artisan-ranking.models";

/**
 * Transforme les données brutes en une structure `Ranking`.
 * @param raw - Les données brutes contenant les propriétés `id`, `category`, et `top`.
 * @returns Un objet `Ranking`.
 */
export function fromRawToRanking(raw: any): ArtisanRanking {
  if (!raw || !raw.id || !raw.category) {
    throw new Error('Données invalides pour Ranking.');
  }

  return {
    id: raw.id,
    category: raw.category,
    top: raw.top || false // Valeur par défaut si `top` est non défini
  };
}
