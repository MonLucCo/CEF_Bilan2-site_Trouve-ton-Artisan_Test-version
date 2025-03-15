import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ArtisanListComponent } from './pages/artisan-list/artisan-list.component';
import { ArtisanDetailComponent } from './pages/artisan-detail/artisan-detail.component';
import { Error404Component } from './pages/error404/error404.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SummaryCardComponent } from './components/summary-card/summary-card.component';
import { AdditionalInfoCardComponent } from './components/additional-info-card/additional-info-card.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { FilterByCategoryPipe } from './pipes/filter-by-category/filter-by-category.pipe';
import { SearchPipe } from './pipes/search/search.pipe';
import { TopArtisansPipe } from './pipes/top-artisans/top-artisans.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ArtisanListComponent,
    ArtisanDetailComponent,
    Error404Component,
    HeaderComponent,
    FooterComponent,
    SummaryCardComponent,
    AdditionalInfoCardComponent,
    ContactFormComponent,
    FilterByCategoryPipe,
    SearchPipe,
    TopArtisansPipe
  ],
  imports: [
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
