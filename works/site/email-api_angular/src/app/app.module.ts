import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { EmailSenderComponent } from './components/email-sender/email-sender.component';
import { EmailFormComponent } from './components/email-form/email-form.component';
import { HeaderComponent } from './components/header/header.component';
import { EmailHistoryComponent } from './components/email-history/email-history.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeroComponent } from './components/hero/hero.component';

@NgModule({
  declarations: [
    AppComponent,
    EmailSenderComponent,
    EmailFormComponent,
    HeaderComponent,
    EmailHistoryComponent,
    FooterComponent,
    HeroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    provideHttpClient() // Méthode pour configurer HttpClient (> Angular 15)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
