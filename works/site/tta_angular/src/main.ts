import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

// Intégration de Bootstrap
import 'bootstrap/dist/js/bootstrap.esm.js';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';

platformBrowserDynamic().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true,
})
  .catch(err => console.error(err));
