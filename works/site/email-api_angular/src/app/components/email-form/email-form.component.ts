import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-email-form',
  standalone: false,
  templateUrl: './email-form.component.html',
  styleUrl: './email-form.component.css'
})
export class EmailFormComponent {
  emailForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder) {
    this.emailForm = this.fb.group({
      name: ['', Validators.required],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    })
  }

  onSubmit() {
    if (this.emailForm.valid) {
      const formData = this.emailForm.value;
      console.log('Données du formulaire :', formData);

      // Simuler une soumission réussie
      this.successMessage = 'Votre message a été envoyé avec succès !';
      this.errorMessage = '';
      this.emailForm.reset();
    } else {
      this.successMessage = '';
      this.errorMessage = 'Veuillez remplir tous les champs correctement.';
    }
  }
}
