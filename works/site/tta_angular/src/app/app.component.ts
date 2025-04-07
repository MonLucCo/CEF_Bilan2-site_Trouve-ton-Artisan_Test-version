import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'tta_angular';

  constructor() {
    console.log("[App] Activation du mode de testabilité");
  }

  // Propriété pour gérer l'état du mode test
  testMode: boolean = false; // Permet d'activer/désactiver la visualisation de composants de tests 

  // Méthode appelée par le Header pour activer/désactiver le mode test
  onToggleTestMode(): void {
    this.testMode = !this.testMode;
    console.log('[AppComponent] : testMode activé ? ', this.testMode);
  }
}
