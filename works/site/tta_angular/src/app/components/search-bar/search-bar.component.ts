import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  @Input() modeOnRealTimeSearch: boolean = false; // Mode de recherche (instantanée ou avec validation)
  @Output() search = new EventEmitter<{ category: string | null; keyword: string }>(); // Événement émis pour lancer la recherche

  category: string | null = null; // Catégorie active
  keyword: string = ''; // Mot-clé actuel
  categoryActive: boolean = true; // Indique si la catégorie est activée
  placeholder: string = 'Rechercher...'; // Placeholder du champ de recherche


  constructor(private sharedService: SharedService, private router: Router) { }

  /**
   * Initialise le composant et s'abonne aux changements de catégorie depuis le SharedService.
   */
  ngOnInit(): void {
    // Abonnement aux changements de catégorie
    this.sharedService.currentCategory$.subscribe((category) => {
      this.category = category; // Met à jour localement la catégorie
      this.categoryActive = true; // Réinitialise l'activation de la catégorie
      this.triggerSearch();
      console.log('[SearchBar]-[ngOnInit] : Mise à jour liste et Catégorie par SearchBar :', this.category);
    });

    // Abonnement aux changments de mode de recherche
    this; this.sharedService.currentSearchMode$.subscribe((mode) => {
      this.modeOnRealTimeSearch = mode === 'validateOff'; // Active/Désactive la recherche instantanée
      this.placeholder = mode === 'validateOn'
        ? 'Recherche avec validation !'
        : 'Recherche instantanée !'; // Met à jour le placeholder
      console.log('[SearchBar]-[ngOnInit] : Récupération du mode courant de recherche dans SearchBar :', mode);
      console.log('[SearchBar]-[ngOnInit] : Mode de recherche (temps réel) mise à jour dans SearchBar :', this.modeOnRealTimeSearch);
      console.log('[SearchBar]-[ngOnInit] : PlaceHolder mis à jour dans SearchBar :', this.placeholder);
    });
  }

  /**
   * Recherche manuelle ou instantanée.
   */
  onInputChange(): void {
    if (this.modeOnRealTimeSearch) {
      this.triggerSearch();
    }
  }

  /**
   * Méthode pour déclencher une recherche en fonction du mot-clé et de la catégorie active.
   */
  triggerSearch(): void {
    this.search.emit({
      category: this.categoryActive ? this.category : null,
      keyword: this.keyword.trim(),
    });
    console.log('[SearchBar]-[triggerSearch] : Recherche déclenchée avec mot-clé et catégorie :', {
      category: this.category,
      keyword: this.keyword.trim(),
    });
    this.updateUrl();
  }

  /**
   * Active ou désactive la catégorie sans l'effacer.
   */
  toggleCategory(): void {
    this.categoryActive = !this.categoryActive;
    this.triggerSearch();
  }

  /**
   * Méthode pour réinitialiser le champ de recherche.
   */
  resetSearchField(): void {
    this.keyword = ''; // Réinitialise le mot-clé
    if (this.sharedService.getCategory()) {
      this.categoryActive = true; // Réactive la catégorie
    }
    this.triggerSearch(); // Relance une recherche avec le mot-clé vide et la catégorie
  }

  /**
   * Met à jour l'URL selon l'état actuel (catégorie et mot-clé).
   */
  updateUrl(): void {
    const queryParams: any = {};
    if (this.categoryActive && this.category) {
      queryParams['category'] = this.category;
    }
    if (this.keyword.trim()) {
      queryParams['keyword'] = this.keyword.trim();
    }

    if (!this.category && !this.keyword.trim()) {
      this.router.navigate(['/liste-artisans']); // Basculer sur '/liste-artisans'
    } else {
      this.router.navigate(['/recherche'], { queryParams });
    }
  }
}
