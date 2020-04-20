import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { EventDataService } from '../services/eventdata.service';
import { CookieService } from 'ngx-cookie-service';
import { MONTHS } from '../calendar/months.constant';
import $ from 'jquery';
import _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'app-test-calendar',
  templateUrl: './test-calendar.component.html',
  styleUrls: ['./test-calendar.component.scss']
})
export class TestCalendarComponent implements OnInit, AfterViewInit {

  constructor(private dataService: EventDataService, private cookieService: CookieService) { }

  // Date variables
  clock = new Date();
  currentMonth = this.clock.getMonth();
  currentYear = this.clock.getFullYear();
  currentDay = this.clock.getDate();
  currentDayofWeek = this.clock.getDay();
  isCurrentWeekday = false;

  rows: any = [];
  weekDays: any = [];
  weekDayAbbrv: any = [
    { name: 'Sun', num: 0 }, { name: 'Mon', num: 1 }, { name: 'Tue', num: 2 },
    { name: 'Wed', num: 3 }, { name: 'Thu', num: 4 }, { name: 'Fri', num: 5},
    { name: 'Sat', num: 6}
  ];

  monthSelectorOptions: any = [];
  yearSelectorOptions: any = [];

  getEachMonthDays: any;

  events: any;
  eachEvent: any;

  ngOnInit(): void {
    console.log('Current date: ' + this.clock);
    console.log('Current day of week: ' + this.currentDayofWeek);
    console.log('Current month: ' + this.currentMonth);
    console.log('Current Day: ' + this.currentDay);
    console.log('Current Year: ' + this.currentYear);

    this.createCalendarGrid();
    if (navigator.userAgent.indexOf('Mac')) {
      $('.calendar-container').addClass('mac');
    }
  }

  createCalendarGrid() {
    let i;

    // Create rows
    const rowsInCalendar = 6;
    for (i = 0; i < rowsInCalendar; i++) {
      this.rows.push(i);
    }

    // Create each weekday box
    const daysInWeek = 7;
    for (i = 0; i < daysInWeek; i++) {
      this.weekDays.push(i);
    }

    // Create each weekday title
    for (i = 0; i < this.weekDayAbbrv.length; i++) {
      if (this.weekDayAbbrv[i].num === this.currentDayofWeek) {
        console.log('This is the weekday: ' + this.weekDayAbbrv[i].num);
      }
    }

    // Create the options for the month selector
    for (i = 0; i < MONTHS.length; i++) {
      const months = MONTHS[i];

      this.monthSelectorOptions.push(months);
    }

    // Create the options for the year selector
    for (i = 0; i <= 10; i++) {
      const yearStart = this.currentYear - 5;

      this.yearSelectorOptions.push(yearStart + i);
    }
  }


  ngAfterViewInit(): void {
    this.changeCal();
    this.getMonthDays();
  }

