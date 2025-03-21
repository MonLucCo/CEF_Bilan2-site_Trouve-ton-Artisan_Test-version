import { Artisan } from "../models/artisan.models";
import { fromRawToContact } from "./from-raw-datas-to-contact-artisan.utils";
import { fromRawToRanking } from "./from-raw-datas-to-ranking-artisan.utils";
import { fromRawToProfile } from "./from-raw-datas-to-profile-artisan.utils";

/**
 * Assemble les données brutes en une structure complète `Artisan`.
 * @param raw - Les données brutes contenant les propriétés nécessaires.
 * @returns Un objet `Artisan`.
 */
export function fromRawToArtisan(raw: any): Artisan {
    return {
        ranking: fromRawToRanking(raw),    // Transformation de la sous-structure Ranking
        profile: fromRawToProfile(raw),    // Transformation de la sous-structure Summary
        contact: fromRawToContact(raw) // Transformation de la sous-structure Information
    };
}
