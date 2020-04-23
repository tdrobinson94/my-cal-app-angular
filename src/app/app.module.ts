// import { MbscModule } from '@mobiscroll/angular';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { SwipeModule } from 'ng-swipe';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { CalendarComponent } from './calendar/calendar.component';
import { SettingsComponent } from './settings/settings.component';
import { UserDataService } from './services/userdata.service';
import { AuthGuard } from './auth.guard';
import { GuestGuard } from './guest.guard';
import { ProfileComponent } from './profile/profile.component';
import { EventDataService } from './services/eventdata.service';
import { TestCalendarComponent } from './test-calendar/test-calendar.component';
import { TestDirectiveDirective } from './test-directive.directive';


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // MbscModule,
    ReactiveFormsModule,
    FormsModule,
    SwipeModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  declarations: [
    AppComponent,
    LayoutComponent,
    HomeComponent,
    SignupComponent,
    LoginComponent,
    CalendarComponent,
    SettingsComponent,
    ProfileComponent,
    TestCalendarComponent,
    TestDirectiveDirective
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }, UserDataService, CookieService, AuthGuard, GuestGuard,
  EventDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
