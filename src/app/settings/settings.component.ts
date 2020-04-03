import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../services/userdata.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  firstName: string = '';
  lastName: string = '';
  userName: string = '';
  Email: string = '';
  constructor(private dataService: UserDataService, private cookieService: CookieService, private router: Router) { }

  ngOnInit(): void {
    this.dataService.isLoggedIn()
      .subscribe((response) => {
        console.log(response[0]);
        let cookieValue = this.cookieService.get('userId');
        if (response[0].id == cookieValue) {
          console.log('User has logged in');
          console.log(response);
          this.userName = (response[0].username);
          this.firstName = (response[0].firstname);
          this.lastName = (response[0].lastname);
          this.Email = (response[0].email);
        }
      });
  }

  deleteMyUser() {
    // let cookieValue = this.cookieService.get('userId');
    this.dataService.deleteUser()
      .subscribe((response) => {
        console.log(response);
        // this.userName = '';
        // this.firstName = '';
        // this.lastName = '';
        // this.Email = '';
      }

      );
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 3000);
  }

}
