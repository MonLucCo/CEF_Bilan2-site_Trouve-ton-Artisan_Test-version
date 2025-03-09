import { TestBed } from '@angular/core/testing';

import { EmailService } from './email.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Subject } from 'rxjs';

describe('EmailService', () => {
  let service: EmailService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(EmailService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Vérifie qu'il n'y a pas de requête en attente
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send email', () => {
    const mockData = {
      name: 'Test DevUser',
      subject: 'Test subject',
      message: 'My development test message.'
    };
    const mockResponse = { success: true };

    service.sendEmail(mockData).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:1025'); // MailDev SMTP server
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      from: 'noreply@local.dev',
      to: 'artisan@example.com',
      subject: 'Test subject',
      text: 'Test DevUser a écrit : My development test message.'
    });

    req.flush(mockResponse); // Simule une réponse avec succès
  })
});
