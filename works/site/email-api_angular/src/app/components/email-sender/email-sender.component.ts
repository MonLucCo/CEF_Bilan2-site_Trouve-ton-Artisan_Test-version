import { Component } from '@angular/core';
import { EmailService } from '../../services/email/email.service';
import { LoggerService } from '../../services/logger/logger.service';

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

  handleEmailSubmission(emailData: any) {
    this.logger.logInfo("Début du processus d'envoi d'email", emailData);

    this.emailService.sendEmail(emailData).subscribe(
      (response: any) => {
        this.successMessage = response.message || 'Votre email a été envoyé avec succès !';
        this.errorMessage = '';
        this.logger.logInfo('Email envoyé avec succès', response)
      },
      (error) => {
        this.successMessage = '';
        this.errorMessage = error.error?.message || 'Une erreur est survenue lors de l\'envoi.';
        this.logger.logError("Erreur détectée lors de l'envoi", error)
      }
    )
  }
}
