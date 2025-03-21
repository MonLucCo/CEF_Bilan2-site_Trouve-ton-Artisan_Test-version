import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ArtisansPageComponent } from './pages/artisans-page/artisans-page.component';
import { ArtisanContactPageComponent } from './pages/artisan-contact-page/artisan-contact-page.component';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ArtisansListComponent } from './components/artisans-list/artisans-list.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { FilterByCategoryPipe } from './pipes/filter-by-category/filter-by-category.pipe';
import { SearchPipe } from './pipes/search/search.pipe';
import { TopArtisansPipe } from './pipes/top-artisans/top-artisans.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { TopArtisansComponent } from './components/top-artisans/top-artisans.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ArtisansPageComponent,
    ArtisanContactPageComponent,
    Error404PageComponent,
    HeaderComponent,
    FooterComponent,
    ContactFormComponent,
    FilterByCategoryPipe,
    SearchPipe,
    TopArtisansPipe,
    ArtisansListComponent,
    TopArtisansComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule, // Ajout pour la réactivité du formulaire
    AppRoutingModule
  ],
  providers: [
    provideHttpClient() // Méthode pour configurer HttpClient (> Angular 15)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
