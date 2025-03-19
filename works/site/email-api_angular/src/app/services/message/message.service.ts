import { Injectable } from '@angular/core';
import { environment } from '../../../environments/front-end/environment.dev';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { LoggerService } from '../logger/logger.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private apiUrl = `${environment.backendUrl}${environment.apiService.message}`;

  constructor(private http: HttpClient, private logger: LoggerService) {
    this.logger.logDebug(this, "L'url de l'API est : ", this.apiUrl);
  }

  getMessages(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      tap(messages => this.logger.logDebug(this, "Messages récupérés : ", messages)),
      catchError(error => {
        this.logger.logError(this, "Erreur lors de la récupération des messages", error);
        return of([]); // Retourne une liste vide en cas d'erreur
      })
    );
  }

  addMessage(message: any): Observable<any> {
    return this.http.post(this.apiUrl, message)
  }

  deleteMessage(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`)
  }

  deleteAllMessages(): Observable<any> {
    return this.http.delete(this.apiUrl)
  }
}
