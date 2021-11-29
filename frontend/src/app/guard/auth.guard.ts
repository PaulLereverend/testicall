import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserService } from '../service/user/user.service';
import jwt_decode, { JwtPayload } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  isAuthenticated: boolean = false;

  constructor(public userService: UserService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token')
    if (token) {
      let decodedJWT = jwt_decode<JwtPayload>(token);
      //Date d'expiration du token > maintenant : ok
      if (decodedJWT.exp && (decodedJWT.exp > new Date().getTime()/1000)) {
        return true;
      }
    }
    
    this.router.navigate(['/user/profile']);
    return false;
  }
  
}
