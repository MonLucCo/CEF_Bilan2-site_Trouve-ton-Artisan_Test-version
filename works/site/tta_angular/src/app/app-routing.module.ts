import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ArtisansPageComponent } from './pages/artisans-page/artisans-page.component';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { CategoryGuard } from './guards/category/category.guard';
import { SearchGuard } from './guards/search/search.guard';
import { ContactGuard } from './guards/contact/contact.guard';
import { artisansGuard } from './guards/artisans/artisans.guard';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { clearUrlGuard } from './guards/clear-url/clear-url.guard';
import { AccessibiliteComponent } from './legals/accessibilite/accessibilite.component';
import { ContactsComponent } from './legals/contacts/contacts.component';
import { DonneesPersonnellesComponent } from './legals/donnees-personnelles/donnees-personnelles.component';
import { GestionCookiesComponent } from './legals/gestion-cookies/gestion-cookies.component';
import { MarchesPublicsComponent } from './legals/marches-publics/marches-publics.component';
import { MentionsLegalesComponent } from './legals/mentions-legales/mentions-legales.component';
import { PolitiqueCookiesComponent } from './legals/politique-cookies/politique-cookies.component';

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

  // Pages légales
  {
    path: 'legal',
    children: [
      { path: 'mentions-legales', component: MentionsLegalesComponent },
      { path: 'donnees-personnelles', component: DonneesPersonnellesComponent },
      { path: 'accessibilite', component: AccessibiliteComponent },
      { path: 'marches-publics', component: MarchesPublicsComponent },
      { path: 'contacts', component: ContactsComponent },
      { path: 'politique-cookies', component: PolitiqueCookiesComponent },
      { path: 'gestion-cookies', component: GestionCookiesComponent },
    ],
  },

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
