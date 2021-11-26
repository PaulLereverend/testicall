import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  errorMessage: string | undefined = "";

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  connect() {
    this.userService.logIn(this.connectForm.value.email, this.connectForm.value.password).subscribe( {
      next: (user: User) => {
        this.userService.logUser(user)
        this.router.navigateByUrl("/game")
      }, 
      error: (err) => {
        this.errorMessage = "Email ou mot de passe incorrect"
        // console.error(err);
      }
    })
  }

  signUp() {
    if (this.signUpForm.value.password === this.signUpForm.value.secondPassword) {
      this.userService.signUp(this.signUpForm.value as User).subscribe( {
        next: (user: User) => {
          this.userService.logUser(user)
          this.router.navigateByUrl("/game")
        },
        error : (err) => {
          this.errorMessage = "Veuillez remplir tous les champs"
          // console.error(err);
        }
      })
    }else{
      this.errorMessage = "Les mots de passe ne sont pas égaux"
    }
  }

}
