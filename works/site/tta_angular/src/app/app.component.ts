import { Component } from '@angular/core';
import { SeoService } from './services/seo/seo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'tta_angular';

  // constructor() { }
  constructor(private seoService: SeoService) {
    seoService.loadSeoData();
  }
}
