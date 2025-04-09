import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ContextMode, FiltredMode, OptionalString, SearchMode } from '../../models/shared-service.models';

/**
 * Service partagé permettant de gérer les états globaux au sein de l'application.
 * 
 * ### Objets utilisables :
 * - **Observables** :
 *   - `currentCategory$` : Observable exposé pour suivre les changements de catégorie en temps réel.
 *   - `currentSearchMode$` : Observable exposé pour suivre le mode de saisie des mots-clés en temps réel.
 *   - `currentFiltredMode$` : Observable exposé pour suivre les modes de filtrage.
 *   - `currentContextMode$` : Observable exposé pour suivre le mode d'affichage souhaité.
 *   - `currentKeyword$` : Observable exposé pour suivre la chaîne de recherche en temps réel.
 *   - `currentContactid$` : Observable exposé pour suivre l'identifiant du contact sélectionné en temps réel.
 * 
 * - **Méthodes** :
 *   - `resetFiltredMode(): void` : Réinitialise le mode de filtrage et tous les états associés.
 *   - `getFiltredMode(): FiltredMode : Récupère le le mode de filtrage actif de manière synchrone.
 *   - `setCategory(category: OptionalString): void` : Définit la catégorie active.
 *   - `getCategory(): OptionalString` : Récupère la catégorie active de manière synchrone.
 *   - `setKeyword(keyword: OptionalString): void` : Définit la chaîne de caractères saisie dans le champ de recherche actif.
 *   - `getKeyword(): OptionalString` : Récupère la chaîne de recherche actuelle de manière synchrone.
 *   - `setSearchMode(mode: SearchMode): void` : Définit le mode de recherche actif.
 *   - `getSearchMode(): SearchMode` : Récupère le mode de recherche actif de manière synchrone.
 *   - `setContextMode(mode: ContextMode): void` : Définit le mode d'affichage actif.
 *   - `getContextMode(): ContextMode` : Récupère le mode d'affichage souhaité de manière synchrone.
 *   - `setContactId(id: OptionalString): void` : Définit l'identifiant du contact sélectionné.
 *   - `getContactId() : OptionalString` : Récupère l'identifiant du contact sélectionné.
 */

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  // Gestion de la catégorie (active) utilisée pour les URLs
  private _categorySubject = new BehaviorSubject<OptionalString>(null);
  currentCategory$ = this._categorySubject.asObservable();

  // Gestion du mode de saisie des mots-clés
  private _searchModeSubject = new BehaviorSubject<SearchMode>('validateOn');
  currentSearchMode$ = this._searchModeSubject.asObservable();

  // Gestion du mode de filtrage
  private _filtredModeSubject = new BehaviorSubject<FiltredMode>(null);
  currentFiltredMode$ = this._filtredModeSubject.asObservable();

  // Gestion du mode d'affichage {list, contact, erreur}
  private _contextModeSubject = new BehaviorSubject<ContextMode>('accueil');
  currentContextMode$ = this._contextModeSubject.asObservable();

  // Gestion des mots-clés saisis dans le champ de recherche
  private _keywordSubject = new BehaviorSubject<OptionalString>('');
  currentKeyword$ = this._keywordSubject.asObservable();

  // Gestion de l'identifiant du contact sélectionné
  private currentContactIdSubject = new BehaviorSubject<OptionalString>(null);
  currentContactId$ = this.currentContactIdSubject.asObservable();

  /**
   * Méthode privée pour gérer les changements conditionnels sur un BehaviorSubject.
   * Met à jour la valeur du subject uniquement si celle-ci est différente de la valeur actuelle.
   * Permet d'exécuter une fonction callback après la mise à jour, si définie.
   * 
   * @template T - Type de la valeur suivie par le BehaviorSubject.
   * @param subject - Le BehaviorSubject à modifier.
   * @param newValue - La nouvelle valeur à appliquer au BehaviorSubject.
   * @param callback - Fonction optionnelle à exécuter si le changement est effectué.
   */
  private changeValue<T>(
    subject: BehaviorSubject<T>,
    newValue: T,
    callback?: () => void
  ): void {
    if (subject.getValue() !== newValue) {
      subject.next(newValue); // Change la valeur uniquement si différente
      console.log(`[SharedService] : Valeur changée - Nouvelle valeur : ${newValue}`);

      if (callback) {
        callback(); // Exécute le callback si défini
      }
    }
    // else {
    //   // Pas de modification, aucun log nécessaire
    //   console.log('[SharedService] : Aucune modification détectée.');
    // }
  }

  /**
   * Recalcule le mode de filtrage en fonction de la catégorie et du mot-clé.
   * (machine d'états et de transitions)
   */
  private updateFiltredMode(): void {
    const keyword = this.getKeyword();
    const category = this.getCategory();
    const categoryActive = category !== null;

    let newMode: 'searchOnly' | 'categoryOnly' | 'fullFiltred' | null = null;

    if (keyword && categoryActive) {
      newMode = 'fullFiltred';
    } else if (categoryActive) {
      newMode = 'categoryOnly';
    } else if (keyword) {
      newMode = 'searchOnly';
    }

    // Émettre uniquement si le mode est différent
    this.changeValue(this._filtredModeSubject, newMode);
  }

  /**
   * Réinitialise le mode de filtrage et tous les états associés.
   */
  resetFiltredMode(): void {
    this.changeValue(this._categorySubject, null);
    this.changeValue(this._keywordSubject, '');
    this.changeValue(this._filtredModeSubject, null); // Réinitialise à "none"
    console.log('[SharedService] : Machine d\'état réinitialisée. FiltredMode = none');
  }

  /**
   * Définit le mode de filtrage actif.
   * @param mode - Le mode de filtrage à définir dans la liste FiltredMode
   */
  setFiltredMode(mode: FiltredMode): void {
    this.changeValue(this._filtredModeSubject, mode);
    // console.log('[SharedService] : Mode de filtrage mis à jour :', this._filtredModeSubject.getValue());
  }

  /**
   * Définit la catégorie active.
   * @param category - La catégorie à définir (null si aucune catégorie)
   */
  setCategory(category: OptionalString): void {
    if (category === '') {
      console.error("[] Une chaîne vide ne peut pas être une catégorie.");
      return;
    }
    this.changeValue(this._categorySubject, category, () => this.updateFiltredMode()); // Si modification, recalcule le mode
    // console.log('[SharedService] : Catégorie active mise à jour :', this._categorySubject.getValue());
  }

  /**
   * Récupère la catégorie active de manière synchrone.
   * @returns - La catégorie active ou null
   */
  getCategory(): OptionalString {
    return this._categorySubject.getValue();
  }

  /**
   * Définit la chaîne de caractères saisie dans le champ de recherche.
   * @param keyword - La chaîne de caractères à définir (vide si aucun mot-clé)
   */
  setKeyword(keyword: OptionalString): void {
    if (keyword === null) {
      console.error("[] Un mot-clé ne peut pas avoir une valeur 'null'.");
      return;
    }
    this.changeValue(this._keywordSubject, keyword.trim(), () => this.updateFiltredMode()); // Si modification, recalcule le mode
  }

  /**
   * Récupère la chaîne de recherche actuelle de manière synchrone.
   * @returns - Le mot-clé actuel
   */
  getKeyword(): OptionalString {
    return this._keywordSubject.getValue();
  }

  /**
   * Définit le mode de recherche actif.
   * @param mode - Le mode de recherche à définir dans la liste de SearchMode
   */
  setSearchMode(mode: SearchMode): void {
    this.changeValue(this._searchModeSubject, mode);
  }

  /**
   * Récupère le mode de recherche actif de manière synchrone.
   * @returns - Le mode de recherche actuel
   */
  getSearchMode(): SearchMode {
    return this._searchModeSubject.getValue();
  }

  /**
   * Récupère le mode de filtrage actif de manière synchrone.
   * @returns - Le mode de filtrage actuel ou null
   */
  getFiltredMode(): FiltredMode {
    return this._filtredModeSubject.getValue();
  }

  /**
   * Définit le mode d'affichage souhaité.
   * @param mode - Le mode d'affichage à définir dans la liste de ContextMode
   */
  setContextMode(mode: ContextMode): void {
    this.changeValue(this._contextModeSubject, mode);
  }

  /**
   * Récupère le mode d'affichage souhaité de manière synchrone.
   * @returns - Le mode d'affichage actuel
   */
  getContextMode(): ContextMode {
    return this._contextModeSubject.getValue();
  }

  /**
   * Définit un nouvel ID pour le contact sélectionné.
   * @param id - Identifiant du contact, ou null pour réinitialiser.
   */
  setContactId(id: OptionalString): void {
    if (id === '' || id === null) {
      console.error(" Un identifiant (id) ne peut être ni vide, ni null ")
    }
    this.changeValue(this.currentContactIdSubject, id);
  }

  /**
   * Récupère l'ID actuel du contact (valeur synchronisée).
   * @returns ID du contact sélectionné, ou null si non défini.
   */
  getContactId(): OptionalString {
    return this.currentContactIdSubject.getValue();
  }
}
