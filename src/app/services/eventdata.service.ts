import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, config } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class EventDataService {
    apiUrl = 'https://react-calendar-backend-api.herokuapp.com';
    user;
    constructor(private http: HttpClient) { }

    getToken() {
        const token = localStorage.getItem('token');
        const config = {
            headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
        };

        return config;
    }

    createEvent(eventData): Observable<any> {
        return this.http.post(this.apiUrl + '/event', eventData, this.getToken());
    }

    createMultipleEvent(eventData): Observable<any> {
        return this.http.post(this.apiUrl + '/events', eventData, this.getToken());
    }

    getEvents(): Observable<any> {
        const param = { user_id: localStorage.getItem('userId') };
        return this.http.get(this.apiUrl + '/user/events', { params: param });
    }

    updatedEvent(eventData) {
        const param = { id: eventData.id };
        return this.http.post(this.apiUrl + '/update/event/' + eventData.id,  eventData);
    }

    deleteEvent(eventId): Observable<any> {
        const param = { id: eventId.id }; 
        return this.http.delete(this.apiUrl + '/delete/event/' + eventId.id, { params: param });
    }

}