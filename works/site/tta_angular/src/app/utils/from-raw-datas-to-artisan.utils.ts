import { Artisan } from "../models/artisan-service.models";
import { fromRawToContact } from "./from-raw-datas-to-contact-artisan.utils";
import { fromRawToRanking } from "./from-raw-datas-to-ranking-artisan.utils";
import { fromRawToProfile } from "./from-raw-datas-to-profile-artisan.utils";

/**
 * Assemble les données brutes en une structure complète `Artisan`.
 * @param raw - Les données brutes contenant les propriétés nécessaires.
 * @returns Un objet `Artisan` ou `null` si une des sous-structures est invalide.
 */
export function fromRawToArtisan(raw: any): Artisan | null {
    const ranking = fromRawToRanking(raw);
    const profile = fromRawToProfile(raw);
    const contact = fromRawToContact(raw);

    if (!ranking || !profile || !contact) {
        console.warn('Impossible de créer un Artisan à partir de données invalides.', raw);
        return null; // Retourne null si l’une des sous-structures est invalide
    }

    return {
        id: raw.id || '', // Fournir un ID par défaut si manquant
        ranking,
        profile,
        contact
    };
}
