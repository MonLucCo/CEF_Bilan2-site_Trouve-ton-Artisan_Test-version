import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Service partagé permettant de gérer la catégorie active au sein de l'application.
 * 
 * ### Objets utilisables :
  * - **Observables** :
 *   - `currentCategory$` : Observable exposé pour suivre les changements de catégorie en temps réel.
 *   - `currentSearchMode$` : Observable exposé pour suivre les changements de mode de recherche en temps réel.
 * 
 * - **Méthodes** :
 *   - `setCategory(category: string | null): void` : Définit la catégorie active.
 *   - `getCategory(): string | null` : Récupère la catégorie active de manière synchrone.
 *   - `setSearchMode(mode: 'validateOn' | 'validateOff'): void` : Définit le mode de recherche actif.
 *   - `getSearchMode(): 'validateOn' | 'validateOff'` : Récupère le mode de recherche actif de manière synchrone.
 */
@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private _categorySubject = new BehaviorSubject<string | null>(null); // Observable pour la catégorie
  /**
   * Observable exposée permettant aux composants de s'abonner aux changements de catégorie des artisans.
   */
  currentCategory$ = this._categorySubject.asObservable();

  // Gestion du mode de recherche (validateOn ou validateOff)
  private _searchModeSubject = new BehaviorSubject<'validateOn' | 'validateOff'>('validateOn');
  /**
 * Observable exposée permettant aux composants de s'abonner aux changements de mode de recherche (validateOn ou validateoff).
 */
  currentSearchMode$ = this._searchModeSubject.asObservable();

  /**
   * Définit la catégorie active.
   * @param category - La catégorie à définir
   */
  setCategory(category: string | null): void {
    this._categorySubject.next(category); // Met à jour la catégorie dans le BehaviorSubject
    console.log('[SharedService] : la valeur stockée de la catégorie est : ', this._categorySubject.getValue());
  }

  /**
   * Récupère la catégorie actuelle de manière synchrone.
   * @returns - La catégorie actuelle
   */
  getCategory(): string | null {
    return this._categorySubject.getValue(); // Récupère la dernière valeur enregistrée
  }

  /**
   * Définit le mode de recherche actif.
   * @param mode - Le mode de recherche à définir ('validateOn' ou 'validateOff')
   */
  setSearchMode(mode: 'validateOn' | 'validateOff'): void {
    this._searchModeSubject.next(mode);
    console.log('[SharedService] : Mode de recherche mis à jour :', this._searchModeSubject.getValue());
  }

  /**
   * Récupère le mode de recherche actuel de manière synchrone.
   * @returns - Le mode de recherche actuel
   */
  getSearchMode(): 'validateOn' | 'validateOff' {
    return this._searchModeSubject.getValue();
  }
}
