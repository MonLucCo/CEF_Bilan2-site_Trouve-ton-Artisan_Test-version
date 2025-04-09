import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
 *   - `getFiltredMode(): 'searchOnly' | 'categoryOnly' | 'fullFiltred' | null` : Récupère le le mode de filtrage actif de manière synchrone.
 *   - `setCategory(category: string | null): void` : Définit la catégorie active.
 *   - `getCategory(): string | null` : Récupère la catégorie active de manière synchrone.
 *   - `setKeyword(keyword: string): void` : Définit la chaîne de caractères saisie dans le champ de recherche actif.
 *   - `getKeyword(): string` : Récupère la chaîne de recherche actuelle de manière synchrone.
 *   - `setSearchMode(mode: 'validateOn' | 'validateOff'): void` : Définit le mode de recherche actif.
 *   - `getSearchMode(): 'validateOn' | 'validateOff'` : Récupère le mode de recherche actif de manière synchrone.
 *   - `setContextMode(mode: 'list' | 'contact' | 'erreur'): void` : Définit le mode d'affichage actif.
 *   - `getContextMode(): 'list' | 'contact' | 'erreur'` : Récupère le mode d'affichage souhaité de manière synchrone.
 *   - `setContactId(id: string | null): void` : Définit l'identifiant du contact sélectionné.
 *   - `getContactId() : string | null` : Récupère l'identifiant du contact sélectionné.
 */

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  // Gestion de la catégorie (active) utilisée pour les URLs
  private _categorySubject = new BehaviorSubject<string | null>(null);
  currentCategory$ = this._categorySubject.asObservable();

  // Gestion du mode de saisie des mots-clés (validateOn ou validateOff)
  private _searchModeSubject = new BehaviorSubject<'validateOn' | 'validateOff'>('validateOn');
  currentSearchMode$ = this._searchModeSubject.asObservable();

  // Gestion du mode de filtrage {searchOnly, categoryOnly, fullFiltred, contactOnly ou null}
  private _filtredModeSubject = new BehaviorSubject<'searchOnly' | 'categoryOnly' | 'fullFiltred' | null>(null);
  currentFiltredMode$ = this._filtredModeSubject.asObservable();

  // Gestion du mode d'affichage {list, contact, erreur}
  private _contextModeSubject = new BehaviorSubject<'list' | 'contact' | 'erreur'>('list');
  currentContextMode$ = this._contextModeSubject.asObservable();

  // Gestion des mots-clés saisis dans le champ de recherche
  private _keywordSubject = new BehaviorSubject<string>('');
  currentKeyword$ = this._keywordSubject.asObservable();

  // Gestion de l'identifiant du contact sélectionné
  private currentContactIdSubject = new BehaviorSubject<string | null>(null);
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
   * @param mode - Le mode de filtrage à définir ('searchOnly', 'categoryOnly', 'fullFiltred')
   */
  setFiltredMode(mode: 'searchOnly' | 'categoryOnly' | 'fullFiltred'): void {
    this.changeValue(this._filtredModeSubject, mode);
    // console.log('[SharedService] : Mode de filtrage mis à jour :', this._filtredModeSubject.getValue());
  }

  /**
   * Définit la catégorie active.
   * @param category - La catégorie à définir (null si aucune catégorie)
   */
  setCategory(category: string | null): void {
    this.changeValue(this._categorySubject, category, () => this.updateFiltredMode()); // Si modification, recalcule le mode
    // console.log('[SharedService] : Catégorie active mise à jour :', this._categorySubject.getValue());
  }

  /**
   * Récupère la catégorie active de manière synchrone.
   * @returns - La catégorie active ou null
   */
  getCategory(): string | null {
    return this._categorySubject.getValue();
  }

  /**
   * Définit la chaîne de caractères saisie dans le champ de recherche.
   * @param keyword - La chaîne de caractères à définir (string vide si aucun mot-clé)
   */
  setKeyword(keyword: string): void {
    this.changeValue(this._keywordSubject, keyword.trim(), () => this.updateFiltredMode()); // Si modification, recalcule le mode
    // console.log('[SharedService] : Mot-clé mis à jour :', this._keywordSubject.getValue());
  }

  /**
   * Récupère la chaîne de recherche actuelle de manière synchrone.
   * @returns - Le mot-clé actuel
   */
  getKeyword(): string {
    return this._keywordSubject.getValue();
  }

  /**
   * Définit le mode de recherche actif.
   * @param mode - Le mode de recherche à définir ('validateOn' ou 'validateOff')
   */
  setSearchMode(mode: 'validateOn' | 'validateOff'): void {
    this.changeValue(this._searchModeSubject, mode);
    // console.log('[SharedService] : Mode de recherche mis à jour :', this._searchModeSubject.getValue());
  }

  /**
   * Récupère le mode de recherche actif de manière synchrone.
   * @returns - Le mode de recherche actuel
   */
  getSearchMode(): 'validateOn' | 'validateOff' {
    return this._searchModeSubject.getValue();
  }

  /**
   * Récupère le mode de filtrage actif de manière synchrone.
   * @returns - Le mode de filtrage actuel ou null
   */
  getFiltredMode(): 'searchOnly' | 'categoryOnly' | 'fullFiltred' | null {
    return this._filtredModeSubject.getValue();
  }

  /**
   * Définit le mode d'affichage souhaité.
   * @param mode - Le mode d'affichage à définir ('list' ou 'contact')
   */
  setContextMode(mode: 'list' | 'contact' | 'erreur'): void {
    this.changeValue(this._contextModeSubject, mode);
    // console.log("[SharedService] : Mode d'affichage mis à jour :", this._contextModeSubject.getValue());
  }

  /**
   * Récupère le mode d'affichage souhaité de manière synchrone.
   * @returns - Le mode d'affichage actuel
   */
  getContextMode(): 'list' | 'contact' | 'erreur' {
    return this._contextModeSubject.getValue();
  }

  /**
   * Définit un nouvel ID pour le contact sélectionné.
   * @param id - Identifiant du contact, ou null pour réinitialiser.
   */
  setContactId(id: string | null): void {
    this.changeValue(this.currentContactIdSubject, id);
  }

  /**
   * Récupère l'ID actuel du contact (valeur synchronisée).
   * @returns ID du contact sélectionné, ou null si non défini.
   */
  getContactId(): string | null {
    return this.currentContactIdSubject.getValue();
  }
}
