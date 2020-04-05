import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../services/userdata.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

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
  constructor(private dataService: UserDataService, private cookieService: CookieService, private router: Router) { }

  ngOnInit(): void {
    this.dataService.getUser()
      .subscribe((response) => {
        this.userName = (response[0].username);
        this.firstName = (response[0].firstname);
        this.lastName = (response[0].lastname);
        this.Email = (response[0].email);
        this.firstInitial = this.firstName.substring(0, 1);
        this.lastInitial = this.lastName.substring(0, 1);
      });
  }

}
