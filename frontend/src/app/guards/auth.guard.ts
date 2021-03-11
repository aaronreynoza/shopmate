import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UtilService } from '../services/util.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  isLogged;
  constructor(private utilService: UtilService, private router: Router) {
    
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    this.isLogged = this.utilService.getStatus().isLoggedIn;
    console.log(this.isLogged)
  if(this.isLogged){
    return true;
  } else {
    this.router.navigateByUrl('login');
    return false;
  }
  }
}
