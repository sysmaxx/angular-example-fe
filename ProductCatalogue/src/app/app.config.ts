import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    TranslateService,
  provideHttpClient(withInterceptorsFromDi()),
  {
    provide: APP_INITIALIZER,
    useFactory: appInitializerFactory,
    deps: [TranslateService],
    multi: true
  },
  importProvidersFrom(TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: httpTranslateLoader,
      deps: [HttpClient]
    }
  }))
  ]
};

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/lang/', '.json')
}

export function appInitializerFactory(translate: TranslateService) {
  return () => {

    let language = localStorage.getItem('language');

    if (!language) {
      language = 'en';
      localStorage.setItem('language', language);
    }

    translate.setDefaultLang(language);
    return translate.use(language).toPromise();
  };
}