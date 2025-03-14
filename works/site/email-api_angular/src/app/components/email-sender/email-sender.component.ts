import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-email-sender',
  standalone: false,
  templateUrl: './email-sender.component.html',
  styleUrl: './email-sender.component.css'
})
export class EmailSenderComponent {
  constructor() { }

  sendEmail(form: NgForm) {
    if (form.valid) {
      const emailData = form.value;
      console.log('Envoi de l\'email avec les données suivantes :', emailData);
      // Appelez ici un service pour envoyer l'email via une API backend
    } else {
      console.error('Le formulaire est invalide');
    }
  }
}
