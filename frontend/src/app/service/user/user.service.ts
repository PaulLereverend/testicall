import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  authenticated = false;

  constructor() { }

  isAuthenticated() {
    return this.authenticated;
  }

  setAuthenticated(){
    this.authenticated = !this.authenticated
  }
}
