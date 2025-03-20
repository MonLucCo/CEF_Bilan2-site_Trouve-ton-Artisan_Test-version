import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtisanDetailPageComponent } from './artisan-detail-page.component';
import { ContactFormComponent } from '../../components/contact-form/contact-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { EmailService } from '../../services/email/email.service';

describe('ArtisanDetailPageComponent', () => {
  let component: ArtisanDetailPageComponent;
  let fixture: ComponentFixture<ArtisanDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ArtisanDetailPageComponent,
        // Déclarations des composants enfants
        ContactFormComponent
      ],
      imports: [
        ReactiveFormsModule // Import nécessaire pour les formulaires réactifs de ContactFormComponent
      ],
      providers: [
        provideHttpClient(), // Fournit HttpClient pour l'application
        provideHttpClientTesting(), // Fournit HttpClient pour le test
        EmailService // Fournit EmailService dans le contexte de test
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ArtisanDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
