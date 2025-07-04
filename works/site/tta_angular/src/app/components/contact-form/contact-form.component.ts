import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailService } from '../../services/email/email.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-form',
  standalone: false,
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent {
  @Input() artisanEmail!: string; // Email de l'artisan reçu depuis ContactPage
  @ViewChild('contactFormName', { static: false }) nameField!: ElementRef;

  contactForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  isSubmitted: boolean = false;

  constructor(private fb: FormBuilder, private emailService: EmailService, private router: Router) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      const observer = {
        next: () => {
          console.log("[ContactForm]-[onSubmit] Email envoyé avec succès à MailDev");
          this.successMessage = 'Email envoyé avec succès !';
          this.errorMessage = '';
          this.isSubmitted = true;
        },
        error: (error: any) => {
          console.error("[ContactForm]-[onSubmit] Erreur lors de l'envoi de l'email", error);
          this.errorMessage = 'Message non envoyé ! Erreur de transmission.';
          this.successMessage = '';
        },
      };

      this.emailService.sendEmailWithApiMailDev(this.artisanEmail, this.contactForm.value).subscribe(observer);
    } else {
      console.error('[ContactForm]-[onSubmit] Formulaire invalide');
      this.errorMessage = 'Veuillez remplir tous les champs.';
      this.successMessage = '';
    }
  }

  returnHome(): void {
    this.router.navigate(['/']);
  }

  setFocusOnName(): void {
    setTimeout(() => {
      this.nameField?.nativeElement.focus();
    }, 100);
  }
}
