import { ArtisanContact } from "./artisan-contact.models";
import { ArtisanRanking } from "./artisan-ranking.models";
import { ArtisanProfile } from "./artisan-profile.models";

/**
 * Modèle Artisan détaillé, incluant profil, classement et contact.
 */
export interface Artisan {
    id: string;            // Identifiant unique de l'artisan
    ranking: ArtisanRanking; // Classement évolutif lié à l'artisan
    profile: ArtisanProfile; // Informations liées au profil de l'artisan
    contact: ArtisanContact; // Détails pour joindre l'artisan
}
