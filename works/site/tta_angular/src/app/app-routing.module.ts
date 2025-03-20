import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ArtisansPageComponent } from './pages/artisans-page/artisans-page.component';
import { ArtisanDetailPageComponent } from './pages/artisan-detail-page/artisan-detail-page.component';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';

// Exportation des routes pour une réutilisation (par exemple, dans les TU)
export const routes: Routes = [
  { path: 'accueil', component: HomePageComponent },
  { path: 'liste-artisans', component: ArtisansPageComponent },
  { path: 'fiche-artisan', component: ArtisanDetailPageComponent },
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
  { path: 'erreur-404', component: Error404PageComponent },
  { path: '**', redirectTo: '/erreur-404' } // pour toutes les autres URLs
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Injection des routes dans le RouterModule
  exports: [RouterModule] // Exportation du module de routage
})
export class AppRoutingModule { }
