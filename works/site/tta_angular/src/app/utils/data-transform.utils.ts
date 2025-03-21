import { Artisan } from '../models/artisan.models';
import { ArtisanCard } from '../models/artisan-card.models';

/**
 * Transforme un objet brut en modèle ArtisanCard.
 * Permet d'obtenir une vue synthétique de l'artisan.
 * @param artisan - L'objet brut représentant un artisan.
 * @returns Le modèle transformé en ArtisanCard.
 */
export function transformToArtisanCard(artisan: any): ArtisanCard {
    return {
        id: artisan.id, // Identifiant unique
        category: artisan.ranking.category, // Catégorie de l'artisan
        name: artisan.profile.name, // Nom ou entreprise
        note: artisan.profile.note, // Note moyenne sur 5
        specialty: artisan.profile.specialty, // Spécialité
        location: artisan.profile.location // Localisation
    };
}

/**
 * Transforme un objet brut en modèle Artisan.
 * Fournit une vue complète et détaillée de l'artisan.
 * @param artisan - L'objet brut représentant un artisan.
 * @returns Le modèle transformé en Artisan.
 */
export function transformToArtisan(artisan: any): Artisan {
    return {
        id: artisan.id, // Identifiant unique
        ranking: {
            category: artisan.ranking.category, // Catégorie de l'artisan
            top: artisan.ranking.top // Indique si l'artisan est au top
        },
        profile: {
            name: artisan.profile.name, // Nom ou entreprise
            note: artisan.profile.note, // Note moyenne sur 5
            specialty: artisan.profile.specialty, // Spécialité
            location: artisan.profile.location // Localisation
        },
        contact: {
            about: artisan.contact.about, // Description de l'artisan
            email: artisan.contact.email, // Email
            website: artisan.contact.website // Site web facultatif
        }
    };
}
