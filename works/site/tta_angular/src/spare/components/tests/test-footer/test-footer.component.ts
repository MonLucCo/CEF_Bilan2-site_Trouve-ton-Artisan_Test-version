import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-test-footer',
  standalone: false,
  templateUrl: './test-footer.component.html',
  styleUrl: './test-footer.component.scss'
})
export class TestFooterComponent {
  @Input() showTestComponent: boolean = false; // Contrôle de l'affichage
}
