import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Artisan {
  id: string;
  name: string;
  specialty: string;
  note: string;
  location: string;
  about: string;
  email: string;
  website: string;
  category: string;
  top: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private dataUrl = '/datas.json';

  constructor(private http: HttpClient) { }

  // Récupère tous les artisans
  getAllArtisans(): Observable<Artisan[]> {
    return this.http.get<Artisan[]>(this.dataUrl);
  }

  // Récupère un artisan spécifique par son ID
  getArtisanDetails(id: string): Observable<Artisan | undefined> {
    return this.http.get<Artisan[]>(this.dataUrl).pipe(
      map((artisans) => artisans.find((artisan) => artisan.id === id))
    );
  }
}
