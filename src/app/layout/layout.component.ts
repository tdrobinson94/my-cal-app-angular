import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../services/userdata.service';
import $ from 'jquery';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  firstInitial: string = this.cookieService.get('firstname').substring(0, 1);
  lastInitial: string = this.cookieService.get('lastname').substring(0, 1);

  constructor(public dataService: UserDataService, private cookieService: CookieService) { }

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
    } else {
      $('html, body').animate({ scrollTop: 0 }, 500);
    }
  }

  clickLogo() {
    if ($(window).width() < 800) {
      $('.hamburger').removeClass('is-active');
      $('.wrapper ul').slideToggle().hide();
      $('html, body').animate({ scrollTop: 0 }, 500);
    } else {
      $('html, body').animate({ scrollTop: 0 }, 500);
    }
  }

  clickLogout(){
    console.log('User has logged out');
    this.clickLink();
    this.dataService.logout();
    $('html, body').animate({ scrollTop: 0 }, 500);
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
