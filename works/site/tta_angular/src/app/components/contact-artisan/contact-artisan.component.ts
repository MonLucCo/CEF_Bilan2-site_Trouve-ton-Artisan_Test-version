import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { ContactCard } from '../../models/contact-card.models';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-artisan',
  standalone: false,
  templateUrl: './contact-artisan.component.html',
  styleUrl: './contact-artisan.component.scss'
})
export class ContactArtisanComponent implements OnChanges {
  @Input() contact!: ContactCard; // Données du contact à afficher
  @Output() emailValidityChange = new EventEmitter<boolean>();

  isEmailValid: boolean = false; // Validité de l'email du contact

  ngOnChanges(): void {
    // Validation basique des champs à chaque changement de 'contact'
    this.isEmailValid = this.validateEmailWithValidators(this.contact.email);
    if (!this.isEmailValid) {
      console.warn('Email invalide supprimé :', this.contact.email);
      this.contact.email = ''; // Supprime l'adresse email invalide
    }

    if (this.contact.website && !this.validateURL(this.contact.website)) {
      console.warn('URL invalide supprimée :', this.contact.website);
      this.contact.website = ''; // Supprime l'url invalide
    }

    console.log('[ContactArtisan] émission de emailvalidityChange : ', this.isEmailValid)
    this.emailValidityChange.emit(this.isEmailValid);
  }

  // Fonction privée pour valider les emails avec Validators.email
  private validateEmailWithValidators(email: string): boolean {
    const control = new FormControl(email, Validators.email); // Crée un FormControl avec Validators.email
    return control.valid; // Retourne true si le contrôle est valide
  }

  private validateURL(url: string): boolean {
    try {
      new URL(url); // Vérifie si c'est une URL valide
      return true;
    } catch {
      return false;
    }
  }
}
