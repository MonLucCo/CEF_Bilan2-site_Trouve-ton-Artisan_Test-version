import { Component, OnInit } from '@angular/core';
import { Artisan } from '../../models/artisan.models';
import { ArtisanService } from '../../services/artisan/artisan.service';

@Component({
  selector: 'app-artisan-list',
  standalone: false,
  templateUrl: './artisan-list.component.html',
  styleUrl: './artisan-list.component.scss'
})
export class ArtisanListComponent implements OnInit {
  artisans: Artisan[] = [];

  constructor(private artisanService: ArtisanService) { }

  ngOnInit(): void {
    // Récupérer tous les artisans
    this.artisanService.getArtisans().subscribe({
      next: (data) => this.artisans = data,
      error: (err) => console.error('Erreur lors du chargement des artisans', err)
    })
  }

  // Rechercher des artisans
  search(event: Event): void {
    const input = event.target as HTMLInputElement; // Cast explicite
    const keyword = input.value; // Récupère la valeur saisie

    this.artisanService.searchArtisans(keyword).subscribe({
      next: (data) => (this.artisans = data),
      error: (err) => console.error('Erreur lors de la recherche', err)
    });
  }

}
