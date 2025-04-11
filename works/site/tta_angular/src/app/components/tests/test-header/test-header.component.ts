import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OptionalString } from '../../../models/shared-service.models';
import { SharedService } from '../../../services/shared/shared.service';

/**
 * Composant du Header affichant le menu et interagissant avec la catégorie active via SharedService.
 */

@Component({
  selector: 'app-test-header',
  standalone: false,
  templateUrl: './test-header.component.html',
  styleUrl: './test-header.component.scss'
})
export class TestHeaderComponent implements OnInit {
  @Output() toggleTestMode = new EventEmitter<void>(); // Émetteur d'événement
  testMode: boolean = false; // Etat du mode test

  category: OptionalString = null; // Catégorie active dans le header
  keyword: OptionalString = ''; // Mot-clé actuel
  mode: string = 'validate'; // Mode de recherche sélectionné (par défaut : avec validation par loupe)
  topActionCounter: number = 0; // Compteur pour tracer le top d'une action

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

    // Mise à jour de l'URL via la méthode centralisée
    this.updateUrlIfNeeded(event);
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
    const currentContactId = this.route.snapshot.queryParamMap.get('contact');

    this.sharedService.setCategory(currentCategory);
    this.sharedService.setKeyword(currentKeyword || '');
    this.sharedService.setContactId(currentContactId || null);
    console.log('[Header]-[syncFromUrl] : Synchronisé depuis l’URL', {
      categorie: currentCategory,
      recherche: currentKeyword,
      contact: currentContactId,
    });
  }

  /**
 * Vérifie si les paramètres d'URL doivent être mis à jour, pour éviter les boucles infinies.
 */
  private updateUrlIfNeeded(event?: { category: OptionalString; keyword: OptionalString }): void {
    const queryParams: any = {};

    console.log("[Header]-[UpdateUrlIfNeeded] : Valeur de l'event", event);

    const category = event?.category ?? this.category; // Utilise la catégorie de l'événement ou celle locale
    const keyword = event?.keyword ?? this.keyword; // Utilise le mot-clé de l'événement ou celui local

    if (category) queryParams['categorie'] = category.trim();
    if (keyword) queryParams['recherche'] = keyword.trim();

    // Compare les paramètres actuels et ceux souhaités
    const currentCategory = this.route.snapshot.queryParamMap.get('categorie');
    const currentKeyword = this.route.snapshot.queryParamMap.get('recherche');

    if (
      currentCategory !== queryParams['categorie'] ||
      currentKeyword !== queryParams['recherche']
    ) {
      this.isUpdatingUrl = true; // Active le drapeau pour éviter les boucles
      this.router.navigate(['/artisans'], { queryParams }).finally(() => {
        this.isUpdatingUrl = false; // Réinitialise le drapeau après la mise à jour
      });
      console.log('[Header]-[UpdateUrlIfNeeded] : URL mise à jour avec paramètres :', queryParams);
    } else {
      console.log('[Header]-[UpdateUrlIfNeeded] : Aucune mise à jour nécessaire, l\'URL est déjà correcte.');
    }
  }


  /**
   * Méthode pour trace de 'début ou de fin d'action
   */
  onTraceAction(): void {
    this.topActionCounter++;
    console.log('[Header]-[onTraceAction] : Top de la trace', this.topActionCounter);
  }

  /**
   * Active ou désactive le mode test et informe l'AppComponent.
   */
  onToggleTestMode(): void {
    this.testMode = !this.testMode;
    this.toggleTestMode.emit(); // Emet un événement
    console.log('[Header]-[toggleTestMode] : Mode test activé :', this.testMode);
  }

  /**
   * Renvoie le texte du bouton selon l'état du mode test.
   */
  getTestModeButtonText(): string {
    return this.testMode ? 'Désactiver Test' : 'Activer Test';
  }
}
