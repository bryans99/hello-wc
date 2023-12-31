import { AppComponent } from './app/app.component';
import { createCustomElement } from '@angular/elements';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
  .then(({injector}) => {
    const element = createCustomElement(AppComponent, {injector})
    customElements.define('hello-wc', element)
  })
  .catch((err) => {
    console.error("Error bootstrapping hello-wc")
    console.error(err)
  });
