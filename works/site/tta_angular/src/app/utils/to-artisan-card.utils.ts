import { Artisan } from '../models/artisan.models';
import { ArtisanCard } from '../models/artisan-card.models';

/**
 * Fonction utilitaire pour transformer un artisan complet en une fiche d'artisan (ArtisanCard).
 * @param artisan - L'objet complet de type Artisan.
 * @returns Une fiche de type ArtisanCard.
 */
export function toArtisanCard(artisan: Artisan | undefined): ArtisanCard {
    if (!artisan) {
        throw new Error('Artisan invalide : l’objet est undefined ou null.');
    }
    return {
        id: artisan.id,                        // ID provenant de l'Artisan
        category: artisan.ranking.category,    // Catégorie provenant de la partie Ranking
        name: artisan.profile.name,            // Nom provenant de la partie Profile
        note: artisan.profile.note,            // Note provenant de la partie Profile
        specialty: artisan.profile.specialty,  // Spécialité provenant de la partie Profile
        location: artisan.profile.location     // Localisation provenant de la partie Profile
    };
}
