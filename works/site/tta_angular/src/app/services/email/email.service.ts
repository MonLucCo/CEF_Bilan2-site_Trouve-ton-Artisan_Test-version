import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private mailDevApiUrl = 'http://localhost:3000/send-email'; // URL de l'API MailDev

  constructor(private http: HttpClient) { }

  // Envoi d'un email via l'API MailDev
  sendEmailWithApiMailDev(to: string, data: { name: string; email: string, subject: string; message: string }): Observable<any> {
    console.log("[EmailServiceWithApiMailDev] Préparation d'un email : ", { to: to, data: data });

    const emailData = {
      from: `"${data.name}" <${data.email}>`,
      to: to,
      subject: data.subject,
      body: `${data.name} a écrit : ${data.message}`,
    };

    console.log("[EmailServiceWithApiMailDev] Post Http envoyé avec : ", { url: this.mailDevApiUrl, email: emailData });

    // Effectue une requête POST vers l'API backend
    return this.http.post(this.mailDevApiUrl, emailData);
  }

  // Récupérer tous les emails capturés
  getEmailsWithApiMailDev(): Observable<any> {
    return this.http.get(`${this.mailDevApiUrl}`);
  }

  // Supprimer tous les emails capturés
  deleteAllEmailsWithApiMailDev(): Observable<any> {
    return this.http.delete(`${this.mailDevApiUrl}`);
  }
}
