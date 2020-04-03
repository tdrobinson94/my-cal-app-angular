import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
})

export class UserDataService {
    apiUrl = 'https://react-calendar-backend-api.herokuapp.com';
    private islogged;

    constructor(private http: HttpClient, private cookieService: CookieService) { this.islogged = false; }

    signupuser(userData): Observable<any> {
        return this.http.post(this.apiUrl + '/signup', userData, { observe: 'response' });
    }

    loginuser(userData): Observable<any> {
        return this.http.post(this.apiUrl + '/login', userData, {observe: 'response'}); /*.pipe(map((response: any) => {
            this.isLogged.next(response);
            return response;
        }));*/
    }

    isLoggedIn() {
        let cookieValue = this.cookieService.get('userId');
        return this.http.get(this.apiUrl + '/user/' + cookieValue);

    }

    deleteUser() {
        let cookieValue = this.cookieService.get('userId');
        return this.http.delete(this.apiUrl + '/deleteuser/' + cookieValue);
    }

}