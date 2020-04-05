import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../services/userdata.service';
import $ from 'jquery';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(private dataService: UserDataService, private router: Router, private cookieService: CookieService) { }

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
    this.cookieService.delete('userId');
    this.cookieService.delete('username');
    this.dataService.setLoggedIn(false);
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
