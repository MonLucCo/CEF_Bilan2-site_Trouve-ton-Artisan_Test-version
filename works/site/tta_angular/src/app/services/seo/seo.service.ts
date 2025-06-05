import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { baseHref } from '../../utils/base-href.utils';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  constructor(private meta: Meta, private title: Title, private http: HttpClient) { }

  loadSeoData() {

    console.log("[loadSeoData] - SEO Service en route !");

    Promise.all([
      // firstValueFrom(this.http.get(baseHref('/datas/seo-config.json'))),
      // firstValueFrom(this.http.get(baseHref('/datas/site-schema.json'))),
      // firstValueFrom(this.http.get(baseHref('/datas/artisan-schema.json')))
      firstValueFrom(this.http.get('datas/seo-config.json')),
      firstValueFrom(this.http.get('datas/site-schema.json')),
      firstValueFrom(this.http.get('datas/artisan-schema.json'))
    ])

      .then(([seoConfig, siteSchema, artisanSchema]) => {
        this.updateMetaTags(seoConfig);
        this.injectSchema(siteSchema, "site-schema");
        this.injectSchema(artisanSchema, "artisan-schema");
      })
      .catch(error => console.error("Erreur de chargement des données SEO :", error));
  }

  private updateMetaTags(seoConfig: any) {
    this.title.setTitle(seoConfig.title);
    this.meta.updateTag({ name: 'description', content: seoConfig.description });
    this.meta.updateTag({ name: 'keywords', content: seoConfig.keywords.join(", ") });
    this.meta.updateTag({ name: 'author', content: seoConfig.author });
    this.meta.updateTag({ name: 'robots', content: seoConfig.robots });
    this.meta.updateTag({ property: 'og:title', content: seoConfig.siteName });
    this.meta.updateTag({ property: 'og:description', content: seoConfig.description });
    this.meta.updateTag({ property: 'og:image', content: seoConfig.image });
    this.meta.updateTag({ property: 'og:url', content: seoConfig.siteUrl });
  }

  private injectSchema(data: any, id: string) {
    if (data) {
      let scriptElement = document.createElement("script");
      scriptElement.type = "application/ld+json";
      scriptElement.id = id;
      scriptElement.textContent = JSON.stringify(data);
      document.head.appendChild(scriptElement);
      console.log(`Schema.org injecté depuis ${id}`, scriptElement);
    } else {
      console.warn(`Données vides pour ${id}`);
    }
  }
}

