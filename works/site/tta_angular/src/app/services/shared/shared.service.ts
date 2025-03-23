import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Service partagé permettant de gérer la catégorie active au sein de l'application.
 * 
 * ### Objets utilisables :
  * - **Observables** :
 *   - `currentCategory$` : Observable exposé pour suivre les changements de catégorie en temps réel.
 * 
 * - **Méthodes** :
 *   - `setCategory(category: string | null): void` : Définit la catégorie active.
 *   - `getCategory(): string | null` : Récupère la catégorie active de manière synchrone.
 */
@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private _categorySubject = new BehaviorSubject<string | null>(null); // Observable pour la catégorie
  /**
   * Observable exposée permettant aux composants de s'abonner aux changements de catégorie.
   */
  currentCategory$ = this._categorySubject.asObservable();

  /**
   * Définit la catégorie active.
   * @param category - La catégorie à définir
   */
  setCategory(category: string | null): void {
    this._categorySubject.next(category); // Met à jour la catégorie dans le BehaviorSubject
    console.log('[SharedService] : la valeur stockée de la catégorie est : ', this._categorySubject);
  }

  /**
   * Récupère la catégorie actuelle de manière synchrone.
   * @returns - La catégorie actuelle
   */
  getCategory(): string | null {
    return this._categorySubject.getValue(); // Récupère la dernière valeur enregistrée
  }
}
