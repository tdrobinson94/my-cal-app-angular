import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserDataService } from '../services/userdata.service';

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
    .subscribe(
      response => console.log('Success'),
      error => console.error('Error!', error)
    );
    this.signupForm.reset();
  }

}
