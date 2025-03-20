import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Artisan } from '../../models/artisan.models';

@Injectable({
  providedIn: 'root'
})
export class ArtisanService {
  private dataUrl = '/datas.json'; // Chemin vers le fichier JSON

  constructor(private http: HttpClient) { }

  // Récupérer tous les artisans
  getArtisans(): Observable<Artisan[]> {
    return this.http.get<Artisan[]>(this.dataUrl)
  }


  // Récupérer un artisan par ID
  getArtisanById(id: string): Observable<Artisan | undefined> {
    return this.getArtisans().pipe(
      map((artisans) => artisans.find(artisan => artisan.id === id))
    );
  }

  // Filtrer les artisans par catégorie
  getArtisansByCategory(category: string): Observable<Artisan[]> {
    return this.getArtisans().pipe(
      map((artisans) => artisans.filter(artisan => artisan.category === category))
    );
  }

  // Récupérer les artisans marqués comme "top"
  getTopArtisans(): Observable<Artisan[]> {
    return this.getArtisans().pipe(
      map((artisans) => artisans.filter(artisan => artisan.top === true))
    );
  }

  // Rechercher des artisans par mot-clé
  searchArtisans(keyword: string): Observable<Artisan[]> {
    return this.getArtisans().pipe(
      map((artisans) => artisans.filter(artisan =>
        artisan.name.toLowerCase().includes(keyword.toLowerCase()) ||
        artisan.specialty.toLowerCase().includes(keyword.toLowerCase()) ||
        artisan.location.toLowerCase().includes(keyword.toLowerCase())
      ))
    );
  }
}
