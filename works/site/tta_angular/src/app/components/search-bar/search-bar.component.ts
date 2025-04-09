import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SharedService } from '../../services/shared/shared.service';
import { take } from 'rxjs';
import { OptionalString } from '../../models/shared-service.models';

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

  category: OptionalString = null; // Catégorie actuellement visible dans la barre
  keyword: OptionalString = ''; // Mot-clé actuel
  categoryMemory: OptionalString = null; // Catégorie "en mémoire" pour la gestion locale
  categoryActive: boolean = true; // État de l'activation/désactivation de la catégorie
  placeholder: string = 'Rechercher...';

  constructor(private sharedService: SharedService) { }

  /**
   * Initialise le composant et s'abonne aux changements de catégorie et de mode de recherche depuis SharedService.
   */
  ngOnInit(): void {
    // Gestion du changement de contexte via currentContextMode$
    this.sharedService.currentContextMode$.subscribe((contextMode) => {
      if (contextMode !== 'list') {
        // Réinitialiser complètement les champs dans les autres contextes
        this.category = null;
        this.categoryMemory = null;
        this.categoryActive = false;
        this.keyword = '';
        console.log('[SearchBar] : Contexte changé vers', contextMode, '- réinitialisation complète de SearchBar.');
      } else {
        // Pas de réinitialisation complète, car en mode liste
        console.log('[SearchBar] : Mode contexte liste activé, pas de réinitialisation complète.');
      }
    });

    // Synchronisation des catégories via currentCategory$
    this.sharedService.currentCategory$.subscribe((category) => {
      if (category !== null) {
        // Actualiser la mémoire uniquement si la catégorie est non nulle
        this.categoryMemory = category;
      }

      // Mettre à jour l'état local
      this.category = category;
      this.categoryActive = category !== null; // Activer ou désactiver le bouton selon la catégorie
      console.log('[SearchBar] : Catégorie synchronisée :', category);
    });

    // Synchronisation des mots-clés via currentKeyword$
    this.sharedService.currentKeyword$.subscribe((keyword) => {
      this.keyword = keyword; // Mettre à jour l'état local
      console.log('[SearchBar] : Mot-clé synchronisé :', keyword);
    });

    // Abonnement aux changements de mode de recherche via currentSearchMode$
    this.sharedService.currentSearchMode$.subscribe((mode) => {
      this.modeOnRealTimeSearch = mode === 'validateOff'; // Active/Désactive la recherche instantanée
      this.placeholder = mode === 'validateOn'
        ? 'Recherche avec validation !'
        : 'Recherche instantanée !';
      console.log('[SearchBar]-[Abonnement] : Mise à jour mode de recherche :', mode);
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
   * Méthode utilitaire pour vérifier si un mot-clé est vide ou null.
   */
  isKeywordValid(): boolean {
    return this.keyword ? this.keyword.trim().length > 0 : false;
  }

  /**
   * Méthode pour déclencher une recherche et mettre à jour les données dans SharedService.
   */
  triggerSearch(): void {
    if (this.keyword === null) {
      console.error("[SearchBar]-[triggerSearch] Un mot-clé ne peut être 'null'. Il sera traité comme une chaîne vide.")
    }
    const trimmedKeyword = this.keyword ? this.keyword.trim() : ''; // Traiter le cas où keyword est null

    // Mettre à jour le mot-clé dans SharedService
    this.sharedService.setKeyword(trimmedKeyword);

    if (this.categoryActive) {
      // Mettre à jour la catégorie si active
      this.sharedService.setCategory(this.category);
      this.categoryMemory = this.category; // Mémoriser la catégorie active localement
    } else {
      // Supprimer la catégorie des URLs si désactivée
      this.sharedService.setCategory(null);
    }

    // Émettre l'événement de recherche avec catégorie et mot-clé pour relancer le filtrage
    this.search.emit({ category: this.categoryActive ? this.categoryMemory : null, keyword: trimmedKeyword });

    console.log("[triggerSearch] emission de l'événement ", { category: this.categoryActive ? this.categoryMemory : null, keyword: trimmedKeyword });
  }

  /**
   * Active ou désactive la catégorie sans l'effacer.
   */
  toggleCategory(): void {
    this.categoryActive = !this.categoryActive;

    if (this.categoryActive) {
      // Restaurer la catégorie depuis la mémoire
      this.category = this.categoryMemory;
      this.sharedService.setCategory(this.category); // Actualiser l'URL
    } else {
      // Désactiver la catégorie pour l'URL
      this.sharedService.setCategory(null);
    }
    this.triggerSearch();
  }

  /**
   * Réinitialise le champ de recherche.
   */
  resetSearchField(): void {
    this.keyword = ''; // Réinitialise le mot-clé
    this.sharedService.setKeyword(''); // Met à jour le mot-clé dans SharedService

    console.log("[SearchBar]-[resetSearchField] Réinitialisation de la recherche", { categoryMemory: this.categoryMemory, categoryActive: this.categoryActive, category: this.category, keyword: this.keyword })

    if (this.categoryMemory) {
      // Si une catégorie est mémorisée, réactivez-la et mettez à jour l'URL
      this.categoryActive = true; // Réactiver le bouton catégorie
      this.category = this.categoryMemory; // Restaurer la catégorie depuis la mémoire locale
      this.sharedService.setCategory(this.category); // Mettre à jour la catégorie dans SharedService

      console.log('[SearchBar]-[resetSearchField] Champ de recherche réinitialisé avec catégorie active.', { categoryMemory: this.categoryMemory, categoryActive: this.categoryActive, category: this.category, keyword: this.keyword });
    } else {
      // Sinon, réinitialisez complètement l'état
      this.categoryActive = false;
      this.sharedService.setCategory(null); // Supprimer la catégorie dans SharedService
      console.log('[SearchBar]-[resetSearchField] Champ de recherche réinitialisé sans catégorie.', { categoryMemory: this.categoryMemory, categoryActive: this.categoryActive, category: this.category, keyword: this.keyword });
    }

    console.log('[SearchBar]-[resetSearchField] Champ de recherche réinitialisé.', { categoryMemory: this.categoryMemory, categoryActive: this.categoryActive, category: this.category, keyword: this.keyword });

    // Relancer la recherche
    this.triggerSearch();

  }
}
