import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ArtisanListComponent } from './pages/artisan-list/artisan-list.component';
import { ArtisanDetailComponent } from './pages/artisan-detail/artisan-detail.component';
import { Error404Component } from './pages/error404/error404.component';

// Exportation des routes pour une réutilisation (par exemple, dans les TU)
export const routes: Routes = [
  { path: 'accueil', component: HomeComponent },
  { path: 'liste-artisans', component: ArtisanListComponent },
  { path: 'fiche-artisan', component: ArtisanDetailComponent },
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
  { path: 'erreur-404', component: Error404Component },
  { path: '**', redirectTo: '/erreur-404' } // pour toutes les autres URLs
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Injection des routes dans le RouterModule
  exports: [RouterModule] // Exportation du module de routage
})
export class AppRoutingModule { }
