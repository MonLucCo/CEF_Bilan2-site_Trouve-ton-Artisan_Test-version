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
   * Observable exposant la liste des artisans "top".
   * Utilisé directement dans le template Angular avec le pipe async.
   */
  topArtisans$: Observable<ArtisanCard[]> | undefined;

  constructor(private artisanService: ArtisanService) { }

  ngOnInit(): void {
    // Récupère les artisans "top" en tant qu'Observable depuis ArtisanService.
    this.topArtisans$ = this.artisanService.getArtisanByTop();
  }
}
