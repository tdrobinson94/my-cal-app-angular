import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserDataService } from '../services/userdata.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });
  firstName: string = '';
  lastName: string = '';
  constructor(private dataService: UserDataService, private router: Router, private cookieService: CookieService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.dataService.loginuser(this.loginForm.value)
      .subscribe((response) => {
        if (response.status === 204) {
          console.log('user is not logged in');
          $('.fail-message-2').addClass('show-fail');
          console.log(response);
        } else if (response.status === 201) {
          console.log('user: ' + response.body.id, 'username: ' + response.body.username);
          this.cookieService.set('userId', response.body.id);
          this.cookieService.set('username', response.body.username);
          $('.success-message').addClass('show-success');
          setTimeout(() => {
            this.router.navigate(['/calendar']);
          }, 2000);
          let cookieValue = this.cookieService.get('userId');
          this.dataService.isLoggedIn()
            .subscribe((response) => {
              if (response[0].id == cookieValue) {
                console.log('User has logged in');
                console.log(response[0]);

                this.firstName = (response[0].firstname);
                this.lastName = (response[0].lastname)
              }
            });
        } else {
          console.log('user is not logged in');
          $('.fail-message').addClass('show-fail');
          console.log(response);
        }
      });
  }

  closePopup() {
    $('.success-message').removeClass('show-success');
    $('.fail-message').removeClass('show-fail');
    $('.fail-message-2').removeClass('show-fail');
  }

  clickLink() {
    $('html, body').animate({ scrollTop: 0 }, 500);
  }

}
