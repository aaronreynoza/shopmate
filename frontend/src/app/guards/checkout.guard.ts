import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { UtilService } from '../services/util.service';

@Injectable({
  providedIn: 'root',
})
export class CheckoutGuard implements CanActivate {
  cart = [];
  constructor(private utilService: UtilService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.cart = this.utilService.getCart();
    if (this.cart.length) {
      return true;
    } else {
      Swal.fire({
        icon: 'warning',
        text: 'Primero agrega productos al carrito',
      });
      this.router.navigate(['store/view-cart'])
      return false;
    }
  }
}
