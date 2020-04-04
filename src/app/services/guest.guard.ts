import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserDataService } from './userdata.service';

@Injectable()

export class GuestGuard implements CanActivate {

    constructor(private dataService: UserDataService, private router: Router) { }

    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        if (!this.dataService.isLoggedIn()) {
            return false;
        }

        this.router.navigate(['/login']);

        return true;
    }
}