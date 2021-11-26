import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.scss']
})
export class AuthenticateComponent implements OnInit {

  connectForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  subscribeForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    secondPassword: new FormControl('', [Validators.required])
  });

  hide: boolean = true;
  signin: boolean = true;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  isAuthenticated(){
    return this.userService.isAuthenticated();
  }

  connect() {
    console.log(this.connectForm.value);
  }

  subscribe() {
    console.log(this.subscribeForm.value);
    
    if (this.subscribeForm.value.password === this.subscribeForm.value.secondPassword) {
      this.userService.setAuthenticated()
    }
  }

}
