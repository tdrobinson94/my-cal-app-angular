import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class UserDataService {
    apiUrl = 'https://react-calendar-backend-api.herokuapp.com';
    // isLogged: BehaviorSubject<boolean>;

    constructor(private http: HttpClient) { }

    signupuser(userData): Observable<any> {
        return this.http.post(this.apiUrl + '/signup', userData, { observe: 'response' });
    }

    loginuser(userData): Observable<any> {
        return this.http.post(this.apiUrl + '/login', userData, {observe: 'response'});
        // .pipe(map((response: any) => {
        //     this.isLogged.next(response);
        //     return response;
        // }));
    }

    // isLoggedIn(): Observable<any> {
    //     let params1 = new HttpParams().set('userID', '341')
    //     return this.http.get(this.apiUrl + '/user', {params:params1}).pipe(map(
    //         (response: any) => {
    //             this.isLogged.next(response);
    //             return response;
    //         }
    //     ))
    // }

}