  renderMonth() {
    MONTHS[1].days = Number($('#year').val()) % 4 == 0 ? 29 : 28;
    const currentMonth = $(document).find('#month').val();
    let nextMonth = Number($(document).find('#month').val()) + 2;
    let currentYear = $(document).find('#year').val();
    const startOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const monthDays = MONTHS[$(document).find('#month').val()].days;
    const weeks = $(document).find('.weeks').children();
    // $(document).find('.main-info').empty();

    _.range(1, 43).forEach((dayIndex, i) => {
      const day = $(weeks[startOfMonth + dayIndex - 1]);

      if (this.clock.getDate() === dayIndex && this.clock.getMonth() == $('#month').val() && this.clock.getFullYear() == $('#year').val()) {
        day.find('.num-box').addClass('current-day');
        day.find('.num-box').parent().addClass('clicked-day day-background-color selected-day').removeClass('dead-month-color');
      } else {
        day.find('.day-box').children().removeClass('current-day');
        day.find('.num-date').parent().parent().removeClass('dead-month-color day-background-color');
      }
      if (dayIndex > monthDays) {
        if (nextMonth == 13) {
          nextMonth = 1;
          currentYear = Number(currentYear) + 1;
        }
        if (nextMonth < 10) {
          const newMonth = nextMonth;
          const standardMonth = '0' + nextMonth;
          if ((dayIndex - monthDays) < 10) {
            const newDayIndex = (dayIndex - monthDays);
            const standardDayIndex = '0' + (dayIndex - monthDays);
            day.find('.day-box').html(currentYear + '-' + standardMonth + '-' + standardDayIndex);
            day.find('.date-value').html(currentYear + '-' + standardMonth + '-' + standardDayIndex);
            day.find('.num-date').html(newDayIndex).parent().parent().addClass('dead-month-color');
          } else {
            day.find('.day-box').html(currentYear + '-' + standardMonth + '-' + (dayIndex - monthDays));
            day.find('.date-value').html(currentYear + '-' + standardMonth + '-' + (dayIndex - monthDays));
            day.find('.num-date').html((dayIndex - monthDays)).parent().parent().addClass('dead-month-color');
          }
        } else {
          const standardMonth = '0' + nextMonth;
          if ((dayIndex - monthDays) < 10) {
            const newDayIndex = (dayIndex - monthDays);
            const standardDayIndex = '0' + (dayIndex - monthDays);
            day.find('.day-box').html(currentYear + '-' + standardMonth + '-' + standardDayIndex);
            day.find('.date-value').html(currentYear + '-' + standardMonth + '-' + standardDayIndex);
            day.find('.num-date').html(newDayIndex).parent().parent().addClass('dead-month-color');
          } else {
            day.find('.day-box').html(currentYear + '-' + standardMonth + '-' + (dayIndex - monthDays));
            day.find('.date-value').html(currentYear + '-' + standardMonth + '-' + (dayIndex - monthDays));
            day.find('.num-date').html((dayIndex - monthDays)).parent().parent().addClass('dead-month-color');
          }
        }
      } else {
        const thisMonth = (Number(currentMonth) + 1);
        if (thisMonth < 10) {
          const newMonth = thisMonth;
          const standardNewMonth = '0' + thisMonth;
          if (dayIndex < 10) {
            const newDays = dayIndex;
            const standardNewDays = '0' + dayIndex;
            day.find('.day-box').html(currentYear + '-' + standardNewMonth + '-' + standardNewDays);
            day.find('.date-value').html(currentYear + '-' + standardNewMonth + '-' + standardNewDays);
            day.find('.num-date').html('&nbsp' + newDays + '&nbsp');
          } else {
            day.find('.day-box').html(currentYear + '-' + standardNewMonth + '-' + (dayIndex));
            day.find('.date-value').html(currentYear + '-' + standardNewMonth + '-' + (dayIndex));
            day.find('.num-date').html((dayIndex));
          }
        } else {
          if (dayIndex < 10) {
            const newDays = dayIndex;
            const standardNewDays = '0' + dayIndex;
            day.find('.day-box').html(currentYear + '-' + thisMonth + '-' + standardNewDays);
            day.find('.date-value').html(currentYear + '-' + thisMonth + '-' + standardNewDays);
            day.find('.num-date').html('&nbsp' + newDays + '&nbsp');
          } else {
            day.find('.day-box').html(currentYear + '-' + thisMonth + '-' + (dayIndex));
            day.find('.date-value').html(currentYear + '-' + thisMonth + '-' + (dayIndex));
            day.find('.num-date').html((dayIndex));
          }
        }
      }
      if (day.find('.num-date').html() === '&nbsp;' + '1' + '&nbsp;') {
        day.find('.num-date').parent().addClass('first-day');
      } else {
        day.find('.num-date').parent().removeClass('first-day');
      }
    });

  }

