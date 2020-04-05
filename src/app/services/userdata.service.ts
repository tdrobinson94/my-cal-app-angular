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

    getToken() {
        let cookieValue = this.cookieService.get('userId');

        return cookieValue;
    }

    signupuser(userData): Observable<any> {
        return this.http.post(this.apiUrl + '/signup', userData, { observe: 'response' });
    }

    loginuser(userData): Observable<any> {
        this.loggedInStatus = true;
        return this.http.post(this.apiUrl + '/login', userData, {observe: 'response'});
    }

    loggedIn() {
        return this.cookieService.get('userId') ? true : false;
    }

    logout() {
        this.cookieService.delete('userId');
        this.cookieService.delete('username');
        this.cookieService.delete('firstname');
        this.cookieService.delete('lastname');
    }

    getUser() {
        return this.http.get(this.apiUrl + '/user/' + this.getToken());
    }

    updatedUser(userData) {
        return this.http.patch(this.apiUrl + '/user/' + this.getToken(), userData);
    }

    deleteUser() {
        return this.http.delete(this.apiUrl + '/deleteuser/' + this.getToken());
    }

}