import { Component, OnInit } from '@angular/core';
import { EmailService } from '../../../services/email/email.service';

@Component({
  selector: 'app-api-maildev-test',
  standalone: false,
  templateUrl: './api-maildev-test.component.html',
  styleUrl: './api-maildev-test.component.scss'
})
export class ApiMaildevTestComponent {
  emails: any[] = [];
  message: string = '';
  messageCounter: number = 0;

  constructor(private emailService: EmailService) { }

  // Tester l'envoi d'un email
  sendTestEmail(): void {
    this.messageCounter++;
    const timestamp = new Date().toLocaleString();
    const testEmailData = {
      name: 'Test User',
      email: 'testuser@example.com',
      subject: `Test d\'envoi d\'email #${this.messageCounter} - ${timestamp}`,
      message: `Ceci est le message numéro ${this.messageCounter}, envoyé à ${timestamp} pour vérifier la méthode d\'envoi.`,
    };

    this.emailService.sendEmailWithApiMailDev('artisan@example.com', testEmailData).subscribe({
      next: (response) => {
        this.message = `Email #${this.messageCounter} envoyé avec succès !`;
        console.log('[ApiMaildevTest]-[sendTestEmail] Réponse de l\'envoi d\'email :', response);
      },
      error: (err) => {
        this.message = `Erreur lors de l\'envoi de l\'email #${this.messageCounter}.`;
        console.error(err);
      },
    });
  }

  // Tester la récupération des emails
  getEmails(): void {
    this.emailService.getEmailsWithApiMailDev().subscribe({
      next: (data) => {
        this.emails = data; // Stocker les emails récupérés
        this.message = 'Emails récupérés avec succès !';
        console.log('[ApiMaildevTest]-[getEmails] Emails récupérés :', data);
      },
      error: (err) => {
        this.message = 'Erreur lors de la récupération des emails.';
        console.error(err);
      },
    });
  }

  // Tester la suppression des emails
  deleteEmails(): void {
    this.emailService.deleteAllEmailsWithApiMailDev().subscribe({
      next: () => {
        this.message = 'Tous les emails ont été supprimés avec succès !';
        this.emails = []; // Vider la liste locale
        console.log('[ApiMaildevTest]-[getEmails] Emails supprimés');
      },
      error: (err) => {
        this.message = 'Erreur lors de la suppression des emails.';
        console.error(err);
      },
    });
  }
}
