import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title',
  standalone: false,
  templateUrl: './title.component.html',
  styleUrl: './title.component.scss'
})
export class TitleComponent {
  @Input() text: string = '';
  @Input() level: number = 1; // Niveau du titre (h1, h2, h3)
  @Input() icon?: string; // Icône FontAwesome en option
  @Input() description?: string; // Texte sous le titre en option
}
