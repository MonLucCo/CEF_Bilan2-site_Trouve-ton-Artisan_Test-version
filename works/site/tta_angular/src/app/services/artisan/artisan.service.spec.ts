import { TestBed } from '@angular/core/testing';

import { ArtisanService } from './artisan.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('ArtisanService', () => {
  let service: ArtisanService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      /**
       * TEMPORARY: Using HttpClientTestingModule because provideHttpClientTesting is causing issues.
       * TODO: Replace HttpClientTestingModule with provideHttpClientTesting when stable.
       */
      imports: [HttpClientTestingModule],

      providers: [
        ArtisanService
      ],
    });
    service = TestBed.inject(ArtisanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should inject HttpClient', () => {
    const httpClient = TestBed.inject(HttpClient);
    expect(httpClient).toBeTruthy();
  });

});
