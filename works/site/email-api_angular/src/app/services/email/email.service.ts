import { Injectable } from '@angular/core';
import { environment } from '../../../environments/front-end/environment.dev';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { LoggerService } from '../logger/logger.service';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiURL = `${environment.backendUrl}${environment.apiService}`;

  constructor(private http: HttpClient, private logger: LoggerService) { }

  sendEmail(emailData: any): Observable<any> {
    console.log("Envoi de l'email avec les données suivantes : ", emailData);
    return this.http.post(this.apiURL, emailData).pipe(
      tap(response => this.logger.logInfo('Réponse du backend reçue', response)),
      catchError(error => {
        this.logger.logError("Erreur lors de l'envoi d'email", error);
        return throwError(() => new Error(error.message || "Erreur inconnue lors de l'envoi de l'email"));
      })
    )
  }
}
