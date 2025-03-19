import { Injectable } from '@angular/core';
import { environment } from '../../../environments/front-end/environment.dev';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { LoggerService } from '../logger/logger.service';
import { EmailData, EmailResponse } from './email.models';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiURL = `${environment.backendUrl}${environment.apiService.email}`;

  constructor(private http: HttpClient, private logger: LoggerService) {
    this.logger.logDebug(this, "L'url de l'API est : ", this.apiURL);
  }

  sendEmail(emailData: EmailData): Observable<EmailResponse> {
    this.logger.logDebug(this, "Envoi de l'email avec les données suivantes : ", emailData);
    return this.http.post<EmailResponse>(this.apiURL, emailData).pipe(
      tap(response => this.logger.logInfo(this, "Réponse du backend reçue", response)),
      catchError(error => {
        this.logger.logError(this, "Erreur lors de l'envoi d'email", error);
        return throwError(() =>
          new Error(error.message || "[Emailservice] : Erreur inconnue lors de l'envoi de l'email"));
      })
    )
  }
}
