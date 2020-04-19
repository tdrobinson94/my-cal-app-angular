import { Component, OnInit, ViewEncapsulation, Renderer2, ElementRef, ViewChild, AfterViewInit, AfterContentInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { EventDataService } from '../services/eventdata.service';
import { CookieService } from 'ngx-cookie-service';
import { MONTHS } from './months.constant';
import $ from 'jquery';
import _ from 'lodash';
import * as moment from 'moment';

let clock = new Date();
let month = clock.getMonth();
let year = clock.getFullYear();
let day = clock.getDate();

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class CalendarComponent implements OnInit, AfterViewInit, AfterContentInit {

  @ViewChild('calendar', {read: ElementRef}) calendar: ElementRef;

  addItemForm = new FormGroup({
    item_type: new FormControl(),
    frequency: new FormControl(''),
    title: new FormControl(''),
    description: new FormControl(''),
    start_date: new FormControl(),
    end_date: new FormControl(),
    start_time: new FormControl(),
    end_time: new FormControl(),
    location: new FormControl(''),
  });
  eventID: string = '';
  events: any = [];

  button: any;

  eventid = '';
  eventtitle = '';
  eventdesc = '';
  eventstart_date = '';
  eventstart_time = '';
  eventend_time = '';
  eventlocation = '';
  dayDay: any;
  eachEvent: any;
  checkEachDayDate: any;
  boxDay: any;
  getEachMonthDays: any;


  constructor(private dataService: EventDataService, private cookieService: CookieService, private renderer: Renderer2,
  private el: ElementRef) { }

  ngOnInit(): void {

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
    this.changeCal();
    this.getMonthDays();
  }

  ngAfterViewInit(): void {
  }

  ngAfterContentInit(): void {

  }

  renderMonth() {
    MONTHS[1].days = Number($('#year').val()) % 4 == 0 ? 29 : 28;
    let currentMonth = $(document).find('#month').val();
    let nextMonth = Number($(document).find('#month').val()) + 2;
    let currentYear = $(document).find('#year').val();
    let startOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    let monthDays = MONTHS[$(document).find('#month').val()].days;
    let days = $(document).find('.days').children();
    $(document).find('.num').empty();
    // $(document).find('.main-info').empty();

    _.range(1, 43).forEach(function (dayIndex, i) {
      let day = $(days[startOfMonth + dayIndex - 1]);

      if (clock.getDate() === dayIndex && clock.getMonth() == $('#month').val() && clock.getFullYear() == $('#year').val()) {
        day.find('.weekday').children().addClass('current-day');
        day.find('.weekday').parent().addClass('clicked-day day_background_color selected-day');
        day.find('.num-date').parent().parent().removeClass("dead_month_color");
      } else {
        day.find('.weekday').children().removeClass('current-day');
        day.find('.num-date').parent().parent().removeClass("dead_month_color day_background_color");
      }
      if (dayIndex > monthDays) {
        day.find('.num').html(dayIndex - monthDays).parent().parent().addClass("dead_month_color");
        if (nextMonth == 13) {
          nextMonth = 1;
          currentYear = Number(currentYear) + 1;
        }
        if (nextMonth < 10) {
          let newMonth = nextMonth;
          let standardMonth = '0' + nextMonth;
          if ((dayIndex - monthDays) < 10) {
            let newDayIndex = (dayIndex - monthDays);
            let standardDayIndex = '0' + (dayIndex - monthDays);
            day.find('.date-value').html(currentYear + '-' + standardMonth + '-' + standardDayIndex);
            day.find('.num-box').attr('value', '"' + currentYear + '-' + standardMonth + '-' + standardDayIndex + '"')
            day.find('.num-date').html(newDayIndex).parent().parent().addClass("dead_month_color");
          } else {
            day.find('.date-value').html(currentYear + '-' + standardMonth + '-' + (dayIndex - monthDays));
            day.find('.num-box').attr('value', '"' + currentYear + '-' + standardMonth + '-' + (dayIndex - monthDays) + '"');
            day.find('.num-date').html((dayIndex - monthDays)).parent().parent().addClass("dead_month_color");
          }
        } else {
          let standardMonth = '0' + nextMonth;
          if ((dayIndex - monthDays) < 10) {
            let newDayIndex = (dayIndex - monthDays);
            let standardDayIndex = '0' + (dayIndex - monthDays);
            day.find('.date-value').html(currentYear + '-' + standardMonth + '-' + standardDayIndex);
            day.find('.num-box').attr('value', '"' + currentYear + '-' + standardMonth + '-' + standardDayIndex + '"');
            day.find('.num-date').html(newDayIndex).parent().parent().addClass("dead_month_color");
          } else {
            day.find('.date-value').html(currentYear + '-' + standardMonth + '-' + (dayIndex - monthDays));
            day.find('.num-box').attr('value', '"' + currentYear + '-' + standardMonth + '-' + (dayIndex - monthDays) + '"');
            day.find('.num-date').html((dayIndex - monthDays)).parent().parent().addClass("dead_month_color");
          }
        }
      } else {
        day.find('.num').html(dayIndex);
        let thisMonth = (Number(currentMonth) + 1);
        if (thisMonth < 10) {
          let newMonth = thisMonth;
          let standardNewMonth = '0' + thisMonth;
          if (dayIndex < 10) {
            let newDays = dayIndex;
            let standardNewDays = '0' + dayIndex;
            day.find('.date-value').html(currentYear + '-' + standardNewMonth + '-' + standardNewDays);
            day.find('.num-box').attr('value', '"' + currentYear + '-' + standardNewMonth + '-' + standardNewDays + '"');
            day.find('.num-date').html("&nbsp" + newDays + "&nbsp");
          } else {
            day.find('.date-value').html(currentYear + '-' + standardNewMonth + '-' + (dayIndex));
            day.find('.num-box').attr('value', '"' + currentYear + '-' + standardNewMonth + '-' + (dayIndex) + '"');
            day.find('.num-date').html((dayIndex));
          }
        } else {
          if (dayIndex < 10) {
            let newDays = dayIndex;
            let standardNewDays = '0' + dayIndex;
            day.find('.date-value').html(currentYear + '-' + thisMonth + '-' + standardNewDays);
            day.find('.num-box').attr('value', '"' + currentYear + '-' + thisMonth + '-' + standardNewDays + '"');
            day.find('.num-date').html("&nbsp" + newDays + "&nbsp");
          } else {
            day.find('.date-value').html(currentYear + '-' + thisMonth + '-' + (dayIndex));
            day.find('.num-box').attr('value', '"' + currentYear + '-' + thisMonth + '-' + (dayIndex) + '"');
            day.find('.num-date').html((dayIndex));
          }
        }
      }
      if (day.find('.num-date').html() === '&nbsp;' + '1' + '&nbsp;') {
        day.find('.num-date').addClass('first-day');
      } else {
        day.find('.num-date').removeClass('first-day');
      }
    });

  }

  renderPrevMonthDays() {
    MONTHS[1].days = Number($(document).find('#year').val()) % 4 == 0 ? 29 : 28
    let currentYear = $(document).find('#year').val();
    let prevMonth = Number($(document).find('#month').val());
    let startOfMonth = new Date($(document).find('#year').val(), $(document).find('#month').val(), 1).getDay();
    let monthDays = MONTHS[$(document).find('#month').val()].days;
    let prevMonthDays = $(document).find('#month').val() == 0 ? 31 : MONTHS[$(document).find('#month').val() - 1].days;
    let days = $(document).find('.days').children();
    let prevDays = _.range(1, prevMonthDays + 1).slice(-startOfMonth);
    _.range(0, startOfMonth).forEach(function (dayIndex) {
      let day = $(days[dayIndex]);
      if (startOfMonth > dayIndex) {
        day.find('.num').html(prevDays[dayIndex]);
        if (prevMonth == 0) {
          prevMonth = 12;
          currentYear = Number(currentYear) - 1;
        }
        if (prevMonth < 10) {
          let newMonth = prevMonth;
          let standardNewMonth = '0' + prevMonth;
          day.find('.date-value').html(currentYear + '-' + standardNewMonth + '-' + (prevDays[dayIndex]));
          day.find('.num-box').attr('value', '"' + currentYear + '-' + standardNewMonth + '-' + (prevDays[dayIndex]) + '"');
          day.find('.num-date').html((prevDays[dayIndex]));
        } else {
          day.find('.date-value').html(currentYear + '-' + prevMonth + '-' + (prevDays[dayIndex]));
          day.find('.num-box').attr('value', '"' + currentYear + '-' + prevMonth + '-' + (prevDays[dayIndex]) + '"');
          day.find('.num-date').html((prevDays[dayIndex]));
        }

        day.find('.num-date').parent().parent().addClass("dead_month_color");
        day.find('.weekday').parent().removeClass("day_background_color");
      }
    })
  }

  selectedDay() {
    if ($('.num-box').hasClass('day_background_color') === true) {
      $(document).find('#todays-day').html($('.current-day').html());
    } else if ($('.num-date').hasClass('first-day') === true) {
      $('.first-day').parent().parent().addClass('selected-day clicked-day');
      $('.dead_month_color').removeClass('clicked-day');
    }
  }

  changeCal() {
    console.log('changing cal');
    $('.add-item-form').removeClass('show-form');
    $('.num-box').removeClass('clicked-day');
    $('.num-date').removeClass('first-day current-day');
    $('.num-box').removeClass('selected-day');

    this.renderMonth();
    this.renderPrevMonthDays();
    this.selectedDay();
    this.getEvents();

    $('html, body').animate({ scrollTop: $('.selected-day').position().top - 75}, 500);
  }

  getMonthDays() {
    let getmonthDays = [];
    let startofmonth = new Date($('#year').val(), $('#month').val()).getDay();
    let days = $(document).find('.days').children();
    _.range(1, 43).forEach((dayIndex, i) => {
      let day = $(days[dayIndex - 1]);
      day.find('.date-value').html();
      getmonthDays.push(day.find('.date-value').html())
    });
    this.getEachMonthDays = getmonthDays;
    console.log(getmonthDays);
  }


  prevClick() {
    $('.add-item-form').removeClass('show-form');
    $('.num-box').removeClass('selected-day double-click');
    $('.num-date').removeClass('first-day');
    $('.transaction-button').removeClass('show');
    if ($(document).find('#year').val() <= (year - 5)) {
      $(document).find('#year').val(year - 5).change();
      $(document).find('#month').val(0).change();
    } else {
      if ($('#month').val() == null || $('#month').val() == 0) {
        $(document).find('#month').val(11).change();
        $(document).find('#year').val(Number($(document).find('#year').val()) - 1).change();
      } else {
        $(document).find('#month').val(Number($(document).find('#month').val()) - 1).change();
      }
    }
    this.changeCal();
    this.getMonthDays();
  }

  currentClick() {
    $('.add-item-form').removeClass('show-form');
    $('.num-box').removeClass('selected-day double-click');
    $('.num-date').removeClass('first-day');
    $('.transaction-button').removeClass('show');
    $(document).find('#month').val(month).change();
    $(document).find('#year').val(year).change();
    this.changeCal();
    this.getMonthDays();
  }

  nextClick() {
    $('.add-item-form').removeClass('show-form');
    $('.num-box').removeClass('selected-day double-click');
    $('.num-date').removeClass('first-day');
    $('.transaction-button').removeClass('show');
    if ($(document).find('#year').val() >= (year + 5) && $(document).find('#month').val() == 11) {
      $(document).find('#year').val(year + 5).change();
      $(document).find('#month').val(11).change();
    } else {
      if ($(document).find('#month').val() == null || $(document).find('#month').val() == 11) {
        $(document).find('#month').val(0).change();
        $(document).find('#year').val(Number($(document).find('#year').val()) + 1).change();
      } else {
        $(document).find('#month').val(Number($(document).find('#month').val()) + 1).change();
      }
    }
    this.changeCal();
    this.getMonthDays();
  }

  clickonDay(e) {
    $('.add-item-form').removeClass('show-form');
    $('.extra').hide();
    if ($(e.target).hasClass('entypo-minus')) {
      console.log('deleting')
      let event_id = $(e.target).val();
      this.dataService.deleteEvent(event_id)
        .subscribe((response) => {
          console.log(response);
          // this.getEvents();
          // return response.id !== event_id;
        });
    } else if ($(e.target).hasClass('close-day')) {
      $('.num-box').removeClass('double-click');
    } else if (!$(e.currentTarget).hasClass('clicked-day') && !$(e.currentTarget).hasClass('double-click')) {
      $('.num-box').removeClass('clicked-day double-click');
      $(e.currentTarget).addClass('clicked-day');
    } else if ($(e.currentTarget).hasClass('clicked-day')) {
      $(e.currentTarget).addClass('double-click');
    }
    $('html, body').animate({ scrollTop: $('.clicked-day').position().top - 75 }, 500);
  }

  openForm() {
    let clock = new Date();
    let day = $('.clicked-day .date-value').text();
    let minutes = String(clock.getMinutes()).padStart(2, '0');
    let hours = String(clock.getHours()).padStart(2, '0');
    let extraHour = String(clock.getHours() + 1).padStart(2, '0');
    let currentTime = hours + ':' + minutes;
    let endTime = (extraHour) + ':' + minutes;
    $('.select-item label').removeClass('selected');
    $('.checkbox label').removeClass('selected');
    $('.date-input input').val(day);
    $('.item-type select').val(1);
    $('.frequency select').val(0);
    console.log($('.date-input input').val());
    // this.renderer.removeClass(this.calendar.nativeElement, 'show-form');
    $('.date-input-end input').val(day);
    $('.time-input input').val(currentTime);
    $('.time-input-end input').val(endTime);
    $('.add-item-form').addClass('show-form');
    $('.event-description, .description-label, .location-input, .location-label, .time-input, .time-label, .date-input-end').addClass('show-input');
    $('.time-input-end').addClass('show-input');

    if ($(window).width() <= 800) {

    } else {
      $('.clicked-day').removeClass('double-click');
    }

    $('.select-item label.item_1').addClass('selected');
    $('.checkbox label.frequency_1').addClass('selected');
  }

  closeForm() {
    $('.add-item-form').removeClass('show-form');
    $('body, html').animate({ scrollTop: $('.clicked-day').position().top - 75}, 500);
  }

  selectItemEvent(e) {
    $('.checkbox').not(e.currentTarget).prop('checked', false);
    $('.select-item label').removeClass('selected');

    if ($(e.currentTarget).hasClass('item_1')) {
      console.log("Event")
      $(e.currentTarget).addClass('selected');
      $('.event-description, .description-label, .location-input, .location-label, .time-input, .time-label, .date-input-end').addClass('show-input');
      $('.time-input-end').addClass('show-input');
      $('.amount-input, .amount-label').removeClass('show-input');
    } else if ($(e.currentTarget).hasClass('item_2')) {
      console.log("Reminder")
      $(e.currentTarget).addClass('selected');
      $('.time-input, .time-label, .location-input, .location-label, .date-input-end').addClass('show-input');
      $('.event-description, .description-label').removeClass('show-input');
      $('.amount-input, .amount-label, .time-input-end').removeClass('show-input');
    } else if ($(e.currentTarget).hasClass('item_3')) {
      console.log("Task")
      $(e.currentTarget).addClass('selected');
      $('.event-description, .description-label, .time-input, .time-label').addClass('show-input');
      $('.time-input-end').addClass('show-input');
      $('.amount-input, .amount-label, .location-input, .location-label, .date-input-end').removeClass('show-input');
    } else if ($(e.currentTarget).hasClass('item_4')) {
      console.log("Budget")
      $(e.currentTarget).addClass('selected');
      $('.event-description, .description-label, .location-input, .location-label, .time-input, .time-label').removeClass('show-input');
      $('.time-input-end').removeClass('show-input');
      $('.amount-input, .amount-label, .date-input-end').addClass('show-input');
    } else if ($(e.currentTarget).hasClass('item_5')) {
      console.log("Food")
      $(e.currentTarget).addClass('selected');
      $('.event-description, .description-label, .location-input, .location-label, .time-input, .time-label, .date-input-end').removeClass('show-input');
      $('.time-input-end').removeClass('show-input');
      $('.amount-input, .amount-label').addClass('show-input');
    }
  }

  selectItemFreq(e) {
    let day = $('.clicked-day .date-value').text();
    let infinite = '';

    $('.frequency').not(e.currentTarget).prop('checked', false);
    $('.checkbox label').removeClass('selected');
    

    if ($(e.currentTarget).hasClass('frequency_1')) {
      console.log("Item 1");
      $('.date-input-end input').val(day);
      $(e.currentTarget).addClass('selected')
    } else if ($(e.currentTarget).hasClass('frequency_2')) {
      console.log("Item 2");
      $('.date-input-end input').val(infinite);
      $(e.currentTarget).addClass('selected')
    } else if ($(e.currentTarget).hasClass('frequency_3')) {
      console.log("Item 3");
      $('.date-input-end input').val(infinite);
      $(e.currentTarget).addClass('selected')
    } else if ($(e.currentTarget).hasClass('frequency_4')) {
      console.log("Item 4");
      $('.date-input-end input').val(infinite);
      $(e.currentTarget).addClass('selected')
    } else if ($(e.currentTarget).hasClass('frequency_5')) {
      console.log("Item 5");
      $('.date-input-end input').val(infinite);
      $(e.currentTarget).addClass('selected')
    } else if ($(e.currentTarget).hasClass('frequency_6')) {
      console.log("Item 6");
      $('.date-input-end input').val(infinite);
      $(e.currentTarget).addClass('selected')
    } else if ($(e.currentTarget).hasClass('frequency_7')) {
      console.log("Item 7");
      $('.date-input-end input').val(infinite);
      $(e.currentTarget).addClass('selected')
    }
  }


  submitEvent() {
    this.dataService.createEvent(this.addItemForm.value)
      .subscribe((response) => {
        console.log(this.addItemForm.value);
        // console.log(response);
        this.addItemForm.reset();
        $('.add-item-form').removeClass('show-form');
        $('body, html').animate({ scrollTop: $('.clicked-day').position().top - 75 }, 200);
      });

    setTimeout(() => {
      this.getEvents();
    }, 3000);
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

  getEvents() {
    this.dataService.getEvents()
      .subscribe((response) => {
        // this.events = response;
        let i;
        let dayIndex;
        let eventlist = [];
        MONTHS[1].days = Number($('#year').val()) % 4 == 0 ? 29 : 28;
        let currentMonth = $(document).find('#month').val();
        let nextMonth = Number($(document).find('#month').val()) + 2;
        let currentYear = $(document).find('#year').val();
        let startOfMonth = new Date(currentYear, currentMonth, 1).getDay();
        let monthDays = MONTHS[$(document).find('#month').val()].days;
        let days = $(document).find('.days').children();
        // $(document).find('.main-info').empty();

        for (dayIndex = 0; dayIndex <= 43; dayIndex++) {
          // console.log(dayIndex);
          let day = $(days[startOfMonth + dayIndex - 1]);

          this.checkEachDayDate = day.find('.main-info').next().html();
          // console.log(this.checkEachDayDate);

          for (i = 0; i < response.length; i++) {
            eventlist[i] = {
              eventid: response[i].id.toString(),
              eventtitle: response[i].title.toString(),
              eventstart_date: response[i].start_date.substring(0, 10).toString(),
              eventdesc: response[i].description.toString(),
              eventstart_time: moment(response[i].start_time, 'HH:mm:ss').format('h:mm A'),
              eventend_time: moment(response[i].end_time, 'HH:mm:ss').format('h:mm A')
            };

            if (day.find('.main-info').next().html() === eventlist[i].eventstart_date) {
              const p: HTMLParagraphElement = this.renderer.createElement('p');
              this.eachEvent = (eventlist[i].eventtitle + ' - ' + eventlist[i].eventdesc + ' from ' + eventlist[i].eventstart_time +
                ' until ' + eventlist[i].eventend_time);
              // console.log(this.eachEvent);

              p.innerHTML = this.eachEvent;

              // this.renderer.appendChild(this.calendar.nativeElement.querySelector('.main-info'), p);

              // this.renderer.appendChild(this.calendar.nativeElement.querySelector('.main-info'), p);

              // day.find('.main-info').append('<p class="event item">' + '<span class="eventid">' + eventlist[i].eventid + '</span>' +
              //   this.eachEvent + '<button value="' + eventlist[i].eventid + '" class="entypo-minus">' + '</button>' + '</p>');
            }
          }
          this.events = eventlist;
        }
      });
  }

}