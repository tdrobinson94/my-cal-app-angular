import { Component, OnInit } from '@angular/core';
import $ from 'jquery';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  clickNavButton() {
    $('.hamburger').toggleClass('is-active');
    $('.wrapper ul').slideToggle();
  }

}
