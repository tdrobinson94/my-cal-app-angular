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
    this.dataService.getUser()
      .subscribe((response) => {
        let res = Object.values(response);
        this.userName = (res[3]);
        this.firstName = (res[1]);
        this.lastName = (res[2]);
        this.Email = (res[4]);
      });
  }

  deleteMyUser() {
    this.dataService.deleteUser()
      .subscribe((response) => {
        console.log(response);
      });
    this.dataService.logout();
    setTimeout(() => {
      this.router.navigate(['/signup']);
    }, 3000);
  }

}
