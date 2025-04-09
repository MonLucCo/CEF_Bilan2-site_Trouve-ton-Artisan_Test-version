import { Component, OnInit } from '@angular/core';
import { ArtisanCard } from '../../models/artisan-service.models';
import { ArtisanService } from '../../services/artisan/artisan.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-artisans-list',
  standalone: false,
  templateUrl: './artisans-list.component.html',
  styleUrl: './artisans-list.component.scss'
})
export class ArtisansListComponent {
  artisans$: Observable<ArtisanCard[]> = of([]); // Utilisation des fiches des artisans

  constructor(private artisanService: ArtisanService) {
    this.artisans$ = this.artisanService.getAllArtisans();
  }

  /**
     * Méthode pour effectuer une recherche par mot-clé.
     * Met à jour l'Observable artisans$ en fonction du mot-clé saisi.
     * @param event - Événement d'entrée utilisateur
     */
  search(event: Event): void {
    const input = event.target as HTMLInputElement;
    const keyword = input.value.trim();

    // Mettre à jour artisans$ selon que le mot-clé est fourni ou non
    this.artisans$ = keyword
      ? this.artisanService.searchArtisans(keyword)
      : this.artisanService.getAllArtisans();
  }
}
