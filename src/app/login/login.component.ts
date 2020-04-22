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
  userName: string = '';
  loading: boolean = false;
  constructor(private dataService: UserDataService, private router: Router, private cookieService: CookieService) { }

  ngOnInit(): void {
    $('html, body').animate({ scrollTop: 0 }, 500);
  }

  onSubmit() {
    this.loading = true;
    this.dataService.loginuser(this.loginForm.value)
      .subscribe((response) => {
        if (response.status === 204) {
          console.log('user is not logged in');
          $('.fail-message-2').addClass('show-fail');
          this.loading = false;
        } else if (response.status === 201) {
          this.loading = false;
          console.log('User has logged in');
          console.log(response);
          this.cookieService.set('userId', response.body.id);
          this.cookieService.set('token', response.body.token);
          this.userName = (response.body.username);
          $('.success-message').addClass('show-success');
          this.loginForm.reset();
          setTimeout(() => {
            this.router.navigate(['/calendar']);
          }, 3000);
        } else {
          console.log('user is not logged in');
          $('.fail-message').addClass('show-fail');
          this.loading = false;
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
