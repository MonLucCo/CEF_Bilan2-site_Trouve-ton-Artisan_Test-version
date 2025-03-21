import { Artisan } from '../models/artisan.models';
import { ArtisanCard } from '../models/artisan-card.models';

/**
 * Fonction utilitaire pour transformer un artisan complet en un résumé d'artisan (ArtisanSummary).
 * @param artisan - L'objet complet de type Artisan.
 * @returns Un résumé de type ArtisanSummary.
 */
export function toArtisanCard(artisan: Artisan | undefined): ArtisanCard {
    if (!artisan) {
        throw new Error('Artisan invalide : l’objet est undefined ou null.');
    }
    return {
        id: artisan.ranking.id,                // ID provenant de la partie Ranking
        category: artisan.ranking.category,    // Catégorie provenant de la partie Ranking
        name: artisan.profile.name,            // Nom provenant de la partie Summary
        note: artisan.profile.note,            // Note provenant de la partie Summary
        specialty: artisan.profile.specialty,  // Spécialité provenant de la partie Summary
        location: artisan.profile.location     // Localisation provenant de la partie Summary
    };
}
