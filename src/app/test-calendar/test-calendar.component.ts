import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { EventDataService } from '../services/eventdata.service';
import { CookieService } from 'ngx-cookie-service';
import { MONTHS } from '../calendar/months.constant';
import $ from 'jquery';
import _ from 'lodash';

let clock = new Date();
let month = clock.getMonth();
let year = clock.getFullYear();
let day = clock.getDate();

@Component({
  selector: 'app-test-calendar',
  templateUrl: './test-calendar.component.html',
  styleUrls: ['./test-calendar.component.scss']
})
export class TestCalendarComponent implements OnInit {
  boxes = [];

  constructor(private dataService: EventDataService, private cookieService: CookieService) { }

  ngOnInit(): void {
    // this.getEvents();
    let i = 1;
    let num = [];

    $(document).find('#month').html(`
      <option value="0">${MONTHS[0].name}</option>
      <option value="1">${MONTHS[1].name}</option>
      <option value="2">${MONTHS[2].name}</option>
      <option value="3">${MONTHS[3].name}</option>
      <option value="4">${MONTHS[4].name}</option>
      <option value="5">${MONTHS[5].name}</option>
      <option value="6">${MONTHS[6].name}</option>
      <option value="7">${MONTHS[7].name}</option>
      <option value="8">${MONTHS[8].name}</option>
      <option value="9">${MONTHS[9].name}</option>
      <option value="10">${MONTHS[10].name}</option>
      <option value="11">${MONTHS[11].name}</option>
    `);

    $('#month').val(month);

    $(document).find('#year').html(`
      <option value="${year - 5}">${year - 5}</option>
      <option value="${year - 4}">${year - 4}</option>
      <option value="${year - 3}">${year - 3}</option>
      <option value="${year - 2}">${year - 2}</option>
      <option value="${year - 1}">${year - 1}</option>
      <option value="${year}">${year}</option>
      <option value="${year + 1}">${year + 1}</option>
      <option value="${year + 2}">${year + 2}</option>
      <option value="${year + 3}">${year + 3}</option>
      <option value="${year + 4}">${year + 4}</option>
      <option value="${year + 5}">${year + 5}</option>
    `);

    $('#year').val(year);

    _.range(1, 43).forEach((dayIndex, i) => {
      num.push(dayIndex);
      this.boxes = num;
    });
  }



  // getEvents() {
  //   this.dataService.getEvents()
  //     .subscribe((response) => {
  //       this.events = response;
  //       console.log(this.events);
  //     });
  // }

  // deleteEvent() {
  //   let event_id = $('.entypo-minus').val();
  //   this.dataService.deleteEvent(event_id)
  //     .subscribe((response) => {
  //       console.log(response);
  //       this.getEvents();
  //       // return response.id !== event_id;
  //     });
  // }

}
