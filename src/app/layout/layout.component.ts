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

  clickLink() {
    if ($(window).width() < 800) {
      $('.hamburger').toggleClass('is-active');
      $('.wrapper ul').slideToggle();
      $('html, body').animate({ scrollTop: 0 }, 500);
    }
  }

  clickLogo() {
    if ($(window).width() < 800) {
      $('.hamburger').removeClass('is-active');
      $('.wrapper ul').slideToggle().hide();
      $('html, body').animate({ scrollTop: 0 }, 500);
    }
  }

  openFullscreen(){
    document.documentElement.requestFullscreen();
    $('.fullscreen-btn').hide();
    $('.exit-fullscreen-btn').show();
  }

  exitFullscreen() {
    document.exitFullscreen();
    $('.fullscreen-btn').show();
    $('.exit-fullscreen-btn').hide();
  }

}
