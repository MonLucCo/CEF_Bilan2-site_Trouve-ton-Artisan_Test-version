import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-rating-stars',
  standalone: false,
  templateUrl: './rating-stars.component.html',
  styleUrl: './rating-stars.component.scss'
})
export class RatingStarsComponent implements OnChanges {
  @Input() note: number = 0; // Note entre 0 et 5
  stars: string[] = []; // Tableau contenant les types d'étoiles (full, half, empty)

  ngOnChanges(): void {
    this.generateStars(); // Génère les étoiles à chaque modification de la note
  }

  private generateStars(): void {
    this.stars = []; // Réinitialise le tableau
    const fullStars = Math.floor(this.note); // Nombre d'étoiles pleines
    const hasHalfStar = this.note % 1 >= 0.5; // Si une demi-étoile est présente
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); // Étoiles vides restantes

    // Ajoute les étoiles pleines
    for (let i = 0; i < fullStars; i++) {
      this.stars.push('full');
    }

    // Ajoute la demi-étoile si nécessaire
    if (hasHalfStar) {
      this.stars.push('half');
    }

    // Ajoute les étoiles vides
    for (let i = 0; i < emptyStars; i++) {
      this.stars.push('empty');
    }
  }
}
