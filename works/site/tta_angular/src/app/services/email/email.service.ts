import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private emailEndpoint = 'http://localhost:1025'; // URL pour le serveur SMTP local (MailDev)

  constructor(private http: HttpClient) { }

  sendEmail(data: { name: string; subject: string; message: string }): Observable<any> {
    const emailData = {
      from: 'noreply@local.dev', // Adresse fictive de l'expéditeur
      to: 'artisan@example.com', // Adresse du destinataire 
      subject: data.subject, // Utilisation du champ "subject"
      text: `${data.name} a écrit : ${data.message}` // Création du text de l'email
    };
    return this.http.post(this.emailEndpoint, emailData);
  }
}
