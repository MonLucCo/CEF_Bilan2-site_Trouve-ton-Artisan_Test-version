import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtisanDetailComponent } from './artisan-detail.component';
import { ContactFormComponent } from '../../components/contact-form/contact-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { EmailService } from '../../services/email/email.service';

describe('ArtisanDetailComponent', () => {
  let component: ArtisanDetailComponent;
  let fixture: ComponentFixture<ArtisanDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ArtisanDetailComponent,
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

    fixture = TestBed.createComponent(ArtisanDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
