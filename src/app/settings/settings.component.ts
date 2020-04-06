import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserDataService } from '../services/userdata.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import $ from 'jquery';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  updateForm = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl('')
  });
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
        this.updateForm = new FormGroup({
          firstname: new FormControl(res[1]),
          lastname: new FormControl(res[2]),
          username: new FormControl(res[3]),
          password: new FormControl('')
        });
      });
  }

  updatedMyUser() {
    this.dataService.updatedUser(this.updateForm.value)
      .subscribe((response) => {
        let res = Object.values(response);
        let data = Object.values(res[1]); 
        console.log(data);
        $('.update-form').slideToggle();

        this.updateForm = new FormGroup({
          firstname: new FormControl(data[1]),
          lastname: new FormControl(data[2]),
          username: new FormControl(data[3]),
          password: new FormControl('')
        });
      });
  }

  showUpdateForm() {
    $('.update-form').slideToggle();
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
