import { ArtisanProfile } from "../models/artisan-profile.models";

/**
 * Transforme les données brutes en une structure `Profile` de l'Artisan.
 * @param raw - Les données brutes contenant les propriétés `name`, `specialty`, `note`, et `location`.
 * @returns Un objet `Summary`.
 */
export function fromRawToProfile(raw: any): ArtisanProfile {
    if (!raw || !raw.name || !raw.specialty || !raw.location) {
        throw new Error('Données invalides pour Summary.');
    }

    return {
        name: raw.name,
        note: parseFloat(parseFloat(raw.note).toFixed(1)), // Conversion en nombre avec 1 décimale
        specialty: raw.specialty,
        location: raw.location
    };
}
