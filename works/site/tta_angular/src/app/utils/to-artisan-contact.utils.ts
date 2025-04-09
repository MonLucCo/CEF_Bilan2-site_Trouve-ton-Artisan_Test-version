import { Artisan, ArtisanContact } from '../models/artisan-service.models';

/**
 * Fonction utilitaire pour transformer un artisan complet en détail de l'artisan (InformationArtisan).
 * @param artisan - L'objet complet de type Artisan.
 * @returns Un résumé de type ArtisanSummary.
 */
export function toArtisanContact(artisan: Artisan): ArtisanContact {
    return {
        about: artisan.contact.about, // Description ou biographie de l'artisan
        email: artisan.contact.email, // Adresse e-mail
        website: artisan.contact.website // Site web (optionnel)
    };
}
