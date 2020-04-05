import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserDataService } from '../services/userdata.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import $ from 'jquery';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  });
  loading: boolean = false;
  constructor(private dataService: UserDataService, private router: Router, private cookieService: CookieService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.loading = true;
    this.dataService.signupuser(this.signupForm.value)
      .subscribe((response) => {
        if (response.status === 204) {
          console.log('user is not logged in');
          $('.fail-message').addClass('show-fail');
          this.loading = false;
        } else if (response.status === 201) {
          $('.success-message').addClass('show-success');
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
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
  }

}
