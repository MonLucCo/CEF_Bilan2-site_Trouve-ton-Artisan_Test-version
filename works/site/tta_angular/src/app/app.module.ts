import { inject, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';

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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TopArtisansComponent } from './components/top-artisans/top-artisans.component';
import { CategoryArtisansComponent } from './components/category-artisans/category-artisans.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SearchArtisansComponent } from './components/search-artisans/search-artisans.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { ArtisanService } from './services/artisan/artisan.service';
import { provideAppInitializer } from '@angular/core';
import { FicheArtisanComponent } from './components/fiche-artisan/fiche-artisan.component';
import { TopFilterPipe } from './pipes/top-filter/top-filter.pipe';
import { CategoryFilterPipe } from './pipes/category-filter/category-filter.pipe';
import { SearchFilterPipe } from './pipes/search-filter/search-filter.pipe';
import { IdFilterPipe } from './pipes/id-filter/id-filter.pipe';
import { TopArtisanTestComponent } from './components/tests/top-artisan-test/top-artisan-test.component';
import { RatingStarsComponent } from './components/rating-stars/rating-stars.component';
import { ContactArtisanComponent } from './components/contact-artisan/contact-artisan.component';
import { ApiMaildevTestComponent } from './components/tests/api-maildev-test/api-maildev-test.component';
import { ListArtisansComponent } from './components/list-artisans/list-artisans.component';
import { FindArtisanComponent } from './components/find-artisan/find-artisan.component';
import { FindArtisanTestComponent } from './components/tests/find-artisan-test/find-artisan-test.component';

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
    TopArtisansComponent,
    CategoryArtisansComponent,
    SearchBarComponent,
    SearchArtisansComponent,
    ContactPageComponent,
    FicheArtisanComponent,
    TopFilterPipe,
    CategoryFilterPipe,
    SearchFilterPipe,
    IdFilterPipe,
    TopArtisanTestComponent,
    RatingStarsComponent,
    ContactArtisanComponent,
    ApiMaildevTestComponent,
    ListArtisansComponent,
    FindArtisanComponent,
    FindArtisanTestComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule, // Ajout pour la réactivité du formulaire
    FormsModule,         // Nécessaire pour que [(ngModel)] fonctionne (emploi dans SearchBar)
    AppRoutingModule,
  ],
  providers: [
    provideHttpClient(), // Remplace HttpClientModule
    provideAppInitializer(() => {
      const artisanService = inject(ArtisanService); // Injection d'ArtisanService via Angular
      return artisanService.initialize(); // Appelle la méthode d'initialisation
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
