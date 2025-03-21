import { ArtisanContact } from "../models/artisan-contact.models";

/**
 * Transforme les données brutes en une structure `Information`.
 * @param raw - Les données brutes contenant les propriétés `about`, `email`, et `website`.
 * @returns Un objet `Information`.
 */
export function fromRawToContact(raw: any): ArtisanContact {
    if (!raw || !raw.about || !raw.email) {
        throw new Error('Données invalides pour Information.');
    }

    return {
        about: raw.about,
        email: raw.email,
        website: raw.website || null // Facilité d'utilisation avec un site facultatif
    };
}
