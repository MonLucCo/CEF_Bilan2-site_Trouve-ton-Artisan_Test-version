import { Component, Input } from '@angular/core';
import { SharedService } from '../../services/shared/shared.service';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  isValidateMode: boolean = false; // saisie instantanée désactivée pour la recherche
  showTestComponent: boolean = false; // Etat pour afficher ou cacher les outils de test MailDev
  showTools: boolean = false; // État pour afficher ou masquer les switchs d'accès aux outils

  constructor(private sharedService: SharedService) { }

  toggleSearchMode() {
    const searchMode = this.isValidateMode ? 'validateOn' : 'validateOff';
    this.sharedService.setSearchMode(searchMode);
    console.log('[Footer]-[toggleSearchmode] : Mode de recherche changé :', searchMode);
    this.isValidateMode = !this.isValidateMode;
  }

  toggleShowTestComponent() {
    this.showTestComponent = !this.showTestComponent;
    console.log('[Footer]-[toggleShowTestComponent] : MailDev affiché :', this.showTestComponent);
  }

  toggleToolAccess() {
    this.showTools = !this.showTools;
    console.log('[Footer]-[toggleToolAccess] : Affichage des outils changé :', this.showTools ? 'Visible' : 'Masqué');
  }
}
