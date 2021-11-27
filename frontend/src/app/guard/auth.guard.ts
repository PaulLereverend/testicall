import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../service/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  isAuthenticated: boolean = false;

  constructor(public userService: UserService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.userService.authUserSub.subscribe( user => {
      if (user) {
        this.isAuthenticated = true;
      }else{
        this.isAuthenticated = false;
      }
    })
    if (this.isAuthenticated) {
      return true;
    }else{
      this.router.navigate(['/user/profile']);
      return false;
    }
  }
  
}
