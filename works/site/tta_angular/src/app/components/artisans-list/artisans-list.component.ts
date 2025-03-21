import { Component, OnInit } from '@angular/core';
import { ArtisanCard } from '../../models/artisan-card.models';
import { ArtisanService } from '../../services/artisan/artisan.service';

@Component({
  selector: 'app-artisans-list',
  standalone: false,
  templateUrl: './artisans-list.component.html',
  styleUrl: './artisans-list.component.scss'
})
export class ArtisansListComponent implements OnInit {
  artisans: ArtisanCard[] = []; // Utilisation des fiches des artisans

  constructor(private artisanService: ArtisanService) { }

  ngOnInit(): void {
    // Récupérer tous les artisans
    this.artisanService.getAllArtisans().subscribe({
      next: (data) => (this.artisans = data),
      error: (err) => console.error('Erreur lors du chargement des artisans', err)
    });
  }

  // Rechercher des artisans par mots-clés
  search(event: Event): void {
    const input = event.target as HTMLInputElement; // Cast explicite
    const keyword = input.value.trim(); // Supprime les espaces inutiles

    if (keyword) {
      this.artisanService.searchArtisans(keyword).subscribe({
        next: (data) => (this.artisans = data),
        error: (err) => console.error('Erreur lors de la recherche', err)
      });
    } else {
      // Si aucun mot-clé n'est saisi, recharger tous les artisans
      this.ngOnInit();
    }
  }
}

