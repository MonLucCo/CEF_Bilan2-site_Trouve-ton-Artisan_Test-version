import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SharedService } from '../../services/shared/shared.service';
import { take } from 'rxjs';

/**
 * Composant de barre de recherche avec gestion de catégorie.
 * - Permet la recherche par mot-clé.
 * - Gère un bouton lié à la catégorie active.
 */
@Component({
  selector: 'app-search-bar',
  standalone: false,
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  @Input() modeOnRealTimeSearch: boolean = false; // Mode de recherche (instantanée ou avec validation)
  @Output() search = new EventEmitter<{ category: string | null; keyword: string }>(); // Événement émis pour lancer la recherche

  category: string | null = null; // Catégorie active
  keyword: string = ''; // Mot-clé actuel
  categoryActive: boolean = true; // Indique si la catégorie est activée
  placeholder: string = 'Rechercher...'; // Placeholder du champ de recherche

  constructor(private sharedService: SharedService) { }

  /**
   * Initialise le composant et s'abonne aux changements de catégorie et de mode de recherche depuis SharedService.
   */
  ngOnInit(): void {
    // let isInitialized = false;

    // Initialisation unique du mot-clé via take(1)
    this.sharedService.currentKeyword$.pipe(take(1)).subscribe((keyword) => {
      this.keyword = keyword; // Initialise le champ de recherche
      console.log('[SearchBar]-[Abonnement] : Mot-clé initialisé avec :', keyword);
    });

    // Abonnement aux changements de catégorie
    this.sharedService.currentCategory$.subscribe((category) => {
      this.category = category; // Met à jour localement la catégorie
      this.categoryActive = true; // Réinitialise l'activation de la catégorie
      console.log('[SearchBar]-[Abonnement] : Mise à jour catégorie :', category);
    });

    // Abonnement aux changements de mode de recherche
    this.sharedService.currentSearchMode$.subscribe((mode) => {
      this.modeOnRealTimeSearch = mode === 'validateOff'; // Active/Désactive la recherche instantanée
      this.placeholder = mode === 'validateOn'
        ? 'Recherche avec validation !'
        : 'Recherche instantanée !';
      console.log('[SearchBar]-[Abonnement] : Mise à jour mode de recherche :', mode);
    });

    // isInitialized = true; // Initialisation terminée
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
   * Méthode pour déclencher une recherche et mettre à jour les données dans SharedService.
   */
  triggerSearch(): void {
    const trimmedKeyword = this.keyword.trim();
    this.sharedService.setKeyword(trimmedKeyword);
    this.sharedService.setCategory(this.categoryActive ? this.category : null);

    console.log('[SearchBar] : Recherche déclenchée avec mot-clé et catégorie :', {
      category: this.categoryActive ? this.category : null,
      keyword: trimmedKeyword,
    });
  }

  /**
   * Active ou désactive la catégorie sans l'effacer.
   */
  toggleCategory(): void {
    this.categoryActive = !this.categoryActive;
    this.triggerSearch();
  }

  /**
   * Réinitialise le champ de recherche.
   */
  resetSearchField(): void {
    this.keyword = ''; // Réinitialise le mot-clé
    this.categoryActive = true; // Réactive la catégorie par défaut
    this.triggerSearch(); // Relance une recherche avec le mot-clé vide et la catégorie
    console.log('[SearchBar] : Champ de recherche réinitialisé.');
  }
}
