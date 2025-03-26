import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router } from '@angular/router';

import { CategoryGuard } from './category.guard';
import { ArtisanService } from '../../services/artisan/artisan.service';
import { SharedService } from '../../services/shared/shared.service';
import { of } from 'rxjs';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('CategoryGuard', () => {
  let guard: CategoryGuard;
  let router: Router;
  let artisanService: ArtisanService;
  let sharedService: SharedService;

  beforeEach(() => {
    const mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };
    const mockArtisanService = {
      getAllCategories: jasmine.createSpy('getAllCategories').and.returnValue(of(['Bâtiment', 'Services']))
    };
    const mockSharedService = {
      setCategory: jasmine.createSpy('setCategory')
    };
    TestBed.configureTestingModule({
      providers: [
        CategoryGuard,
        provideHttpClientTesting(),
        { provide: Router, useValue: mockRouter },
        { provide: ArtisanService, useValue: mockArtisanService },
        { provide: SharedService, useValue: mockSharedService }
      ]
    });

    guard = TestBed.inject(CategoryGuard);
    router = TestBed.inject(Router);
    artisanService = TestBed.inject(ArtisanService);
    sharedService = TestBed.inject(SharedService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow activation if category is valid', (done) => {
    const routeMock: any = {
      paramMap: {
        get: (key: string) => 'Bâtiment' // Catégorie valide
      }
    };

    guard.canActivate(routeMock).subscribe((result) => {
      expect(result).toBeTrue(); // L'accès est autorisé
      expect(sharedService.setCategory).toHaveBeenCalledWith('Bâtiment'); // La catégorie est définie
      done();
    });
  });

  it('should deny activation and navigate to /erreur-404 if category is invalid', (done) => {
    const routeMock: any = {
      paramMap: {
        get: (key: string) => 'Invalide' // Catégorie invalide
      }
    };

    guard.canActivate(routeMock).subscribe((result) => {
      expect(result).toBeFalse(); // L'accès est refusé
      expect(sharedService.setCategory).toHaveBeenCalledWith(null); // La catégorie est réinitialisée
      expect(router.navigate).toHaveBeenCalledWith(['/erreur-404']); // Redirection
      done();
    });
  });

  it('should deny activation and navigate to /erreur-404 if category is missing', (done) => {
    const routeMock: any = {
      paramMap: {
        get: (key: string) => null // Pas de catégorie
      }
    };

    guard.canActivate(routeMock).subscribe((result) => {
      expect(result).toBeFalse(); // L'accès est refusé
      expect(sharedService.setCategory).toHaveBeenCalledWith(null); // La catégorie est réinitialisée
      expect(router.navigate).toHaveBeenCalledWith(['/erreur-404']); // Redirection
      done();
    });
  });

  it('should not navigate if category is valid', (done) => {
    const routeMock: any = {
      paramMap: {
        get: (key: string) => 'Services' // Catégorie valide
      }
    };

    guard.canActivate(routeMock).subscribe((result) => {
      expect(result).toBeTrue(); // L'accès est autorisé
      expect(router.navigate).not.toHaveBeenCalled(); // Pas de redirection
      done();
    });
  });

});