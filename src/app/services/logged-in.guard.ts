import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserDataService } from './userdata.service';

@Injectable()

export class LoggedInGuard implements CanActivate {

    constructor(private dataService: UserDataService, private router: Router) { }

    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        if (this.dataService.isLoggedIn()) {
            return true;

        }

        this.router.navigate(['/login']);

        return false;
    }
}