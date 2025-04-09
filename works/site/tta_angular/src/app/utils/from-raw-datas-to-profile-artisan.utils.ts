import { ArtisanProfile } from "../models/artisan-service.models";

/**
 * Transforme les données brutes en une structure `Profile` de l'Artisan.
 * @param raw - Les données brutes contenant les propriétés `name`, `specialty`, `note`, et `location`.
 * @returns Un objet `Profile` ou `null` si les données sont invalides.
 */
export function fromRawToProfile(raw: any): ArtisanProfile | null {
    if (!raw || !raw.name || !raw.specialty || !raw.location || isNaN(parseFloat(raw.note))) {
        console.warn('Données invalides pour Profile.', raw);
        return null; // Retourne null si les données sont invalides
    }

    return {
        name: raw.name,
        note: parseFloat(parseFloat(raw.note).toFixed(1)), // Conversion avec 1 décimale
        specialty: raw.specialty,
        location: raw.location
    };
}
