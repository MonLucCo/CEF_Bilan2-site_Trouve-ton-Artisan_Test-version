// Activer la version initiale (chargement artisans$, contacts$ et categories$ par accès distincts à datas.json)
// import { ArtisanService } from './artisan.service.v1';

// Ou activer la version optimisée de la version initiale (chargement artisans$, contacts$, categories$ par un seul accès à datas.json)
// import { ArtisanService } from './artisan.service.v2';

// Ou activer la version optimisée de la version optimisée (chargement du cache par accès à datas.json, et abonnement à artisans$ pour contacts$ et categories$)
import { ArtisanService } from './artisan.service.v3';

export { ArtisanService };
