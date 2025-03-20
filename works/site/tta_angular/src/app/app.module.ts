import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ArtisansPageComponent } from './pages/artisans-page/artisans-page.component';
import { ArtisanDetailPageComponent } from './pages/artisan-detail-page/artisan-detail-page.component';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';
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
import { ArtisanListComponent } from './components/artisan-list/artisan-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ArtisanDetailPageComponent,
    Error404PageComponent,
    HeaderComponent,
    FooterComponent,
    SummaryCardComponent,
    AdditionalInfoCardComponent,
    ContactFormComponent,
    FilterByCategoryPipe,
    SearchPipe,
    TopArtisansPipe,
    ArtisansPageComponent,
    ArtisanListComponent
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
