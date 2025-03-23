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
  keyword: string = ''; // Mot-clé actuel
  mode: string = 'validate'; // Mode de recherche sélectionné (par défaut : avec validation par loupe)

  constructor(private sharedService: SharedService, private router: Router) { }

  ngOnInit(): void {
    // Récupérer la catégorie active depuis le service
    this.category = this.sharedService.getCategory();
    console.log('[Header]-[OnInit] : Catégorie dans HeaderComponent :', this.category);

    // Surveiller les changements de route pour réinitialiser la catégorie si nécessaire
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      const currentUrl = event.urlAfterRedirects;
      if (!currentUrl.startsWith('/categorie/')) {
        this.sharedService.setCategory(null); // Réinitialise la catégorie
        console.log('[Header]-[Router] : Réinitialisation de la catégorie après changement de route');
      }
    });
  }

  /**
   * Méthode appelée lorsque l'utilisateur change de mode.
   */
  onModeChange(mode: string): void {
    this.mode = mode;
  }

  /**
   * Méthode appelée lorsque la barre de recherche émet un événement.
   */
  onSearch(event: { category: string | null; keyword: string }): void {
    if (this.mode === 'validate') {
      // Exemple : Naviguer ou exécuter une logique
      console.log('[Header]-[onSearch] : Recherche activée pour la loupe : ', event);
    }
  }

  /**
   * Méthode appelée pour une recherche en temps réel (instantanée).
   */
  onRealTimeSearch(event: { category: string | null; keyword: string }): void {
    if (this.mode === 'realtime') {
      console.log('[Header]-[onSearch] : Recherche instantanée :', event);
    }
  }
}
