import { Component, OnInit } from '@angular/core';
import { MONTHS } from './months.constant';
import $ from 'jquery';
import _ from 'lodash';

let clock = new Date();
let month = clock.getMonth();
let year = clock.getFullYear();
let day = clock.getDate();

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  constructor() { }

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
            day.find('.num-date').html(newDayIndex).parent().parent().addClass("dead_month_color");
          } else {
            day.find('.date-value').html(currentYear + '-' + standardMonth + '-' + (dayIndex - monthDays));
            day.find('.num-date').html((dayIndex - monthDays)).parent().parent().addClass("dead_month_color");
          }
        } else {
          let standardMonth = '0' + nextMonth;
          if ((dayIndex - monthDays) < 10) {
            let newDayIndex = (dayIndex - monthDays);
            let standardDayIndex = '0' + (dayIndex - monthDays);
            day.find('.date-value').html(currentYear + '-' + standardMonth + '-' + standardDayIndex);;
            day.find('.num-date').html(newDayIndex).parent().parent().addClass("dead_month_color");
          } else {
            day.find('.date-value').html(currentYear + '-' + standardMonth + '-' + (dayIndex - monthDays));
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
            day.find('.num-date').html("&nbsp" + newDays + "&nbsp");
          } else {
            day.find('.date-value').html(currentYear + '-' + standardNewMonth + '-' + (dayIndex));
            day.find('.num-date').html((dayIndex));
          }
        } else {
          if (dayIndex < 10) {
            let newDays = dayIndex;
            let standardNewDays = '0' + dayIndex;
            day.find('.date-value').html(currentYear + '-' + thisMonth + '-' + standardNewDays);
            day.find('.num-date').html("&nbsp" + newDays + "&nbsp");
          } else {
            day.find('.date-value').html(currentYear + '-' + thisMonth + '-' + (dayIndex));
            day.find('.num-date').html((dayIndex));
          }
        }
      }
      if (day.find('.num-date').html() === '&nbsp;' + '1' + '&nbsp;') {
        day.find('.num-date').addClass('first-day');
      } else {
        day.find('.num-date').removeClass('first-day');
      }
    })

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
          day.find('.num-date').html((prevDays[dayIndex]));
        } else {
          day.find('.date-value').html(currentYear + '-' + prevMonth + '-' + (prevDays[dayIndex]));
          day.find('.num-date').html((prevDays[dayIndex]));
        }

        day.find('.num-date').parent().parent().addClass("dead_month_color");
        day.find('.num-container').parent().removeClass("day_background_color");
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
    $('.add-item-form').removeClass('show-form');
    $('.num-box').removeClass('clicked-day');
    $('.num-date').removeClass('first-day current-day');
    $('.num-box').removeClass('selected-day');

    this.renderMonth();
    this.renderPrevMonthDays();
    this.selectedDay();

    function scrollDay() {
      console.log("scrolling");
      $('.container').animate({ scrollTop: $('.selected-day').offset().top - 200 }, 500);
    }
    window.setTimeout(scrollDay, .1);
  }

  prevClick() {
    $('.extra').hide();
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
    function scrollDay() {
      console.log("scrolling");
      $('.container').animate({ scrollTop: $('.selected-day').offset().top - 200 }, 500);
    }
    window.setTimeout(scrollDay, .1);
  }

  currentClick() {
    $('.extra').hide();
    $('.add-item-form').removeClass('show-form');
    $('.num-box').removeClass('selected-day double-click');
    $('.num-date').removeClass('first-day');
    $('.transaction-button').removeClass('show');
    $(document).find('#month').val(month).change();
    $(document).find('#year').val(year).change();
    this.changeCal();
    function scrollDay() {
      console.log("scrolling");
      $('.container').animate({ scrollTop: $('.selected-day').offset().top - 200 }, 500);
    }
    window.setTimeout(scrollDay, .1);
  }

  nextClick() {
    $('.extra').hide();
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

    function scrollDay() {
      console.log("scrolling");
      $('.conatiner').animate({ scrollTop: $('.selected-day').offset().top - 200 }, 500);
    }
    window.setTimeout(scrollDay, .1);
  }

  clickonDay(e) {
    $('.num-box').removeClass('clicked-day');
    $('.add-item-form').removeClass('show-form');
    $('.extra').hide();
    if (!$(e.currentTarget).hasClass('clicked-day')) {
      $(e.currentTarget).addClass('clicked-day');
    }

    function scrollDay() {
      $('.container').animate({ scrollTop: $('.clicked-day').offset().top - 200 }, 500);
    }

    window.setTimeout(scrollDay, .3);
  }

  openDay(e) {
    $('.num-box').removeClass('double-click');
    console.log('opening day');
    $('.clicked-day').addClass('double-click');
    $('.extra').show();
  }

  closeDay(e) {
    console.log('closing day');
    $('.num-box').removeClass('double-click');
    $('.extra').hide();
  }

  openForm() {
    let clock = new Date();
    let day = $('.clicked-day').attr('value');
    let minutes = String(clock.getMinutes()).padStart(2, '0');
    let currentTime = clock.getHours() + ':' + minutes;

    $('.select-item label').removeClass('selected');
    $('.checkbox label').removeClass('selected');
    let month = (parseInt($('.month-selector').val(), 10) + 1);
    let year = (parseInt($('.year-selector').val(), 10));
    // if (month < 10)
    //   month = "0" + month;
    // if (day < 10)
    //   day = "0" + day;
    var today = year + '-' + month + '-' + day;
    $('.date-input input').val(today);
    console.log(currentTime)
    $('.time').val(currentTime);
    $('.add-item-form').addClass('show-form');
    $('.event-description, .description-label, .location-input, .location-label, .time-input, .time-label').addClass('show-input');

    if ($(window).width() <= 800) {

    } else {
      $('.clicked-day').removeClass('double-click');
    }

    $('.select-item label.item_1').addClass('selected');
    $('.checkbox label.frequency_1').addClass('selected');
  }

  closeForm() {
    $('.add-item-form').removeClass('show-form');
    function scrollDay() {
      $('body, html').animate({ scrollTop: $('.clicked-day').offset().top - 250 }, 500);
    }

    window.setTimeout(scrollDay, .3);
  }

}
