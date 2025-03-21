export interface ArtisanCard {
    // Fiche synthèse de l'artisan
    id: string;          // Identifiant unique
    category: string;    // Catégorie (ex. : "Bâtiment")
    name: string;        // Nom ou entreprise
    note: number;        // Note (sur 5)
    specialty: string;   // Spécialité (ex. : "Plombier")
    location: string;    // Localisation (ville ou région)
}
