import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtisanCard } from '../../models/artisan-card.models';
import { ArtisanService } from '../../services/artisan/artisan.service';

/**
 * Composant pour afficher les artisans par catégorie.
 */
@Component({
  selector: 'app-category-artisans',
  standalone: false,
  templateUrl: './category-artisans.component.html',
  styleUrls: ['./category-artisans.component.scss']
})
export class CategoryArtisansComponent implements OnInit {
  artisans: ArtisanCard[] = []; // Liste des artisans pour la catégorie
  category: string | null = null; // Catégorie sélectionnée

  constructor(
    private artisanService: ArtisanService,
    private route: ActivatedRoute // Pour récupérer les paramètres de la route
  ) { }

  ngOnInit(): void {
    // Récupère la catégorie depuis les paramètres de la route
    this.route.paramMap.subscribe(params => {
      this.category = params.get('category'); // Exemple : "Bâtiment"

      if (this.category) {
        // Charge les artisans pour la catégorie donnée
        this.artisanService.getArtisansByCategory(this.category).subscribe({
          next: (data) => (this.artisans = data),
          error: (err) => console.error('Erreur lors du chargement des artisans par catégorie', err)
        });
      }
    });
  }
}
