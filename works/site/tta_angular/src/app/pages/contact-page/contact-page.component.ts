import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ContactCard } from '../../models/contact-card.models';
import { SharedService } from '../../services/shared/shared.service';
import { ArtisanService } from '../../services/artisan/artisan.service';
import { ArtisanCard } from '../../models/artisan-card.models';

@Component({
  selector: 'app-contact-page',
  standalone: false,
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.scss'
})
export class ContactPageComponent implements OnInit {
  selectedArtisan: ArtisanCard | null = null;
  selectedContact: ContactCard | null = null;
  isEmailValid: boolean = false;

  constructor(
    private sharedService: SharedService,
    private artisanService: ArtisanService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    // S'abonner à l'ID sélectionné
    this.sharedService.currentContactId$.subscribe((id) => {
      if (id) {
        // Charger les données de l'artisan et du contact
        this.fetchArtisanById(id);
        this.fetchContactById(id);
      } else {
        // Réinitialiser si aucun ID n'est défini
        this.selectedArtisan = null;
        this.selectedContact = null;
      }
    });
  }

  onEmailValidityChange(isValid: boolean): void {
    console.log('[Contactpage]-[onEmailvalidityChange] Valeur de isEmailValid reçue :', isValid); // Pour vérifier
    // setTimeout(() => { this.isEmailValid = isValid });  // Applique la mise à jour au cycle Angular suivant
    this.isEmailValid = isValid;
    this.cdr.detectChanges(); // Force la détection des changements
  }

  private fetchArtisanById(id: string): void {
    // Appel asynchrone pour récupérer un artisan
    this.artisanService.getArtisanById(id).subscribe((artisan) => {
      this.selectedArtisan = artisan || null;
    });
  }

  private fetchContactById(id: string): void {
    // Appel asynchrone pour récupérer un contact
    this.artisanService.getContactById(id).subscribe((contact) => {
      this.selectedContact = contact || null;
    });
  }
}