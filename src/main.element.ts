import { AppComponent } from './app/app.component';
import { createCustomElement } from '@angular/elements';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import 'zone.js';

platformBrowserDynamic().bootstrapModule(AppModule)
  .then(({injector}) => {
    if (!customElements.get('hello-wc')) {
      const element = createCustomElement(AppComponent, {injector})
      customElements.define('hello-wc', element)
    }
  })
  .catch((err) => {
    console.error("Error bootstrapping hello-wc")
    console.error(err)
  });
