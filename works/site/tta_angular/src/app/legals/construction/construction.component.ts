import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-construction',
  standalone: false,
  templateUrl: './construction.component.html',
  styleUrl: './construction.component.scss'
})
export class ConstructionComponent {
  private metaElement: HTMLMetaElement | null = null;

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    // Vérifier si une balise <meta name="robots"> existe déjà
    this.metaElement = document.querySelector('meta[name="robots"]');

    if (this.metaElement) {
      // Sauvegarder l'ancienne valeur pour la restaurer après
      this.metaElement.setAttribute("data-original-content", this.metaElement.getAttribute("content") || "");
      // Modifier la directive SEO pour empêcher l'indexation de la page en construction
      this.metaElement.setAttribute("content", "noindex, nofollow");
    } else {
      // Créer une nouvelle balise si aucune n'existe
      this.metaElement = this.renderer.createElement('meta');
      this.renderer.setAttribute(this.metaElement, 'name', 'robots');
      this.renderer.setAttribute(this.metaElement, 'content', 'noindex, nofollow');
      this.renderer.appendChild(document.head, this.metaElement);
    }
  }

  ngOnDestroy() {
    if (this.metaElement) {
      const originalContent = this.metaElement.getAttribute("data-original-content");
      if (originalContent !== null) {
        // Restaurer l'ancienne valeur `index, follow`
        this.metaElement.setAttribute("content", originalContent);
        this.metaElement.removeAttribute("data-original-content"); // Supprimer l'attribut inutile
      } else {
        // Supprimer la balise si elle n'existait pas avant
        this.metaElement.remove();
      }
    }
  }
}

