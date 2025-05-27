import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../../services/shared/shared.service';
import { OptionalString } from '../../models/shared-service.models';

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
    // const currentContextMode = this.sharedService.getContextMode(); // Récupère le mode d'affichage actuel
    // const currentContactId = this.sharedService.getContactId(); // Récupère l'ID du contact sélectionné

    // if (currentContextMode === 'contact' || currentContactId) {
    //   console.log('[Header]-[UpdateUrlIfNeeded] : Mode Contact détecté ou contact actif, pas de mise à jour d\'URL.');
    //   return; // Stoppe l'exécution pour éviter la redirection indésirable
    // }

    // Si l'événement est indéfini ou vide, on ignore l'update
    if (!event || (!event.category && !event.keyword)) {
      console.log('[Header]-[UpdateUrlIfNeeded] : Aucun changement utile détecté, mise à jour ignorée.');
      return;
    }

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
}
