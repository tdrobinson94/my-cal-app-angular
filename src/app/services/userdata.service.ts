import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class UserDataService {
    apiUrl = 'https://react-calendar-backend-api.herokuapp.com';
    constructor(private http: HttpClient) { }

    signupuser(userData) {
        return this.http.post(this.apiUrl + '/signup', userData);
    }

    loginuser(userData) {
        return this.http.post(this.apiUrl + '/login', userData);
    }

}