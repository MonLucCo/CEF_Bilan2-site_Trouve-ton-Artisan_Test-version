import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../../services/shared/shared.service';

/**
 * Composant du Header affichant le menu et interagissant avec la catégorie active via SharedService.
 */
@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  category: string | null = null; // Catégorie active dans le header
  keyword: string = ''; // Mot-clé actuel
  mode: string = 'validate'; // Mode de recherche sélectionné (par défaut : avec validation par loupe)
  topAction: boolean = false; // Permet de tracer le top d'une action
  private isUpdatingUrl = false; // Drapeau pour contrôler les mises à jour

  constructor(
    private sharedService: SharedService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Initialisation depuis l'URL pour éviter les conflits initiaux
    this.syncFromUrl();

    // Abonnement aux changements de catégorie active via SharedService
    this.sharedService.currentCategory$.subscribe((category) => {
      if (!this.isUpdatingUrl) {
        this.category = category;
        this.updateUrlIfNeeded(); // Met à jour l'URL si nécessaire
        console.log('[Header]-[OnInit] : Catégorie active mise à jour :', this.category);
      }
    });

    // Abonnement aux changements de mot-clé via SharedService
    this.sharedService.currentKeyword$.subscribe((keyword) => {
      if (!this.isUpdatingUrl) {
        this.keyword = keyword;
        this.updateUrlIfNeeded(); // Met à jour l'URL si nécessaire
        console.log('[Header]-[OnInit] : Mot-clé actif mis à jour :', this.keyword);
      }
    });
  }

  /**
   * Méthode appelée lorsque l'utilisateur change de mode.
   */
  onModeChange(mode: string): void {
    const searchMode = mode === 'validate' ? 'validateOn' : 'validateOff';
    this.sharedService.setSearchMode(searchMode);
    console.log('[Header]-[onModeChange] : Mode de recherche changé :', searchMode);
  }

  /**
 * Met à jour l'URL en fonction des catégories et mots-clés.
 */
  private updateUrl(): void {
    const queryParams: any = {};

    if (this.category) {
      queryParams['categorie'] = this.category.trim();
    }
    if (this.keyword) {
      queryParams['recherche'] = this.keyword.trim();
    }

    this.router.navigate(['/artisans'], { queryParams });
    console.log('[Header]-[updateUrl] : URL mise à jour avec paramètres :', queryParams);
  }

  /**
   * Méthode appelée lorsque la barre de recherche émet un événement.
   */
  onSearch(event: { category: string | null; keyword: string }): void {
    this.sharedService.setCategory(event.category); // Mise à jour de la catégorie
    this.sharedService.setKeyword(event.keyword); // Mise à jour du mot-clé
    console.log('[Header]-[onSearch] : Événement de recherche traité :', event);
  }

  /**
   * Méthode appelée pour une recherche en temps réel (instantanée).
   */
  onRealTimeSearch(event: { category: string | null; keyword: string }): void {
    if (this.mode === 'realtime') {
      console.log('[Header]-[onSearch] : Recherche instantanée :', event);
    }
  }


  /**
   * Synchronise les paramètres initiaux depuis l'URL.
   */
  private syncFromUrl(): void {
    const currentCategory = this.route.snapshot.queryParamMap.get('categorie');
    const currentKeyword = this.route.snapshot.queryParamMap.get('recherche');

    this.sharedService.setCategory(currentCategory);
    this.sharedService.setKeyword(currentKeyword || '');
    console.log('[Header]-[syncFromUrl] : Synchronisé depuis l’URL', {
      categorie: currentCategory,
      recherche: currentKeyword,
    });
  }

  /**
 * Vérifie si les paramètres d'URL doivent être mis à jour, pour éviter les boucles infinies.
 */
  private updateUrlIfNeeded(): void {
    const queryParams: any = {};
    if (this.category) queryParams['categorie'] = this.category.trim();
    if (this.keyword) queryParams['recherche'] = this.keyword.trim();

    // Compare les paramètres actuels et ceux souhaités
    const currentCategory = this.route.snapshot.queryParamMap.get('categorie');
    const currentKeyword = this.route.snapshot.queryParamMap.get('recherche');

    if (
      currentCategory !== queryParams['categorie'] ||
      currentKeyword !== queryParams['recherche']
    ) {
      this.isUpdatingUrl = true; // Active le drapeau pour prévenir les boucles
      this.router.navigate(['/artisans'], { queryParams }).finally(() => {
        this.isUpdatingUrl = false; // Réinitialise le drapeau après la mise à jour
      });
      console.log('[Header]-[UpdateUrlIfNeeded] : URL mise à jour avec paramètres :', queryParams);
    }
  }

  /**
   * Méthode pour trace de 'début ou de fin d'action
   */
  onTraceAction(): void {
    this.topAction = !this.topAction;
    console.log('[Header]-[onTraceAction] : Top de la trace', this.topAction);
  }
}
