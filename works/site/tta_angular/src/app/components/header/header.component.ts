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

    // Surveiller les changements de route pour réinitialiser la catégorie si nécessaire
    // this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
    //   const currentUrl = event.urlAfterRedirects;
    //   if (!currentUrl.startsWith('/categorie/')) {
    //     this.sharedService.setCategory(null); // Réinitialise la catégorie
    //     console.log('[Header]-[Router] : Réinitialisation de la catégorie après changement de route');
    //   }
    // });
  }

  /**
   * Définit une nouvelle catégorie et redirige vers la route correspondante.
   * @param category - La catégorie sélectionnée
   */
  // onCategoryChange(category: string): void {
  //   this.sharedService.setCategory(category); // Met à jour la catégorie active dans SharedService
  //   this.router.navigate(['/categorie', category]); // Redirige vers la page de la catégorie
  //   console.log('[Header]-[onCategoryChange] : Catégorie changée et redirection :', category);
  // }

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

    // Ajout des paramètres category et keyword si présents
    if (event.category) {
      queryParams['category'] = event.category;
    }
    if (event.keyword) {
      queryParams['keyword'] = event.keyword;
    }

    // Redirection selon les paramètres
    if (!event.category && !event.keyword) {
      this.router.navigate(['/liste-artisans']); // Redirection vers /liste-artisans si aucun paramètre
    } else {
      this.router.navigate(['/recherche'], { queryParams }); // Redirection vers /recherche avec les paramètres
    }

    console.log('[Header]-[onSearch] : Redirection effectuée avec les paramètres :', queryParams);
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
