import { Component, Input, OnInit } from '@angular/core';
import { ArtisanCard } from '../../models/artisan-card.models';
import { ArtisanService } from '../../services/artisan/artisan.service';

// Déclaration du composant TopArtisans, utilisé pour afficher les artisans les mieux classés.
@Component({
  selector: 'app-top-artisans',
  standalone: false,
  templateUrl: './top-artisans.component.html',
  styleUrls: ['./top-artisans.component.scss']
})
export class TopArtisansComponent implements OnInit {
  topArtisans: ArtisanCard[] = []; // Stocke les artisans au "top"

  constructor(private artisanService: ArtisanService) { }

  ngOnInit(): void {
    // Appelle la méthode du service pour récupérer les artisans "top"
    this.artisanService.getArtisansByTop().subscribe({
      next: (data) => this.topArtisans = data,
      error: (err) => console.error('Erreur lors du chargement des artisans Top', err) // Gère les erreurs
    })
  }
}
