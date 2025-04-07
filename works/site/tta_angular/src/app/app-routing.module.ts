import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ArtisansPageComponent } from './pages/artisans-page/artisans-page.component';
import { ArtisanContactPageComponent } from './pages/artisan-contact-page/artisan-contact-page.component';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { CategoryArtisansComponent } from './components/category-artisans/category-artisans.component';
import { SearchArtisansComponent } from './components/search-artisans/search-artisans.component';
import { CategoryGuard } from './guards/category/category.guard';
import { SearchGuard } from './guards/search/search.guard';
import { ContactGuard } from './guards/contact/contact.guard';
import { artisansGuard } from './guards/artisans/artisans.guard';
import { contactRedirectGuard } from './guards/contact-redirect/contact-redirect.guard';
import { testRouteGuard } from './guards/test-route/test-route.guard';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { entryGuard } from './guards/entry/entry.guard';
import { clearUrlGuard } from './guards/clear-url/clear-url.guard';

export const routes: Routes = [
  // Route d'accueil
  { path: '', component: HomePageComponent, canActivate: [artisansGuard] },
  { path: 'accueil', component: HomePageComponent, canActivate: [clearUrlGuard] },

  // Route d'erreur
  { path: 'erreur-404', component: Error404PageComponent, canActivate: [clearUrlGuard] },

  // Routes principales
  { path: 'artisans', component: HomePageComponent, canActivate: [artisansGuard] },
  { path: 'artisans/contact/:id', component: ContactPageComponent, canActivate: [ContactGuard] },
  { path: 'artisans/recherche/:keyword', component: ArtisansPageComponent, canActivate: [SearchGuard] },
  { path: 'artisans/categorie/:category', component: ArtisansPageComponent, canActivate: [CategoryGuard] },

  // Redirections conviviales
  {
    path: 'categorie/:category',
    redirectTo: '/artisans/categorie/:category',
    pathMatch: 'full',
  },
  {
    path: 'recherche/:keyword',
    redirectTo: '/artisans/recherche/:keyword',
    pathMatch: 'full',
  },
  {
    path: 'contact/:id',
    redirectTo: '/artisans/contact/:id',
    pathMatch: 'full',
  },

  // Route wildcard
  { path: '**', redirectTo: '/erreur-404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Injection des routes dans le RouterModule
  exports: [RouterModule] // Exportation du module de routage
})
export class AppRoutingModule { }
