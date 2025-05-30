import { Component, Input, OnInit } from '@angular/core';
import { ArtisanCard } from '../../models/artisan-service.models';
import { SharedService } from '../../services/shared/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fiche-artisan',
  standalone: false,
  templateUrl: './fiche-artisan.component.html',
  styleUrl: './fiche-artisan.component.scss'
})
export class FicheArtisanComponent implements OnInit {
  @Input() artisan!: ArtisanCard;
  isClickable: boolean = false;

  constructor(private sharedService: SharedService, private router: Router) { }

  ngOnInit(): void {
    // Détermine la cliquabilité selon le ContextMode
    this.sharedService.currentContextMode$.subscribe((contextMode) => {
      this.isClickable = contextMode === 'list';
    });
  }

  /**
   * Gestion de l'événement clic sur la fiche artisan.
   */
  onCardClick(): void {
    if (this.isClickable) {
      console.log('[FicheArtisan] : Artisan cliqué avec ID :', this.artisan.id);
      // this.router.navigate(['/contact', this.artisan.id]);  // Redirection vers la page de contact
    }
  }
}