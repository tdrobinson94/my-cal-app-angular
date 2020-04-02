import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { CalendarComponent } from './calendar/calendar.component';
import { SettingsComponent } from './settings/settings.component';
import { GuestGuard } from './services/guest.guard';
import { LoggedInGuard } from './services/logged-in.guard';

const domainName = 'my-cal-app-angular/';

const routes: Routes = [
  { path: 'signup', component: SignupComponent, /*canActivate: [GuestGuard]*/},
  { path: 'login', component: LoginComponent, /*canActivate: [GuestGuard]*/},
  { path: 'calendar', component: CalendarComponent, /*canActivate: [LoggedInGuard]*/},
  { path: 'settings', component: SettingsComponent, /*canActivate: [LoggedInGuard]*/},
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
