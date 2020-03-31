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

    $('.container').scroll(function(){
      console.log($('.second-row').position().top);
      console.log($('.container').scrollTop())
      if ($('.container').scrollTop() > $('.first-row').position().top) {
        $('.first-row').addClass('not-showing');
      } else {
        $('.first-row').removeClass('not-showing');
      }

      if ($('.container').scrollTop() > $('.second-row').position().top) {
        $('.second-row').addClass('not-showing');
      } else {
        $('.second-row').removeClass('not-showing');
      }

      if ($('.container').scrollTop() > $('.third-row').position().top) {
        $('.third-row').addClass('not-showing');
      } else {
        $('.third-row').removeClass('not-showing');
      }
      
    });
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

    if ($(window).width() <= 800) {
      if ($('.clicked-day').position().top > 153) {
        $('.first-row').addClass('not-showing');
      } else {
        $('.first-row').removeClass('not-showing');
      }

      if ($('.clicked-day').position().top > 372) {
        $('.second-row').addClass('not-showing');
      } else {
        $('.second-row').removeClass('not-showing');
      }

      if ($('.clicked-day').position().top > 590) {
        $('.third-row').addClass('not-showing');
      } else {
        $('.third-row').removeClass('not-showing');
      }
    } else {
      if ($('.clicked-day').position().top > 111) {
        $('.first-row').addClass('not-showing');
      } else {
        $('.first-row').removeClass('not-showing');
      }
      if ($('.clicked-day').position().top > 288) {
        $('.second-row').addClass('not-showing');
      } else {
        $('.second-row').removeClass('not-showing');
      }
      $('.third-row').removeClass('not-showing');
    }

    $('.container').animate({ scrollTop: $('.selected-day').position().top - 75}, 500);
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
  }

  clickonDay(e) {
    $('.num-box').removeClass('clicked-day');
    $('.add-item-form').removeClass('show-form');
    $('.extra').hide();
    if (!$(e.currentTarget).hasClass('clicked-day')) {
      $(e.currentTarget).addClass('clicked-day');
    }

    console.log($('.clicked-day').position().top - 75)

    if ($(window).width() <= 800) {
      if ($('.clicked-day').position().top > 153) {
        $('.first-row').addClass('not-showing');
      } else {
        $('.first-row').removeClass('not-showing');
      }

      if ($('.clicked-day').position().top > 372) {
        $('.second-row').addClass('not-showing');
      } else {
        $('.second-row').removeClass('not-showing');
      }

      if ($('.clicked-day').position().top > 590) {
        $('.third-row').addClass('not-showing');
      } else {
        $('.third-row').removeClass('not-showing');
      }
    } else {
      if ($('.clicked-day').position().top > 111) {
        $('.first-row').addClass('not-showing');
      } else {
        $('.first-row').removeClass('not-showing');
      }
      if ($('.clicked-day').position().top > 288) {
        $('.second-row').addClass('not-showing');
      } else {
        $('.second-row').removeClass('not-showing');
      }
      $('.third-row').removeClass('not-showing');
    }

    $('.container').animate({ scrollTop: $('.clicked-day').position().top - 75}, 500);
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
    $('body, html').animate({ scrollTop: $('.clicked-day').position().top - 75}, 500);
  }

  selectItemEvent(e) {
    $('.checkbox').not(e.currentTarget).prop('checked', false);
    $('.select-item label').removeClass('selected');

    if ($(e.currentTarget).hasClass('item_1')) {
      console.log("Event")
      $(e.currentTarget).addClass('selected');
      $('.event-description, .description-label, .location-input, .location-label, .time-input, .time-label').addClass('show-input');
      $('.amount-input, .amount-label').removeClass('show-input');
    } else if ($(e.currentTarget).hasClass('item_2')) {
      console.log("Reminder")
      $(e.currentTarget).addClass('selected');
      $('.time-input, .time-label, .location-input, .location-label').addClass('show-input');
      $('.event-description, .description-label').removeClass('show-input');
      $('.amount-input, .amount-label').removeClass('show-input');
    } else if ($(e.currentTarget).hasClass('item_3')) {
      console.log("Task")
      $(e.currentTarget).addClass('selected');
      $('.event-description, .description-label, .time-input, .time-label').addClass('show-input');
      $('.amount-input, .amount-label, .location-input, .location-label').removeClass('show-input');
    } else if ($(e.currentTarget).hasClass('item_4')) {
      console.log("Budget")
      $(e.currentTarget).addClass('selected');
      $('.event-description, .description-label, .location-input, .location-label, .time-input, .time-label').removeClass('show-input');
      $('.amount-input, .amount-label').addClass('show-input');
    } else if ($(e.currentTarget).hasClass('item_5')) {
      console.log("Food")
      $(e.currentTarget).addClass('selected');
      $('.event-description, .description-label, .location-input, .location-label, .time-input, .time-label').removeClass('show-input');
      $('.amount-input, .amount-label').addClass('show-input');
    }
  }

  selectItemFreq(e) {
    $('.frequency').not(e.currentTarget).prop('checked', false);
    $('.checkbox label').removeClass('selected');

    if ($(e.currentTarget).hasClass('frequency_1')) {
      console.log("Item 1")
      $(e.currentTarget).addClass('selected')
    } else if ($(e.currentTarget).hasClass('frequency_2')) {
      console.log("Item 2")
      $(e.currentTarget).addClass('selected')
    } else if ($(e.currentTarget).hasClass('frequency_3')) {
      console.log("Item 3")
      $(e.currentTarget).addClass('selected')
    } else if ($(e.currentTarget).hasClass('frequency_4')) {
      console.log("Item 4")
      $(e.currentTarget).addClass('selected')
    } else if ($(e.currentTarget).hasClass('frequency_5')) {
      console.log("Item 5")
      $(e.currentTarget).addClass('selected')
    } else if ($(e.currentTarget).hasClass('frequency_6')) {
      console.log("Item 6")
      $(e.currentTarget).addClass('selected')
    } else if ($(e.currentTarget).hasClass('frequency_7')) {
      console.log("Item 7")
      $(e.currentTarget).addClass('selected')
    }
  }

}
