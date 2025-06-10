import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, ViewChild } from '@angular/core';
import { ContactCard } from '../../models/artisan-service.models';
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
  @Output() requestFocus = new EventEmitter<string>();

  isEmailValid: boolean = false; // Validité de l'email du contact
  emailInfoVisible: boolean = false; // Etat de visibilité du message d'information pour l'Email

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

  // Fonction pour la gestion préventive de l'email vs formulaire
  showContactInfo(event: Event): void {
    event.preventDefault(); // Empêcher l'ouverture du mailto
    this.emailInfoVisible = true; // Afficher le message d'information
  }

  closeInfoAndFocus(): void {
    this.emailInfoVisible = false;
    this.requestFocus.emit('focusOnNameByContactArtisan'); // Notification du focus par événement nommé
  }

}
