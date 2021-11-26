import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from 'src/app/model/user/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  authUser: User | undefined = undefined

  constructor(private http: HttpClient) { }

  logIn(email: string, password: string){
    return this.http.post<User>("http://localhost:7050/login", {
      email : email, 
      password: password
    })
  }

  signUp(newUser: User) {
    return this.http.post<User>("http://localhost:7050/user/sign-up", newUser);
  }

  autoConnect(){
    if (localStorage.getItem('token')) {
      this.http.get<User>("http://localhost:7050/user/loggedUser").subscribe(user => {
        this.authUser = user;
      })
    }
  }

  isAuthenticated(): boolean{
    return this.authUser ? true : false
  }
}
