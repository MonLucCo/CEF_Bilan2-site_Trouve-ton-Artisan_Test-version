import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HeaderComponent } from './header.component';
import { Location } from '@angular/common';
import { provideRouter } from '@angular/router';
import { routes } from '../../app-routing.module';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [provideRouter(routes)]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    location = TestBed.inject(Location);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a <header> element', () => {
    const header = fixture.debugElement.query(By.css('header'));
    expect(header).toBeTruthy();
  });

  it('should contain a <nav> element', () => {
    const nav = fixture.debugElement.query(By.css('nav'));
    expect(nav).toBeTruthy();
  });

  it('should render links for each route', () => {
    const links = fixture.debugElement.queryAll(By.css('a'));
    expect(links.length).toBe(4); // Nombre total de liens
    expect(links[0].nativeElement.getAttribute('routerLink')).toBe('/accueil');
    expect(links[1].nativeElement.getAttribute('routerLink')).toBe('/liste-artisans');
    expect(links[2].nativeElement.getAttribute('routerLink')).toBe('/fiche-artisan');
    expect(links[3].nativeElement.getAttribute('routerLink')).toBe('/erreur-404');
  });
});

// Test unitaire à prévoir (si besoin car possibilité de TU redandant avec les TU des autres composants)
//
// 1) simulation des clic et validation de la navigation : s'assurer que chaque lien dans <nav> navigue correctement vers la route associée.
// 2) validation du rendu des composants associés à la route.
// 3) couverture des cas limite : s'assurer qu'un lien ne mêne pas à une URL non définie.
