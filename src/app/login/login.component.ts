import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserDataService } from '../services/userdata.service';
import { Router } from '@angular/router';
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
  constructor(private dataService: UserDataService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.dataService.loginuser(this.loginForm.value)
      .subscribe((response) => {
        if (response.status === 204) {
          console.log('user is not logged in');
          $('.fail-message').addClass('show-fail');
          console.log(response);
        } else if (response.status === 201) {
          console.log(response);
          $('.success-message').addClass('show-success');
          setTimeout(() => {
            this.router.navigate(['/calendar']);
          }, 2000);
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
  }

}