  renderPrevMonthDays() {
    MONTHS[1].days = Number($(document).find('#year').val()) % 4 == 0 ? 29 : 28
    let currentYear = $(document).find('#year').val();
    let prevMonth = Number($(document).find('#month').val());
    const startOfMonth = new Date($(document).find('#year').val(), $(document).find('#month').val(), 1).getDay();
    const monthDays = MONTHS[$(document).find('#month').val()].days;
    const prevMonthDays = $(document).find('#month').val() == 0 ? 31 : MONTHS[$(document).find('#month').val() - 1].days;
    const weeks = $(document).find('.weeks').children();
    const prevDays = _.range(1, prevMonthDays + 1).slice(-startOfMonth);
    _.range(0, startOfMonth).forEach((dayIndex) => {
      const day = $(weeks[dayIndex]);
      if (startOfMonth > dayIndex) {
        if (prevMonth == 0) {
          prevMonth = 12;
          currentYear = Number(currentYear) - 1;
        }
        if (prevMonth < 10) {
          const newMonth = prevMonth;
          const standardNewMonth = '0' + prevMonth;
          day.find('.day-box').html(currentYear + '-' + standardNewMonth + '-' + (prevDays[dayIndex]));
          day.find('.date-value').html(currentYear + '-' + standardNewMonth + '-' + (prevDays[dayIndex]));
          day.find('.num-date').html((prevDays[dayIndex]));
        } else {
          day.find('.day-box').html(currentYear + '-' + prevMonth + '-' + (prevDays[dayIndex]));
          day.find('.date-value').html(currentYear + '-' + prevMonth + '-' + (prevDays[dayIndex]));
          day.find('.num-date').html((prevDays[dayIndex]));
        }

        day.find('.num-date').parent().parent().addClass('dead-month-color');
        day.find('.num-box').parent().removeClass('day-background-color');
      }
    });
  }

  selectedDay() {
    if ($('.day-box').hasClass('day-background-color') === true) {
      $(document).find('#todays-day').html($('.current-day').html());
    } else if ($('.num-box').hasClass('first-day') === true) {
      $('.first-day').parent().addClass('selected-day clicked-day');
      $('.dead-month-color').removeClass('clicked-day');
    }
  }

  changeCal() {
    console.log('changing cal');
    $('.add-item-form').removeClass('show-form');
    $('.day-box').removeClass('clicked-day');
    $('.num-box').removeClass('first-day current-day');
    $('.day-box').removeClass('selected-day');

    this.renderMonth();
    this.renderPrevMonthDays();
    this.selectedDay();

    setTimeout(() => {
      this.getEvents();
    }, 600);

    $('html, body').animate({ scrollTop: $('.selected-day').position().top - 75 }, 400);
  }

  getMonthDays() {
    const getmonthDays = [];
    const startofmonth = new Date($('#year').val(), $('#month').val()).getDay();
    const weeks = $(document).find('.weeks').children();
    _.range(1, 43).forEach((dayIndex, i) => {
      const day = $(weeks[dayIndex - 1]);
      day.find('.date-value').html();
      getmonthDays.push(day.find('.date-value').html())
    });
    // this.getEachMonthDays = getmonthDays;
    // console.log(getmonthDays);
  }

  prevClick() {
    $('.add-item-form').removeClass('show-form');
    $('.day-box').removeClass('selected-day double-click');
    $('.num-box').removeClass('first-day');
    $('.transaction-button').removeClass('show');
    if ($(document).find('#year').val() <= (this.currentYear - 5)) {
      $(document).find('#year').val(this.currentYear - 5).change();
      $(document).find('#month').val(0).change();
    } else {
      if ($('#month').val() == null || $('#month').val() == 0) {
        $(document).find('#month').val(11).change();
        $(document).find('#year').val(Number($(document).find('#year').val()) - 1).change();
      } else {
        $(document).find('#month').val(Number($(document).find('#month').val()) - 1).change();
      }
    }
    setTimeout(() => {
      this.changeCal();
    }, 100);
    // this.getMonthDays();
  }

