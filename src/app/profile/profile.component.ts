import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../services/userdata.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import $ from 'jquery';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  firstName: string = '';
  lastName: string = '';
  userName: string = '';
  Email: string = '';
  firstInitial: string = '';
  lastInitial: string = '';
  loading = false;
  
  constructor(private dataService: UserDataService, private cookieService: CookieService, private router: Router) { }

  ngOnInit(): void {
    this.loading = true;
    $('html, body').animate({ scrollTop: 0 }, 500);
    this.dataService.getUser()
      .subscribe((response) => {
        let res = Object.values(response);
        this.userName = (res[3]);
        this.firstName = (res[1]);
        this.lastName = (res[2]);
        this.Email = (res[4]);
        this.firstInitial = this.firstName.substring(0, 1);
        this.lastInitial = this.lastName.substring(0, 1);
        this.loading = false;
      });
  }

}
