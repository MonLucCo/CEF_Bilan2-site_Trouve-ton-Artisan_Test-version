/**
 * Modèle représentant une fiche synthétique d'un artisan.
 */
export interface ArtisanCard {
    id: string;          // Identifiant unique
    category: string;    // Catégorie (ex. : "Bâtiment")
    name: string;        // Nom ou entreprise
    note: number;        // Note (sur 5)
    specialty: string;   // Spécialité (ex. : "Plombier")
    location: string;    // Localisation (ville ou région)
    top: boolean;        // Indique si l'artisan est au "top"
}

/**
 * Modèle contenant les informations de contact d'un artisan.
 */
export interface ArtisanContact {
    about: string;   // Description ou biographie de l'artisan
    email: string;   // Adresse e-mail
    website: string; // Site web (optionnel)
}

/**
 * Modèle représentant le profil d'un artisan.
 */
export interface ArtisanProfile {
    name: string;      // Nom ou entreprise
    note: number;      // Note (sur 5)
    specialty: string; // Spécialité (ex. : "Plombier")
    location: string;  // Localisation (ville ou région)
}

/**
 * Modèle représentant le classement d'un artisan.
 */
export interface ArtisanRanking {
    category: string; // Catégorie (ex. : "Bâtiment")
    top: boolean;     // Indique si l'artisan est au "top"
}

/**
 * Modèle détaillé pour un artisan, combinant profil, classement, et contact.
 */
export interface Artisan {
    id: string;             // Identifiant unique de l'artisan
    ranking: ArtisanRanking; // Classement évolutif lié à l'artisan
    profile: ArtisanProfile; // Informations liées au profil de l'artisan
    contact: ArtisanContact; // Détails pour joindre l'artisan
}

/**
 * Modèle représentant les informations de contact affichées sous forme de carte.
 */
export interface ContactCard {
    id: string;       // Identifiant unique associé à Artisan
    about: string;    // Description ou biographie
    email: string;    // Adresse e-mail
    website?: string; // Site web (optionnel)
}
