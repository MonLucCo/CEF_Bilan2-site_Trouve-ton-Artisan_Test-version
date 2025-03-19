import { Component } from '@angular/core';
import { EmailService } from '../../services/email/email.service';
import { LoggerService } from '../../services/logger/logger.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-email-sender',
  standalone: false,
  templateUrl: './email-sender.component.html',
  styleUrl: './email-sender.component.css'
})
export class EmailSenderComponent {
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private emailService: EmailService, private logger: LoggerService) { }

  async handleEmailSubmission(emailData: any) {
    this.logger.logInfo(this, "Début du processus d'envoi d'email", emailData);

    try {
      const response: any = await lastValueFrom(this.emailService.sendEmail(emailData));
      this.successMessage = response.message || 'Votre email a été envoyé avec succès !';
      this.errorMessage = '';
      this.logger.logInfo(this, 'Email envoyé avec succès', response)
    }
    catch (error: any) {
      this.successMessage = '';
      this.errorMessage = error.error?.message || "Une erreur est survenue lors de l'envoi.";
      this.logger.logError(this, "Erreur détectée lors de l'envoi", error)
    }
  }
}
