import { Component, OnInit } from '@angular/core';
import { MONTHS } from './months.constant';
import $ from 'jquery';

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
  currentMonth = month;
  currentYear = year;
  january = MONTHS[0].name;
  february = MONTHS[1].name;
  march = MONTHS[2].name;
  april = MONTHS[3].name;
  may = MONTHS[4].name;
  june = MONTHS[5].name;
  july = MONTHS[6].name;
  august = MONTHS[7].name;
  september = MONTHS[8].name;
  october = MONTHS[9].name;
  november = MONTHS[10].name;
  december = MONTHS[11].name;

  minusFive = (year - 5);
  minusFour = (year - 4);
  minusThree = (year - 3);
  minusTwo = (year - 2);
  minusOne = (year - 1);
  addOne = (year - 1);
  addTwo = (year - 2);
  addThree = (year - 3);
  addFour = (year - 4);
  addFive = (year - 5);

  constructor() { }

  ngOnInit(): void {
  }

}
