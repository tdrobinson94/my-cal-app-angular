import { Component, OnInit, AfterViewInit } from '@angular/core';
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
export class TestCalendarComponent implements OnInit, AfterViewInit {

  boxes = [];
  clock = new Date();
  currentMonth = this.clock.getMonth();
  currentYear = this.clock.getFullYear();
  day = this.clock.getDate();
  months: any = [];
  monthDays = [];
  years: any = [];
  daysofWeek = [
    { num: 0, name: 'Sun'},
    { num: 1, name: 'Mon'},
    { num: 2, name: 'Tue'},
    { num: 3, name: 'Wed'},
    { num: 4, name: 'Thu'},
    { num: 5, name: 'Friday'},
    { num: 6, name: 'Sat'}
  ];
  currentSelectorDays: any;
  initialCalStartDay: any;
  clickedDay: any;
  currentMonthDays: any;
  january: any = [];
  february: any = [];
  march: any = [];
  april: any = [];
  june: any = [];
  july: any = [];
  august: any = [];
  september: any = [];
  october: any = [];
  november: any = [];
  december: any = [];

  constructor(private dataService: EventDataService, private cookieService: CookieService) { }

  ngOnInit(): void {
    // // this.getEvents();
    let i;
    let x;
    let num = [];
    let allMonths = [];
    let allMonthDays = [];
    let allYears = [];

    // Build out options for Month selector and select current Month
    for (i = 0; i < MONTHS.length; i++) {
      let imonth = MONTHS[i];
      let monthDays = MONTHS[i].days;

      // Number of days in each month
      allMonthDays.push(monthDays);
      this.monthDays = allMonthDays[i];

      // Number of months in year
      allMonths.push(imonth);
      this.months = allMonths;
      console.log(this.months[i].num)
      console.log(this.months[i].days)
    }

    // Build out options for Year selector and select current Year
    for (i = 0; i < 11; i++) {
      let iyear = (this.currentYear - 5) + i;
      allYears.push(iyear);
      this.years = allYears;
    }
    
    // Build out each calendar box
    for (i = 0; i < 42; i++) {
      num.push(i);
      this.boxes = num;
    }
    console.log(this.boxes);

    this.initialCalStartDay = new Date(this.currentYear, $('#month').val(), 1).getDay();
    console.log(this.initialCalStartDay);
  }

  ngAfterViewInit(): void {
    
  }

  // On month select change
  onSelectMonthChange(value) {
    let selectedYear = $('#year').val();
    // Sets leap year based on month selector change
    if (value == 1) {
      if (Number($('#year').val()) % 4 != 0) {
        this.months[1].days = 28;
      } else {
        this.months[1].days = 29;
      }
    }
    this.currentSelectorDays = this.months[value].days;
    console.log(this.currentSelectorDays + ' days');
    console.log(this.months[value].fullName);
    // console.log(new Date($(document).find('#year').val(), this.months[value].num, 1).getDay());
  }

  // On year select change
  onSelectYearChange(value) {
    let selectedMonth = $('#month').val();
    // Sets leap year based on year selector change
    if (selectedMonth == 1) {
      if (Number($('#year').val()) % 4 != 0) {
        this.months[selectedMonth].days = 28;
      } else {
        this.months[selectedMonth].days = 29;
      }
    }
    this.currentSelectorDays = this.months[selectedMonth].days;
    console.log(this.currentSelectorDays + ' days');
    console.log(this.months[selectedMonth].fullName);
  }

  // Click the previous month calendar button
  prevButtonClick() {
    let selectedMonth = parseInt($('#month').val(), 10);

    // Check to see if calendar is at the beginning, can't go backward anymore
    if (parseInt($('#year').val(), 10) === (this.currentYear - 5) && selectedMonth == 0) {
      this.onSelectMonthChange(selectedMonth);
    } else {
      // If calendar can go backward reset year everytime the cycle completes
      if (parseInt($('#year').val(), 10) != (this.currentYear - 5)  && selectedMonth == 0) {
        $('#year').val(parseInt($('#year').val(), 10) - 1);
        this.onSelectMonthChange(11);
        $('#month').val(parseInt($('#month').val(), 10) + 11);
      }
      // If cycle isn't complete
      else {
        this.onSelectMonthChange(selectedMonth - 1);
        $('#month').val(selectedMonth - 1);
      }
      
    }
  }

  // Click the current day calendar button
  curButtonClick() {
    this.onSelectMonthChange(this.currentMonth);
    $('#month').val(this.currentMonth);
  }

  // Click the next month calendar button
  nextButtonClick() {
    let selectedMonth = parseInt($('#month').val(), 10);

    // Check to see if calendar is at the end, can't go forward anymore
    if (parseInt($('#year').val(), 10) === (this.currentYear + 5) && selectedMonth == 11) {
      this.onSelectMonthChange(selectedMonth);
    } else {
      // If calendar can go forward reset year everytime the cycle completes
      if (parseInt($('#year').val(), 10) != (this.currentYear + 5) && selectedMonth == 11) {
        $('#year').val(parseInt($('#year').val(), 10) + 1);
        this.onSelectMonthChange(0);
        $('#month').val(0);
      }
      // If cycle isn't complete
      else {
        this.onSelectMonthChange(selectedMonth + 1);
        $('#month').val(selectedMonth + 1);
      }
    }
  }

  dayClick(e) {
    if($(e.target).hasClass('close-big-day')) {
      $('.test-box').removeClass('big-day');
    } else if (!$(e.currentTarget).hasClass('clicked-day') && !$(e.currentTarget).hasClass('big-day')) {
      $('.test-box').removeClass('clicked-day big-day');
      console.log(e.currentTarget);

      $(e.currentTarget).addClass('clicked-day');

      $('html, body').animate({ scrollTop: $(e.currentTarget).position().top - 75 }, 500);
    } else if ($(e.currentTarget).hasClass('clicked-day')) {
      $(e.currentTarget).addClass('big-day');
    }
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
