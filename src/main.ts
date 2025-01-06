import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { MSAL_INSTANCE, MsalService } from '@azure/msal-angular';
import { msalConfig } from './app/msal.config';
import { PublicClientApplication } from '@azure/msal-browser';
import { authInterceptor } from './app/auth.interceptor';


function MSALInstanceFactory() {
  const instance = new PublicClientApplication(msalConfig);
  instance.initialize();
  return instance;
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
    },
    MsalService,
  ]
}).catch(err => console.error(err));


