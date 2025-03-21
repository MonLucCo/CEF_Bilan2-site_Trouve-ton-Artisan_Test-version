import { ArtisanContact } from "./artisan-contact.models";
import { ArtisanRanking } from "./artisan-ranking.models";
import { ArtisanProfile } from "./artisan-profile.models";

export interface Artisan {
    ranking: ArtisanRanking;
    profile: ArtisanProfile;
    contact: ArtisanContact;
}
