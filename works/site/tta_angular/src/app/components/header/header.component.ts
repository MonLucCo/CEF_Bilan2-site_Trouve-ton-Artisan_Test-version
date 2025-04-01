import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SharedService } from '../../services/shared/shared.service';
import { filter } from 'rxjs';

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
  mode: string = 'validate'; // Mode de recherche sélectionné (par défaut : avec validation par loupe)
  topAction: boolean = false; // Permet de tracer le top d'une action

  constructor(private sharedService: SharedService, private router: Router) { }

  ngOnInit(): void {
    // Abonnement aux changements de catégorie active via SharedService
    this.sharedService.currentCategory$.subscribe((category) => {
      this.category = category;
      console.log('[Header]-[OnInit] : Catégorie active mise à jour :', this.category);
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
    const queryParams: any = {}; // Initialisation des paramètres d'URL

    // // Ajout des paramètres category et keyword si présents
    // if (event.category) {
    //   queryParams['categorie'] = event.category.trim();
    // }
    // if (event.keyword) {
    //   queryParams['recherche'] = event.keyword.trim();
    // }

    // // Redirection selon les paramètres
    // // this.router.navigate(['/artisans'], { queryParams: { event } });
    // if (!event.category && !event.keyword) {
    //   this.router.navigate(['/artisans']); // Redirection vers /artisans si aucun paramètre
    //   console.log('[Header]-[onSearch] : Redirection demandée vers /artisans', {
    //     routerUrl: this.router.url,
    //     queryParams: queryParams,
    //     event: event
    //   });
    // } else {
    //   this.router.navigate(['/artisans'], { queryParams }); // Redirection vers /recherche avec les paramètres
    //   console.log('[Header]-[onSearch] : Redirection demandée vers /artisans avec requête', {
    //     routerUrl: this.router.url,
    //     queryParams: queryParams,
    //     event: event
    //   });
    // }

    console.log('[Header]-[onSearch] : Redirection effectuée avec les paramètres :', { event, queryParams });
    // console.log('[Header]-[onSearch] : Activation effectuée avec les paramètres :', { event, queryParams });
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
   * Méthode pour trace de 'début ou de fin d'action
   */
  onTraceAction(): void {
    this.topAction = !this.topAction;
    console.log('[Header]-[onTraceAction] : Top de la trace', this.topAction);
  }
}
