import { ArtisanContact } from "../models/artisan-service.models";

/**
 * Transforme les données brutes en une structure `Contact` de l'Artisan.
 * @param raw - Les données brutes contenant les propriétés `about`, `email`, et `website`.
 * @returns Un objet `Contact` ou `null` si les données sont invalides.
 */
export function fromRawToContact(raw: any): ArtisanContact | null {
    if (!raw || !raw.about || !raw.email) {
        console.warn('Données invalides pour Information.', raw);
        return null; // Retourne null en cas de données invalides
    }

    return {
        about: raw.about,
        email: raw.email,
        website: raw.website || null // Site facultatif
    };
}
