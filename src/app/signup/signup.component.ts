import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserDataService } from '../services/userdata.service';
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
  constructor(private dataService: UserDataService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.dataService.signupuser(this.signupForm.value)
      .subscribe((response) => {
        if (response.status === 204) {
          console.log('user is not logged in');
          $('.fail-message').addClass('show-fail');
          console.log(response);
        } else if (response.status === 201) {
          console.log(response);
          $('.success-message').addClass('show-success');
          this.signupForm.reset();
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
