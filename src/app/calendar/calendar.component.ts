import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { EventDataService } from '../services/eventdata.service';
import { MONTHS } from './months.constant';
import $ from 'jquery';
import _ from 'lodash';
import * as moment from 'moment';
import 'hammerjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(private dataService: EventDataService) { }

  // Date variables
  clock = new Date();
  currentMonth = this.clock.getMonth();
  currentYear = this.clock.getFullYear();
  currentDay = this.clock.getDate();
  currentDayofWeek = this.clock.getDay();
  isCurrentWeekday = false;

  // Calendar variables
  rows: any = [];
  weekDays: any = [];
  weekDayAbbrv: any = [
    { name: 'Sun', num: 0 }, { name: 'Mon', num: 1 }, { name: 'Tue', num: 2 },
    { name: 'Wed', num: 3 }, { name: 'Thu', num: 4 }, { name: 'Fri', num: 5 },
    { name: 'Sat', num: 6 }
  ];

  // Selector options variables
  monthSelectorOptions: any = [];
  yearSelectorOptions: any = [];

  getEachMonthDays: any;

  events: any;
  eachEvent: any;

  // Delete event form
  deleteItemForm = new FormGroup({
    id: new FormControl(''),
  });


  // Add event form
  addItemForm = new FormGroup({
    item_type: new FormControl(''),
    frequency: new FormControl(''),
    title: new FormControl(''),
    description: new FormControl(''),
    start_date: new FormControl(''),
    end_date: new FormControl(''),
    start_time: new FormControl(''),
    end_time: new FormControl(''),
    all_day: new FormControl(''),
    location: new FormControl(''),
  });

  // Update event form
  updateItemForm = new FormGroup({
    id: new FormControl(''),
    frequency: new FormControl(''),
    title: new FormControl(''),
    description: new FormControl(''),
    start_date: new FormControl(''),
    end_date: new FormControl(''),
    start_time: new FormControl(''),
    end_time: new FormControl(''),
    all_day: new FormControl(''),
    location: new FormControl(''),
  });

  // Hide loading indicator
  loading = false;

  ngOnInit() {
    this.createCalendarGrid();
  }

  // This will set our calendar table and the control bar
  createCalendarGrid() {
    let i;

    // Create 6 rows
    const rowsInCalendar = 6;
    for (i = 0; i < rowsInCalendar; i++) {
      this.rows.push(i);
    }

    // Create each weekday box or 7 columns
    const daysInWeek = 7;
    for (i = 0; i < daysInWeek; i++) {
      this.weekDays.push(i);
    }

    // Create each weekday title in the control bar
    for (i = 0; i < this.weekDayAbbrv.length; i++) {
      if (this.weekDayAbbrv[i].num === this.currentDayofWeek) {
        // console.log('This is the weekday: ' + this.weekDayAbbrv[i].num);
      }
    }

    // Create the options for the month selector in control bar
    for (i = 0; i < MONTHS.length; i++) {
      const months = MONTHS[i];

      this.monthSelectorOptions.push(months);
    }

    // Create the options for the year selector in control bar
    for (i = 0; i <= 10; i++) {
      const yearStart = this.currentYear - 5;

      this.yearSelectorOptions.push(yearStart + i);
    }

    // Detect the user device for specific UI compatability adjustments
    if (navigator.userAgent.indexOf('Mac') !== -1) {
      if (navigator.userAgent.indexOf('Chrome') !== -1) {
        $('.calendar-navbar').addClass('mac');
      }
    } else if (navigator.userAgent.indexOf('Win') !== -1) {
      // console.log('Windows');
    }

    if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i)) {
      $('.prev, .next').hide();
    } else {
      $('.prev, .next').show();
    }
  }

  ngAfterViewInit() {
    // Every 10 sec get update the date automatically and if day changes
    // update the calendar as well as the current day number and day of week
    setInterval(() => {
      this.clock = new Date();
      if (this.currentDay !== this.clock.getDate()) {
        // this.changeCal();
        this.currentDay = this.clock.getDate();
        this.currentDayofWeek = this.clock.getDay();
      }
    }, 10 * 1000);

    // On first load init calendar
    this.changeCal();
  }

  // Find the start day of the selected Month and Year and render each day number into the calendar table
  renderMonth() {
    // Use jquery to slightly manipulate DOM and render
    MONTHS[1].days = Number($('#year').val()) % 4 == 0 ? 29 : 28;
    const currentMonth = $(document).find('#month').val();
    let nextMonth = Number($(document).find('#month').val()) + 2;
    let currentYear = $(document).find('#year').val();
    const startOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const monthDays = MONTHS[$(document).find('#month').val()].days;
    const weeks = $(document).find('.weeks').children();
    _.range(1, 43).forEach((dayIndex, i) => {
      // Get the index of each box in the first row of the calendar table
      const day = $(weeks[startOfMonth + dayIndex - 1]);

      // if current month and year find the current day and style it
      if (this.clock.getDate() === dayIndex && this.clock.getMonth() ==
      $('#month').val() && this.clock.getFullYear() == $('#year').val()) {
        day.find('.num-box').addClass('current-day');
        day.find('.num-box').parent().addClass('clicked-day day-background-color selected-day').removeClass('dead-month-color');
      }
      // If not current month then find 1st day and style it
      else {
        day.find('.day-box').children().removeClass('current-day');
        day.find('.num-date').parent().parent().removeClass('dead-month-color day-background-color');
      }

      if (dayIndex > monthDays) {
        // If calendar hits Dec set next month to Jan of next year
        if (nextMonth === 13) {
          nextMonth = 1;
          currentYear = Number(currentYear) + 1;
        }

        // If calendar hits any month thats not december
        const standardMonth = '0' + nextMonth;
        const newDayIndex = (dayIndex - monthDays);
        const standardDayIndex = '0' + newDayIndex;
        if (nextMonth < 10) {

          if ((newDayIndex) < 10) {
            day.find('.date-value').html(currentYear + '-' + standardMonth + '-' + standardDayIndex);
            day.find('.num-date').html(newDayIndex).parent().parent().addClass('dead-month-color');
          } else {
            day.find('.date-value').html(currentYear + '-' + standardMonth + '-' + newDayIndex);
            day.find('.num-date').html(newDayIndex).parent().parent().addClass('dead-month-color');
          }
        } else {
          if ((dayIndex - monthDays) < 10) {
            day.find('.date-value').html(currentYear + '-' + standardMonth + '-' + standardDayIndex);
            day.find('.num-date').html(newDayIndex).parent().parent().addClass('dead-month-color');
          } else {
            day.find('.date-value').html(currentYear + '-' + standardMonth + '-' + newDayIndex);
            day.find('.num-date').html(newDayIndex).parent().parent().addClass('dead-month-color');
          }
        }
      } else {
        const thisMonth = (Number(currentMonth) + 1);
        const standardNewMonth = '0' + thisMonth;
        const newDays = dayIndex;
        const standardNewDays = '0' + dayIndex;
        
        if (thisMonth < 10) {
          if (dayIndex < 10) {
            day.find('.date-value').html(currentYear + '-' + standardNewMonth + '-' + standardNewDays);
            day.find('.num-date').html('&nbsp' + newDays + '&nbsp');
          } else {
            day.find('.date-value').html(currentYear + '-' + standardNewMonth + '-' + newDays);
            day.find('.num-date').html(newDays);
          }
        } else {
          if (dayIndex < 10) {
            day.find('.date-value').html(currentYear + '-' + thisMonth + '-' + standardNewDays);
            day.find('.num-date').html('&nbsp' + newDays + '&nbsp');
          } else {
            day.find('.date-value').html(currentYear + '-' + thisMonth + '-' + newDays);
            day.find('.num-date').html(newDays);
          }
        }
      }

      // Find the 1 day of each month and add Class first-day
      if (day.find('.num-date').html() === '&nbsp;' + '1' + '&nbsp;') {
        day.find('.num-date').parent().addClass('first-day');
      } else {
        day.find('.num-date').parent().removeClass('first-day');
      }
    });

  }

  renderPrevMonthDays() {
    MONTHS[1].days = Number($(document).find('#year').val()) % 4 == 0 ? 29 : 28;
    let currentYear = $(document).find('#year').val();
    let prevMonth = Number($(document).find('#month').val());
    const startOfMonth = new Date($(document).find('#year').val(), $(document).find('#month').val(), 1).getDay();
    const prevMonthDays = $(document).find('#month').val() == 0 ? 31 : MONTHS[$(document).find('#month').val() - 1].days;
    const weeks = $(document).find('.weeks').children();
    const prevDays = _.range(1, prevMonthDays + 1).slice(-startOfMonth);

    _.range(0, startOfMonth).forEach((dayIndex) => {
      const day = $(weeks[dayIndex]);

      if (startOfMonth > dayIndex) {
        if (prevMonth === 0) {
          prevMonth = 12;
          currentYear = Number(currentYear) - 1;
        }

        if (prevMonth < 10) {
          const standardNewMonth = '0' + prevMonth;
          day.find('.date-value').html(currentYear + '-' + standardNewMonth + '-' + (prevDays[dayIndex]));
          day.find('.num-date').html((prevDays[dayIndex]));
        } else {
          day.find('.date-value').html(currentYear + '-' + prevMonth + '-' + (prevDays[dayIndex]));
          day.find('.num-date').html((prevDays[dayIndex]));
        }

        day.find('.num-date').parent().parent().addClass('dead-month-color');
        day.find('.num-box').parent().removeClass('day-background-color');
      }
    });
  }

  selectedDay() {
    if ($('.day-box').hasClass('day-background-color') == true) {
      // $(document).find('#todays-day').html;
    } else if ($('.num-box').hasClass('first-day') == true) {
      $('.first-day').parent().addClass('selected-day clicked-day');
      $('.dead-month-color').removeClass('clicked-day');
    }
  }

  changeCal() {
    $('.update-event-form').removeClass('show-update-form');
    $('.day-box').removeClass('clicked-day double-click selected-day');
    $('.main-info-section').removeClass('animate-events-one animate-events-two');
    $('.add-item-button, .add-item-container').show();
    $('.add-item-form').removeClass('show-form');
    $('.num-box').removeClass('first-day current-day');

    this.renderMonth();
    this.renderPrevMonthDays();
    this.selectedDay();
    setTimeout(() => {
      this.getEvents();
    }, 100);
  }

  prevClick() {
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
    this.changeCal();
  }

  currentClick() {
    $(document).find('#month').val(this.currentMonth).change();
    $(document).find('#year').val(this.currentYear).change();
    this.changeCal();
  }

  nextClick() {
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
    this.changeCal();
  }


  onSwipeLeft(e) {
    if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i)) {
      if (!$('.day-box').hasClass('double-click')) {
        this.nextClick();
      } else {
        if ($(e.target).hasClass('main-info-section')) {
          if (!$(e.target).parent().next().hasClass('dead-month-color')) {
            $('.day-box').removeClass('clicked-day double-click');
            $('.main-info-section').removeClass('animate-events-one animate-events-two');
            if ($(e.target).parent().next().length === 0) {
              $(e.target).parent().parent().next().children().eq(0).addClass('clicked-day double-click');
              $('.double-click').find('.main-info-section').addClass('animate-events-one');
              setTimeout(() => {
                $('.double-click').find('.main-info-section').addClass('animate-events-two');
              }, 400);
            } else {
              $(e.target).parent().next().addClass('clicked-day double-click');
              $('.double-click').find('.main-info-section').addClass('animate-events-one');
              setTimeout(() => {
                $('.double-click').find('.main-info-section').addClass('animate-events-two');
              }, 400);
            }
          }
        } else if ($(e.target).hasClass('event')) {
          if (!$(e.target).parent().parent().parent().next().hasClass('dead-month-color')) {
            $('.day-box').removeClass('clicked-day double-click');
            $('.main-info-section').removeClass('animate-events-one animate-events-two');
            if ($(e.target).parent().parent().parent().next().length === 0) {
              $(e.target).parent().parent().parent().parent().next().children().eq(0).addClass('clicked-day double-click');
              $('.double-click').find('.main-info-section').addClass('animate-events-one');
              setTimeout(() => {
                $('.double-click').find('.main-info-section').addClass('animate-events-two');
              }, 400);
            } else {
              $(e.target).parent().parent().parent().next().addClass('clicked-day double-click');
              $('.double-click').find('.main-info-section').addClass('animate-events-one');
              setTimeout(() => {
                $('.double-click').find('.main-info-section').addClass('animate-events-two');
              }, 400);
            }
          }
        } else if ($(e.target).hasClass('event-details')) {
          if (!$(e.target).parent().parent().parent().parent().next().hasClass('dead-month-color')) {
            $('.day-box').removeClass('clicked-day double-click');
            $('.main-info-section').removeClass('animate-events-one animate-events-two');
            if ($(e.target).parent().parent().parent().parent().next().length === 0) {
              $(e.target).parent().parent().parent().parent().parent().next().children().eq(0).addClass('clicked-day double-click');
              $('.double-click').find('.main-info-section').addClass('animate-events-one');
              setTimeout(() => {
                $('.double-click').find('.main-info-section').addClass('animate-events-two');
              }, 400);
            } else {
              $(e.target).parent().parent().parent().parent().next().addClass('clicked-day double-click');
              $('.double-click').find('.main-info-section').addClass('animate-events-one');
              setTimeout(() => {
                $('.double-click').find('.main-info-section').addClass('animate-events-two');
              }, 400);
            }
          }
        }
      }
    }
  }

  onSwipeRight(e) {
    if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i)) {
      if (!$('.day-box').hasClass('double-click')) {
        this.prevClick();
      } else {
        if ($(e.target).hasClass('main-info-section')) {
          if (!$(e.target).parent().prev().hasClass('dead-month-color')) {
            $('.day-box').removeClass('clicked-day double-click');
            $('.main-info-section').removeClass('animate-events-one animate-events-two');
            if ($(e.target).parent().prev().length === 0) {
              $(e.target).parent().parent().prev().children().eq(6).addClass('clicked-day double-click');
              $('.double-click').find('.main-info-section').addClass('animate-events-one');
              setTimeout(() => {
                $('.double-click').find('.main-info-section').addClass('animate-events-two');
              }, 400);
            } else {
              $(e.target).parent().prev().addClass('clicked-day double-click');
              $('.double-click').find('.main-info-section').addClass('animate-events-one');
              setTimeout(() => {
                $('.double-click').find('.main-info-section').addClass('animate-events-two');
              }, 400);
            }
          }
        } else if ($(e.target).hasClass('event')) {
          if (!$(e.target).parent().parent().parent().prev().hasClass('dead-month-color')) {
            $('.day-box').removeClass('clicked-day double-click');
            $('.main-info-section').removeClass('animate-events-one animate-events-two');
            if ($(e.target).parent().parent().parent().prev().length === 0) {
              $(e.target).parent().parent().parent().parent().prev().children().eq(6).addClass('clicked-day double-click');
              $('.double-click').find('.main-info-section').addClass('animate-events-one');
              setTimeout(() => {
                $('.double-click').find('.main-info-section').addClass('animate-events-two');
              }, 400);
            } else {
              $(e.target).parent().parent().parent().prev().addClass('clicked-day double-click');
              $('.double-click').find('.main-info-section').addClass('animate-events-one');
              setTimeout(() => {
                $('.double-click').find('.main-info-section').addClass('animate-events-two');
              }, 400);
            }
          }
        } else if ($(e.target).hasClass('event-details')) {
          if (!$(e.target).parent().parent().parent().parent().prev().hasClass('dead-month-color')) {
            $('.day-box').removeClass('clicked-day double-click');
            $('.main-info-section').removeClass('animate-events-one animate-events-two');
            if ($(e.target).parent().parent().parent().parent().prev().length === 0) {
              $(e.target).parent().parent().parent().parent().parent().prev().children().eq(6).addClass('clicked-day double-click');
              $('.double-click').find('.main-info-section').addClass('animate-events-one');
              setTimeout(() => {
                $('.double-click').find('.main-info-section').addClass('animate-events-two');
              }, 400);
            } else {
              $(e.target).parent().parent().parent().parent().prev().addClass('clicked-day double-click');
              $('.double-click').find('.main-info-section').addClass('animate-events-one');
              setTimeout(() => {
                $('.double-click').find('.main-info-section').addClass('animate-events-two');
              }, 400);
            }
          }
        }
      }
    }
  }

  clickonDay(e) {
    $('.add-item-form').removeClass('show-form');
    $('.extra').hide();
    if ($(e.target).hasClass('prev-day-icon')) {
      $('.visible').removeClass('selected-event');
      if (!$(e.currentTarget).prev().hasClass('dead-month-color')) {
        $('.day-box').removeClass('clicked-day double-click');
        $('.main-info-section').removeClass('animate-events-one animate-events-two');
        if ($(e.currentTarget).prev().length === 0) {
          $(e.currentTarget).parent().prev().children().eq(6).addClass('clicked-day double-click');
          $('.double-click').find('.main-info-section').addClass('animate-events-one');
          setTimeout(() => {
            $('.double-click').find('.main-info-section').addClass('animate-events-two');
          }, 400);
        } else {
          $(e.currentTarget).prev().addClass('clicked-day double-click');
          $('.double-click').find('.main-info-section').addClass('animate-events-one');
          setTimeout(() => {
            $('.double-click').find('.main-info-section').addClass('animate-events-two');
          }, 400);
        }
      }
    } else if ($(e.target).hasClass('next-day-icon')) {
      $('.visible').removeClass('selected-event');
      if (!$(e.currentTarget).next().hasClass('dead-month-color')) {
        $('.day-box').removeClass('clicked-day double-click');
        $('.main-info-section').removeClass('animate-events-one animate-events-two');
        if ($(e.currentTarget).next().length === 0) {
          $(e.currentTarget).parent().next().children().eq(0).addClass('clicked-day double-click');
          $('.double-click').find('.main-info-section').addClass('animate-events-one');
          setTimeout(() => {
            $('.double-click').find('.main-info-section').addClass('animate-events-two');
          }, 400);
        } else {
          $(e.currentTarget).next().addClass('clicked-day double-click');
          $('.double-click').find('.main-info-section').addClass('animate-events-one');
          setTimeout(() => {
            $('.double-click').find('.main-info-section').addClass('animate-events-two');
          }, 400);
        }
      }
    } else if ($(e.target).hasClass('close-day-icon')) {
      $('.day-box').removeClass('double-click');
      $('.main-info-section').removeClass('animate-events-one animate-events-two');
      $('.visible').removeClass('selected-event');
      setTimeout(() => {
        $('.main-info-section').animate({ scrollTop: 0 }, 300);
      }, 400);
    } else if (!$(e.currentTarget).hasClass('clicked-day') && !$(e.currentTarget).hasClass('double-click')) {
      $('.day-box').removeClass('clicked-day double-click');
      $(e.currentTarget).addClass('clicked-day');
    } else if ($(e.currentTarget).hasClass('clicked-day')) {
      $(e.currentTarget).addClass('double-click');
      $(e.currentTarget).find('.main-info-section').addClass('animate-events-one');
      setTimeout(() => {
        $('.double-click').find('.main-info-section').addClass('animate-events-two');
      }, 400);
    }
  }

  getEvents() {
    this.loading = true;
    this.dataService.getEvents()
      .subscribe((response) => {
        let i;
        let dayIndex;
        const eventlist = [];
        const weeks = $(document).find('.weeks').children();

        for (dayIndex = 0; dayIndex <= 42; dayIndex++) {
          const day = $(weeks[dayIndex - 1]);

          for (i = 0; i < response.length; i++) {
            eventlist[i] = {
              eventid: response[i].id.toString(),
              eventtitle: response[i].title,
              eventstart_date: response[i].start_date.substring(0, 10),
              eventdesc: response[i].description,
              eventlocation: response[i].location,
              eventfrequency: response[i].frequency,
              eventstart_time: moment(response[i].start_time, 'HH:mm:ss').format('h:mm A'),
              eventend_time: moment(response[i].end_time, 'HH:mm:ss').format('h:mm A'),
              eventcreatedAt: moment(response[i].created_at).format()
            };

            if (eventlist[i].eventstart_date === day.find('.date-value').html()) {

              setTimeout(() => {
                if (day.find('.event').hasClass(day.find('.date-value').html())) {
                  day.find('.' + day.find('.date-value').html()).addClass('visible');
                }
              }, 100);
            }
          }
          this.events = eventlist;

          this.loading = false;
        }
      });
  }

  // Click on an Event
  selectEvent(e) {
    const day = $('.clicked-day .date-value').text();

    // If delete button has been clicked
    if ($(e.target).hasClass('delete-event')) {
      this.deleteItemForm = new FormGroup({
        id: new FormControl($(e.target).val()),
      });
    }
    // If an event has been clicked once
    else if (!$(e.currentTarget).hasClass('selected-event')) {
      $('.visible').removeClass('selected-event');
      $(e.currentTarget).addClass('selected-event');
    } 
    // If an event has been clicked twice
    else if ($(e.currentTarget).hasClass('selected-event')) {
      $('.add-item-button, .add-item-container').hide();
      setTimeout(() => {
        $('.update-event-form').addClass('show-update-form');
      }, 200);
      $('.update-event-form').animate({ scrollTop: 0 }, 400);

      // Define variables by finding the html of the 1st child element an reducing it to AM or PM, just hours, and just minutes
      const timeofday = e.currentTarget.childNodes[4].children[0].innerHTML.trim().split(' ')[1];
      let eHours: any = Number(e.currentTarget.childNodes[4].children[0].innerHTML.trim().split(':')[0]);
      const eMinutes: any = e.currentTarget.childNodes[4].children[0].innerHTML.trim().split(':')[1].substring(0, 2);

      // This is a repeat of the above just for creating the end date, except this time we find the 2nd child element
      const timeofday2 = e.currentTarget.childNodes[4].children[1].innerHTML.trim().split(' ')[1];
      let eEndTimeHours: any = Number(e.currentTarget.childNodes[4].children[1].innerHTML.trim().split(':')[0]);
      const eEndTimeMinutes = e.currentTarget.childNodes[4].children[1].innerHTML.trim().split(':')[1].substring(0, 2);

      // Define how to display Hours, this checks for AM/PM on a 24hr format
      if (timeofday === 'PM' && eHours <= 10) {
        eHours = 24 - (12 - eHours);
      } else if (timeofday === 'PM' && eHours > 10) {
        if (eHours === 12) {
          eHours = eHours;
        } else {
          eHours = eHours + 12;
        }
      } else if (timeofday === 'AM' && eHours < 10) {
        eHours = '0' + eHours;
      } else if (timeofday === 'AM' && eHours === 12) {
        eHours = '00';
      }

      // Repeat of above but for the end time
      if (timeofday2 === 'PM' && eEndTimeHours <= 10) {
        eEndTimeHours = 24 - (12 - eEndTimeHours);
      } else if (timeofday2 === 'PM' && eEndTimeHours > 10) {
        if (eEndTimeHours === 12) {
          eEndTimeHours = eEndTimeHours;
        } else {
          eEndTimeHours = eEndTimeHours + 12;
        }
      } else if (timeofday2 === 'AM' && eEndTimeHours < 10) {
        eEndTimeHours = '0' + eEndTimeHours;
      }

      // Set the time to variables and concat the values to a proper time input format
      const eCurrentTime = eHours + ':' + eMinutes;
      const eEndTime = eEndTimeHours + ':' + eEndTimeMinutes;

      // Update the form with the time values defined above
      this.updateItemForm = new FormGroup({
        id: new FormControl(e.currentTarget.childNodes[5].value),
        frequency: new FormControl(Number(e.currentTarget.childNodes[3].innerHTML.trim())),
        title: new FormControl(e.currentTarget.childNodes[0].innerHTML.trim()),
        description: new FormControl(e.currentTarget.childNodes[1].innerHTML.trim()),
        start_date: new FormControl(day),
        end_date: new FormControl(day),
        start_time: new FormControl(eCurrentTime),
        end_time: new FormControl(eEndTime),
        all_day: new FormControl(''),
        location: new FormControl(e.currentTarget.childNodes[2].innerHTML.trim()),
      });
    }
  }

  // Delete an event
  deleteEvent(e) {
    // On click set the value of the form with the value of the button
    this.updateItemForm = new FormGroup({
      id: new FormControl($('.event-id-update input').val()),
      item_type: new FormControl(''),
      frequency: new FormControl(''),
      title: new FormControl(''),
      description: new FormControl(''),
      start_date: new FormControl(''),
      end_date: new FormControl(''),
      start_time: new FormControl(''),
      end_time: new FormControl(''),
      all_day: new FormControl(''),
      location: new FormControl(''),
    });

    this.closeForm();
    // Delete the event
    this.dataService.deleteEvent(this.updateItemForm.value)
      .subscribe((response) => {
        this.closeEventUpdateForm();
        // Get the new Events table after the item has been deleted
        setTimeout(() => {
          this.getEvents();
        }, 300);
      });
  }

  openForm() {
    const day = $('.clicked-day .date-value').text();
    let minutes: any = Number(String(this.clock.getMinutes()).padStart(2, '0'));
    if (minutes < 10) {
      minutes = '0' + minutes;
      minutes.toString();
    }
    let hours: any = Number(String(this.clock.getHours()).padStart(2, '0'));
    if (hours === 24 && minutes > 0) {
      hours = '00';
    } else if (hours < 10) {
      hours = '0' + hours;
      hours.toString();
    }
    let extraHour: any = Number(String(this.clock.getHours() + 1).padStart(2, '0'));
    if (extraHour === 24 && minutes > 0) {
      extraHour = '00';
    } else if (extraHour < 10) {
      extraHour = '0' + extraHour;
      extraHour.toString();
    }
    const currentTime = hours.toString() + ':' + minutes.toString();
    const endTime = (extraHour) + ':' + minutes;

    $('.add-item-container').animate({ scrollTop: 0 }, 400);
    $('.add-item-container').addClass('show-form');
    $('.add-item-button').hide();
    $('.form-nav-bar, .add-item-form').addClass('animate-events-one');
    setTimeout(() => {
      $('.form-nav-bar, .add-item-form').addClass('animate-events-two');
    }, 450);

    this.addItemForm = new FormGroup({
      item_type: new FormControl(1),
      frequency: new FormControl(0),
      title: new FormControl(''),
      description: new FormControl(''),
      start_date: new FormControl(day),
      end_date: new FormControl(day),
      start_time: new FormControl(currentTime),
      end_time: new FormControl(endTime),
      all_day: new FormControl(''),
      location: new FormControl(''),
    });
  }

  onStartDateChange(e) {
    this.addItemForm = new FormGroup({
      item_type: new FormControl($('.item-type select').val()),
      frequency: new FormControl($('.frequency select').val()),
      title: new FormControl($('.item-title input').val()),
      description: new FormControl($('.event-description textarea').val()),
      start_date: new FormControl(e.target.value),
      end_date: new FormControl(e.target.value),
      start_time: new FormControl($('.time-input input').val()),
      end_time: new FormControl($('.time-input-end input').val()),
      all_day: new FormControl($('.time-all-day input').val()),
      location: new FormControl($('.location-input input').val()),
    });

    this.updateItemForm = new FormGroup({
      id: new FormControl($('.event-id-update input').val()),
      item_type: new FormControl($('.item-type-update select').val()),
      frequency: new FormControl($('.frequency-update select').val()),
      title: new FormControl($('.item-title-update input').val()),
      description: new FormControl($('.event-description-update textarea').val()),
      start_date: new FormControl(e.target.value),
      end_date: new FormControl(e.target.value),
      start_time: new FormControl($('.time-input-update input').val()),
      end_time: new FormControl($('.time-input-end-update input').val()),
      all_day: new FormControl($('.time-all-day input').val()),
      location: new FormControl($('.location-input-update input').val()),
    });
  }

  onStartTimeChange(e) {
    let minutes: any = Number(String(e.target.value).slice(-2));
    if (minutes < 10) {
      minutes = '0' + minutes;
      minutes.toString();
    }

    let hours: any = Number(String(e.target.value).substring(0, 2)) + 1;
    if (hours === 24 && minutes > 0) {
      hours = '00';
    } else if (hours < 10) {
      hours = '0' + hours;
      hours.toString();
    }

    const endTime = hours + ':' + minutes;

    this.addItemForm = new FormGroup({
      item_type: new FormControl($('.item-type select').val()),
      frequency: new FormControl($('.frequency select').val()),
      title: new FormControl($('.item-title input').val()),
      description: new FormControl($('.event-description textarea').val()),
      start_date: new FormControl($('.date-input input').val()),
      end_date: new FormControl($('.date-input-end input').val()),
      start_time: new FormControl(e.target.value),
      end_time: new FormControl(endTime),
      all_day: new FormControl($('.time-all-day input').val()),
      location: new FormControl($('.location-input input').val()),
    });

    this.updateItemForm = new FormGroup({
      id: new FormControl($('.event-id-update input').val()),
      item_type: new FormControl($('.item-type-update select').val()),
      frequency: new FormControl($('.frequency-update select').val()),
      title: new FormControl($('.item-title-update input').val()),
      description: new FormControl($('.event-description-update textarea').val()),
      start_date: new FormControl($('.date-input-update input').val()),
      end_date: new FormControl($('.date-input-update input').val()),
      start_time: new FormControl(e.target.value),
      end_time: new FormControl(endTime),
      all_day: new FormControl($('.time-all-day input').val()),
      location: new FormControl($('.location-input-update input').val()),
    });
  }

  allDaySelected(e) {
    const endTime = 23 + ':' + 59;
    const startTime = '00' + ':' + '00';

    if (e.target.checked === true) {
      this.addItemForm = new FormGroup({
        item_type: new FormControl($('.item-type select').val()),
        frequency: new FormControl($('.frequency select').val()),
        title: new FormControl($('.item-title input').val()),
        description: new FormControl($('.event-description textarea').val()),
        start_date: new FormControl($('.date-input input').val()),
        end_date: new FormControl($('.date-input-end input').val()),
        start_time: new FormControl(startTime),
        end_time: new FormControl(endTime),
        all_day: new FormControl($('.time-all-day input').val()),
        location: new FormControl($('.location-input input').val()),
      });

      this.updateItemForm = new FormGroup({
        id: new FormControl($('.event-id-update input').val()),
        item_type: new FormControl($('.item-type-update select').val()),
        frequency: new FormControl($('.frequency-update select').val()),
        title: new FormControl($('.item-title-update input').val()),
        description: new FormControl($('.event-description-update textarea').val()),
        start_date: new FormControl($('.date-input-update input').val()),
        end_date: new FormControl($('.date-input-update input').val()),
        start_time: new FormControl(startTime),
        end_time: new FormControl(endTime),
        all_day: new FormControl($('.time-all-day input').val()),
        location: new FormControl($('.location-input-update input').val()),
      });
    }
  }

  closeForm() {
    this.addItemForm.reset();
    $('.add-item-container').removeClass('show-form');
    $('.form-nav-bar, .add-item-form').removeClass('animate-events-one animate-events-two');
    setTimeout(() => {
      $('.add-item-button').show();
    }, 300);
  }

  submitEvent() {
    this.dataService.createEvent(this.addItemForm.value)
      .subscribe((response) => {
        this.addItemForm.reset();
        this.closeForm();

        setTimeout(() => {
          this.getEvents();
        }, 300);
      });
  }

  updateEvent() {
    this.loading = true;
    this.dataService.updatedEvent(this.updateItemForm.value)
      .subscribe((response) => {
        this.closeEventUpdateForm();
        this.loading = false;

        setTimeout(() => {
          this.getEvents();
        }, 300);
      });
  }

  closeEventUpdateForm() {
    this.updateItemForm.reset();
    $('.event').removeClass('selected-event');
    $('.update-event-form').removeClass('show-update-form');
    $('.add-item-button, .add-item-container').show();
  }


  ngOnDestroy() {
    
  }

}