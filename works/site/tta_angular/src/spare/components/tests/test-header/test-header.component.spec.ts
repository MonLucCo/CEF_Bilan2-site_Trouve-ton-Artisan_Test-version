import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestHeaderComponent } from './test-header.component';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from '../../../app-routing.module';


describe('HeaderComponent', () => {
  let component: TestHeaderComponent;
  let fixture: ComponentFixture<TestHeaderComponent>;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestHeaderComponent],
      providers: [provideRouter(routes)]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TestHeaderComponent);
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
    expect(links.length).toBe(10); // Nombre total de liens
    expect(links[0].nativeElement.getAttribute('routerLink')).toBe('/accueil');
    expect(links[1].nativeElement.getAttribute('routerLink')).toBe('/liste-artisans');
    expect(links[2].nativeElement.getAttribute('routerLink')).toBe('/fiche-artisan');
    expect(links[3].nativeElement.getAttribute('routerLink')).toBe('/erreur-404');
    expect(links[4].nativeElement.getAttribute('routerLink')).toBe('/erruer-404');
    expect(links[5].nativeElement.getAttribute('routerLink')).toBe('/catégorie/Bâtiment');
    expect(links[6].nativeElement.getAttribute('routerLink')).toBe('/catégorie/Services');
    expect(links[7].nativeElement.getAttribute('routerLink')).toBe('/catégorie/Fabrication');
    expect(links[8].nativeElement.getAttribute('routerLink')).toBe('/catégorie/Alimentation');
    expect(links[9].nativeElement.getAttribute('routerLink')).toBe('/erreur-404');
  });
});

// Test unitaire à prévoir (si besoin car possibilité de TU redandant avec les TU des autres composants)
//
// 1) simulation des clic et validation de la navigation : s'assurer que chaque lien dans <nav> navigue correctement vers la route associée.
// 2) validation du rendu des composants associés à la route.
// 3) couverture des cas limite : s'assurer qu'un lien ne mêne pas à une URL non définie.
