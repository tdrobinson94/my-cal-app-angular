import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, config } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
})

export class EventDataService {
    apiUrl = 'https://react-calendar-backend-api.herokuapp.com';
    user;
    constructor(private http: HttpClient, private cookieService: CookieService) { }

    getToken() {
        let token = this.cookieService.get('token');
        const config = {
            headers: new HttpHeaders({ 'Authorization': 'Bearer ' + token })
        };

        return config;
    }

    createEvent(eventData): Observable<any> {
        return this.http.post(this.apiUrl + '/event', eventData, this.getToken());
    }

    getEvents(): Observable<any> {
        let param = { user_id: this.cookieService.get('userId') };
        return this.http.get(this.apiUrl + '/user/events', { params: param });
    }

    deleteEvent(event_id) {
        return this.http.delete(this.apiUrl + '/deleteevent/' + event_id);
    }

}