  currentClick() {
    $('.add-item-form').removeClass('show-form');
    $('.day-box').removeClass('selected-day double-click');
    $('.num-box').removeClass('first-day');
    $('.transaction-button').removeClass('show');
    $(document).find('#month').val(this.currentMonth).change();
    $(document).find('#year').val(this.currentYear).change();
    setTimeout(() => {
      this.changeCal();
    }, 100);
    // this.getMonthDays();
  }

  nextClick() {
    $('.add-item-form').removeClass('show-form');
    $('.day-box').removeClass('selected-day double-click');
    $('.num-box').removeClass('first-day');
    $('.transaction-button').removeClass('show');
    if ($(document).find('#year').val() >= (this.currentYear + 5) && $(document).find('#month').val() == 11) {
      $(document).find('#year').val(this.currentYear + 5).change();
      $(document).find('#month').val(11).change();
    } else {
      if ($(document).find('#month').val() == null || $(document).find('#month').val() == 11) {
        $(document).find('#month').val(0).change();
        $(document).find('#year').val(Number($(document).find('#year').val()) + 1).change();
      } else {
        $(document).find('#month').val(Number($(document).find('#month').val()) + 1).change();
      }
    }
    setTimeout(() => {
      this.changeCal();
    }, 100);
    // this.getMonthDays();
  }

  clickonDay(e) {
    $('.add-item-form').removeClass('show-form');
    $('.extra').hide();
    if ($(e.target).hasClass('close-day')) {
      $('.day-box').removeClass('double-click');
      $('.main-info-section').removeClass('animate-events-one animate-events-two');
    } else if (!$(e.currentTarget).hasClass('clicked-day') && !$(e.currentTarget).hasClass('double-click')) {
      $('.day-box').removeClass('clicked-day double-click');
      $(e.currentTarget).addClass('clicked-day');
      $('html, body').animate({ scrollTop: $('.clicked-day').position().top - 75 }, 700);
    } else if ($(e.currentTarget).hasClass('clicked-day')) {
      $(e.currentTarget).addClass('double-click');
      $(e.currentTarget).find('.main-info-section').addClass('animate-events-one');
      setTimeout(() => {
        $('.double-click .main-info-section').addClass('animate-events-two');
      }, 400);
    }
  }

  getEvents() {
    this.dataService.getEvents()
      .subscribe((response) => {
        // this.events = response;
        let i;
        let dayIndex;
        const eventlist = [];
        MONTHS[1].days = Number($('#year').val()) % 4 == 0 ? 29 : 28;
        const currentMonth = $(document).find('#month').val();
        const nextMonth = Number($(document).find('#month').val()) + 2;
        const currentYear = $(document).find('#year').val();
        const startOfMonth = new Date(currentYear, currentMonth, 1).getDay();
        const monthDays = MONTHS[$(document).find('#month').val()].days;
        const weeks = $(document).find('.weeks').children();

        for (dayIndex = 0; dayIndex <= 42; dayIndex++) {
          const day = $(weeks[dayIndex - 1]);

          for (i = 0; i < response.length; i++) {
            eventlist[i] = {
              eventid: response[i].id.toString(),
              eventtitle: response[i].title.toString(),
              eventstart_date: response[i].start_date.substring(0, 10).toString(),
              eventdesc: response[i].description.toString(),
              eventstart_time: moment(response[i].start_time, 'HH:mm:ss').format('h:mm A'),
              eventend_time: moment(response[i].end_time, 'HH:mm:ss').format('h:mm A')
            };
            console.log('Date: ' + day.find('.date-value').html());
            console.log('Event date: ' + eventlist[i].eventstart_date);
          }
          this.events = eventlist;

          // if (day.find('.date-value').html() === eventlist[i].eventstart_date) {
          //   day.find('.date-value').next().children().addClass('visible');
          //   $('.event').addClass('visible');
          // }
        }
      });
  }

}
