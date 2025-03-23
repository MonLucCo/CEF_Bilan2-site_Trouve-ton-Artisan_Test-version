import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { SharedService } from '../../services/shared/shared.service';

/**
 * Composant de barre de recherche avec gestion de catégorie.
 * - Permet la recherche par mot-clé.
 * - Gère un bouton lié à la catégorie active.
 */
@Component({
  selector: 'app-search-bar',
  standalone: false,
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent implements OnInit {
  category: string | null = null; // Catégorie active, si applicable
  keyword: string = ''; // Mot-clé de recherche initial
  @Input() placeholder: string = 'Rechercher...'; // Placeholder dynamique
  @Output() search = new EventEmitter<{ category: string | null; keyword: string }>(); // Événement émis pour lancer la recherche

  constructor(private sharedService: SharedService) { }

  /**
   * Initialise le composant et s'abonne aux changements de catégorie depuis le SharedService.
   */
  ngOnInit(): void {
    this.sharedService.currentCategory$.subscribe((category) => {
      this.category = category; // Met à jour localement la catégorie
      console.log('Catégorie mise à jour dans SearchBar :', this.category);
    });
  }

  /**
   * Méthode pour déclencher une recherche en fonction du mot-clé et de la catégorie active.
   */
  onSearch(): void {
    console.log('Recherche déclenchée avec mot-clé et catégorie :', {
      category: this.category,
      keyword: this.keyword.trim(),
    });
  }

  /**
   * Méthode pour réinitialiser la catégorie active via le SharedService.
   */
  clearCategory(): void {
    this.sharedService.setCategory(null); // Supprime la catégorie via le SharedService
    this.onSearch(); // Relance la recherche sans catégorie
  }
}
