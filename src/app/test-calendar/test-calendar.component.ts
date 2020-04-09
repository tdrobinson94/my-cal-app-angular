import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { EventDataService } from '../services/eventdata.service';
import { CookieService } from 'ngx-cookie-service';
import { MONTHS } from '../calendar/months.constant';
import $ from 'jquery';
import _ from 'lodash';

@Component({
  selector: 'app-test-calendar',
  templateUrl: './test-calendar.component.html',
  styleUrls: ['./test-calendar.component.scss']
})
export class TestCalendarComponent implements OnInit {
  events: any = [];

  constructor(private dataService: EventDataService, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents() {
    this.dataService.getEvents()
      .subscribe((response) => {
        this.events = response;
        console.log(this.events);
      });
  }

  deleteEvent() {
    let event_id = $('.entypo-minus').val();
    this.dataService.deleteEvent(event_id)
      .subscribe((response) => {
        console.log(response);
        this.getEvents();
        // return response.id !== event_id;
      });
  }

}
