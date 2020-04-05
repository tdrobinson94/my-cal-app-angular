import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
})

export class UserDataService {
    apiUrl = 'https://react-calendar-backend-api.herokuapp.com';
    loggedInStatus = false;

    constructor(private http: HttpClient, private cookieService: CookieService) { }

    signupuser(userData): Observable<any> {
        return this.http.post(this.apiUrl + '/signup', userData, { observe: 'response' });
    }

    loginuser(userData): Observable<any> {
        this.loggedInStatus = true;
        return this.http.post(this.apiUrl + '/login', userData, {observe: 'response'}); /*.pipe(map((response: any) => {
            this.isLogged.next(response);
            return response;
        }));*/
    }

    logout() {
        this.loggedInStatus = false;
    }


    setLoggedIn(value: boolean) {
        this.loggedInStatus = value;
    }

    get hasLoggedIn() {
        return this.loggedInStatus;
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