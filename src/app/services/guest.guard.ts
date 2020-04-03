import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserDataService } from './userdata.service';

@Injectable()

export class GuestGuard implements CanActivate {

    constructor(private dataService: UserDataService, private router: Router) { }

    canActivate() {
        if (this.dataService.isLoggedIn()) {
            this.router.navigate(['/calendar']);
            return false;
        }

        return true;
    }
}