import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ArtisanCard } from '../../models/artisan-service.models';
import { ArtisanService } from '../../services/artisan/artisan.service';

/**
 * Composant TopArtisans - affiche les artisans marqués comme étant "top".
 */
@Component({
  selector: 'app-top-artisans',
  standalone: false,
  templateUrl: './top-artisans.component.html',
  styleUrl: './top-artisans.component.scss'
})
export class TopArtisansComponent implements OnInit {
  /**
   * Variable d'état indiquant si le chargement des données a rencontré un problème.
   */
  dataError: boolean = false;

  /**
   * Observable exposant la liste des artisans "top".
   * Utilisé directement dans le template Angular avec le pipe async.
   */
  topArtisans$: Observable<ArtisanCard[]> | undefined;

  /**
   * Variable d'état indiquant si aucun artisan "Top" n'est disponible.
   */
  hasNoTopArtisans: boolean = false;

  constructor(private artisanService: ArtisanService) { }

  ngOnInit(): void {
    // Récupération des artisans "top" et mise à jour des états d'erreur et de disponibilité.
    this.dataError = this.artisanService.hasDataError();
    this.topArtisans$ = this.artisanService.getArtisanByTop();

    this.topArtisans$.subscribe(topArtisans => {
      this.hasNoTopArtisans = (topArtisans.length === 0); // Vérification explicite
    });

    console.log('[] - [] : Initialisation des données terminée', {
      stateError: this.dataError,
      noTopArtisan: this.hasNoTopArtisans,
      topArtisans: this.topArtisans$
    });
  }
}

