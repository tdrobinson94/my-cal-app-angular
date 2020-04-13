import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../services/userdata.service';
import { Router, NavigationEnd } from '@angular/router';
import $ from 'jquery';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  firstName: string = '';
  lastName: string = '';
  firstInitial: string = '';
  lastInitial: string = '';
  showAfterLogin: any;
  deferredPrompt;

  constructor(public dataService: UserDataService, private cookieService: CookieService, private router: Router) {

    this.router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/calendar') {
          this.changeOfRoutes();
        } else if (event.url === '/profile') {
          this.changeOfRoutes();
        } else if (event.url === '/settings') {
          this.changeOfRoutes();
        } else if (event.url === '/test-cal') {
          this.changeOfRoutes();
        }
      }
    });
   }

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
  }

  changeOfRoutes() {
    this.dataService.getUser()
      .subscribe((response) => {
        let res = Object.values(response);
        this.firstName = (res[1]);
        this.lastName = (res[2]);
        this.firstInitial = this.firstName.substring(0, 1);
        this.lastInitial = this.lastName.substring(0, 1);
      });
  }

}
