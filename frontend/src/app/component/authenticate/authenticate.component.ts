import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/model/user/user';
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
  signUpForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    secondPassword: new FormControl('', [Validators.required])
  });

  hidePassword: boolean = true;
  signin: boolean = true;
  invalidConnection: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  connect() {
    console.log(this.connectForm.value);

    this.userService.logIn(this.connectForm.value.email, this.connectForm.value.password).subscribe( {
      next: (user: User) => {

        this.userService.authUser = user
        let token = user.token?.replace("Bearer ", "")
        localStorage.setItem('token', token ? token : '');
        console.log(user);
      }, 
      error: (err) => {
        this.invalidConnection = true
        console.error(err);
        
      }
    })
  }

  signUp() {
    console.log(this.signUpForm.value);
    
    if (this.signUpForm.value.password === this.signUpForm.value.secondPassword) {
      this.userService.signUp(this.signUpForm.value as User).subscribe( {
        next: (response) => {
          console.log(response);
          
        },
        error : (err) => {
          console.error(err);
        }
      })
    }
  }

}
