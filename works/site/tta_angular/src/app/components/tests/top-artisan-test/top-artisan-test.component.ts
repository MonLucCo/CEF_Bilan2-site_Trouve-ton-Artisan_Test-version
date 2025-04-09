import { Component, OnInit } from '@angular/core';
import { ArtisanCard } from '../../../models/artisan-service.models';
import { ArtisanService } from '../../../services/artisan/artisan.service';

@Component({
  selector: 'app-top-artisan-test',
  standalone: false,
  templateUrl: './top-artisan-test.component.html',
  styleUrl: './top-artisan-test.component.scss'
})
export class TopArtisanTestComponent implements OnInit {
  topArtisansDirect: ArtisanCard[] = []; // Liste obtenue via ArtisanService
  artisans: ArtisanCard[] = []; // Liste brute pour utilisation avec le pipe

  constructor(private artisanService: ArtisanService) { }

  ngOnInit(): void {
    // Obtenir les artisans "top" via ArtisanService
    this.artisanService.getArtisanByTop().subscribe((artisans) => {
      this.topArtisansDirect = artisans;
    });

    // Charger tous les artisans pour utilisation du pipe
    this.artisanService.artisans$.subscribe((artisans) => {
      this.artisans = artisans;
    });
  }
}
