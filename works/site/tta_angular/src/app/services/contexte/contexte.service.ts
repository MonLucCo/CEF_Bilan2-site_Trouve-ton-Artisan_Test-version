import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContextService {
  private selectedCategory = new BehaviorSubject<string | null>(null); // Catégorie sélectionnée actuelle

  /**
   * Définit la catégorie actuellement sélectionnée dans le contexte.
   * @param category - La catégorie sélectionnée, ou null si aucune catégorie n'est active.
   */
  setCategory(category: string | null): void {
    this.selectedCategory.next(category);
  }

  /**
   * Récupère la catégorie actuellement sélectionnée sous forme d'Observable.
   * Permet de suivre les changements de catégorie en temps réel.
   * @returns Observable contenant la catégorie sélectionnée ou null.
   */
  getCategory() {
    return this.selectedCategory.asObservable();
  }

  /**
   * Réinitialise le contexte en supprimant la catégorie sélectionnée.
   */
  clearCategory(): void {
    this.selectedCategory.next(null);
  }
}
