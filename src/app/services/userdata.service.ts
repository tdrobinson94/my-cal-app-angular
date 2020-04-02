import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class UserDataService {
    apiUrl = 'https://react-calendar-backend-api.herokuapp.com';
    constructor(private http: HttpClient) { }

    signupuser(userData): Observable<any> {
        return this.http.post(this.apiUrl + '/signup', userData, { observe: 'response' });
    }

    loginuser(userData): Observable<any> {
        return this.http.post(this.apiUrl + '/login', userData, {observe: 'response'});
    }

}