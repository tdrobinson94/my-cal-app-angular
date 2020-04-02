import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { CalendarComponent } from './calendar/calendar.component';
import { SettingsComponent } from './settings/settings.component';
import { UserDataService } from './services/userdata.service';
// import { GuestGuard } from './services/guest.guard';
// import { LoggedInGuard } from './services/logged-in.guard';
// import { AppService } from './app.service';

// export function app_init(appService: AppService) {
//   return () => appService.initializeApp();
// }

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  declarations: [
    AppComponent,
    LayoutComponent,
    HomeComponent,
    SignupComponent,
    LoginComponent,
    CalendarComponent,
    SettingsComponent
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }, UserDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
