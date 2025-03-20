import { TestBed } from '@angular/core/testing';

import { ArtisanService } from './artisan.service';

describe('ArtisanService', () => {
  let service: ArtisanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtisanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
