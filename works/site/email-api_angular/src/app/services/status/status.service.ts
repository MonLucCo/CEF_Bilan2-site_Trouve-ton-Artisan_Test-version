import { Injectable } from '@angular/core';
import { environment } from '../../../environments/front-end/environment.dev';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  // URLs des endpoints pour récupérer les statuts
  private serverStatusUrl = `${environment.backendUrl}${environment.apiService.status.server}`;
  private maildevStatusUrl = `${environment.backendUrl}${environment.apiService.status.maildev}`;

  // Gestion des statuts via BehaviorSubject
  private serverStatusSubject = new BehaviorSubject<string>('UNKNOWN');
  private mailDevStatusSubject = new BehaviorSubject<string>('UNKNOWN');

  // Observables publics pour écouter les changements
  serverStatus$ = this.serverStatusSubject.asObservable();
  mailDevStatus$ = this.mailDevStatusSubject.asObservable();

  constructor(private http: HttpClient) { }

  // Récupère le statut du serveur Backend depuis l'API
  fetchServerStatus(): Observable<{ status: string }> {
    return this.http.get<{ status: string }>(this.serverStatusUrl).pipe(
      tap((response) => {
        this.serverStatusSubject.next(response.status); // Met à jour le BehaviorSubject
        console.log('Statut du serveur mis à jour :', response.status); // Log pour suivi (optionnel)
      })
    );
  }

  // Récupère le statut de MailDev depuis l'API
  fetchMailDevStatus(): Observable<{ status: string }> {
    return this.http.get<{ status: string }>(this.maildevStatusUrl).pipe(
      tap((response) => {
        this.mailDevStatusSubject.next(response.status); // Met à jour le BehaviorSubject
        console.log('Statut de MailDev mis à jour :', response.status); // Log pour suivi (optionnel)
      })
    );
  }

  // Méthodes pour exposer directement les valeurs actuelles (optionnel)
  getCurrentServerStatus(): string {
    return this.serverStatusSubject.value;
  }

  getCurrentMailDevStatus(): string {
    return this.mailDevStatusSubject.value;
  }
}
