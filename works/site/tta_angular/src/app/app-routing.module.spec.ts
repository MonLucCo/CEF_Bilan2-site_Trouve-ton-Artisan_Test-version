import { TestBed } from '@angular/core/testing';
import { RouterTestingHarness } from '@angular/router/testing';
import { provideRouter } from '@angular/router';
import { Location } from '@angular/common';
import { HomeComponent } from './pages/home-page/home-page.component';
import { ArtisanListComponent } from './pages/artisans-page/artisans-page.component';
import { ArtisanDetailComponent } from './pages/artisan-detail-page/artisan-detail-page.component';
import { Error404Component } from './pages/error404-page/error404-page.component';
import { routes } from './app-routing.module';

describe('AppRoutingModule', () => {
    let harness: RouterTestingHarness;
    let location: Location;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: [
                provideRouter(routes)
            ]
        }).compileComponents();

        harness = await RouterTestingHarness.create();
        location = TestBed.inject(Location);
    });

    it('should navigate to /accueil and render HomeComponent', async () => {
        const fixture = await harness.navigateByUrl('/accueil', HomeComponent);
        expect(fixture).not.toBeNull(); // Vérifiez que 'fixture' n'est pas null
        expect(location.path()).toBe('/accueil');
    });

    it('should navigate to /liste-artisans and render ArtisanListComponent', async () => {
        const fixture = await harness.navigateByUrl('/liste-artisans', ArtisanListComponent);
        expect(fixture).not.toBeNull(); // Vérifiez que 'fixture' n'est pas null
        expect(location.path()).toBe('/liste-artisans');
    });

    it('should navigate to /fiche-artisan and render ArtisanDetailComponent', async () => {
        const fixture = await harness.navigateByUrl('/fiche-artisan', ArtisanDetailComponent);
        expect(fixture).not.toBeNull(); // Vérifiez que 'fixture' n'est pas null
        expect(location.path()).toBe('/fiche-artisan');
    });

    it('should navigate to / and render /accueil and HomeComponent', async () => {
        const fixture = await harness.navigateByUrl('/', HomeComponent);
        expect(fixture).not.toBeNull(); // Vérifiez que 'fixture' n'est pas null
        expect(location.path()).toBe('/accueil');
    });

    it('should navigate to an unknown path and render /erreur-404 and Error404Component', async () => {
        const fixture = await harness.navigateByUrl('/unknown-path', Error404Component);
        expect(fixture).not.toBeNull(); // Vérifiez que 'fixture' n'est pas null
        expect(location.path()).toBe('/erreur-404');
    });
});
