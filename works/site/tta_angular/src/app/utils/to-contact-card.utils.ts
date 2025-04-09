import { Artisan, ContactCard } from "../models/artisan-service.models";

/**
 * Fonction utilitaire pour transformer un artisan complet en une fiche de contact d'artisan (ContactCard).
 * @param artisan - L'objet complet de type Artisan.
 * @returns Une fiche de type ContactCard.
 */
export function toContactCard(artisan: Artisan): ContactCard {
    return {
        id: artisan.id,
        about: artisan.contact.about,
        email: artisan.contact.email,
        website: artisan.contact.website,
    };
}