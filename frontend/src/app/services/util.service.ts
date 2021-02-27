import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { product } from '../models/product.model';

import { user } from '../models/user.model';
import { wishList } from '../models/wishList.model';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  users: user[] = [];
  public itemWishList: wishList = {
    count: 0,
    products: [],
  };
  public itemCartList: wishList = {
    count: 0,
    products: [],
  };
  private statusSource = new BehaviorSubject({ isLoggedIn: false });
  public statusSubscriber = this.statusSource.asObservable();
  private wishListSource = new BehaviorSubject(this.itemWishList);
  public wishListSubscriber = this.wishListSource.asObservable();
  private cartListSource = new BehaviorSubject(this.itemCartList);
  public cartListSubscriber = this.cartListSource.asObservable();
  constructor() {}
  addToWishList(item: wishList) {
    localStorage.setItem('wishList',JSON.stringify(item))
    this.wishListSource.next(item);
  }
  addToCart(item: wishList) {
    localStorage.setItem('cartList',JSON.stringify(item))
    this.cartListSource.next(item);
  }
  getWishList() {
    return  JSON.parse(localStorage.getItem('wishList'))
  }
  getCart() {
   return  JSON.parse(localStorage.getItem('cartList'))
  }

  isLoggedIn(status: boolean) {
    this.statusSource.next({ isLoggedIn: status });
  }

  setCurrentUser(formValue: user) {
    return localStorage.setItem('currentUser', JSON.stringify(formValue));
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }
  removeCurrentUser() {
    localStorage.removeItem('status');
    return localStorage.removeItem('currentUser');
  }
  setStatus(status: boolean) {
    return localStorage.setItem(
      'status',
      JSON.stringify({ isLoggedIn: status })
    );
  }
  getStatus() {
    return JSON.parse(localStorage.getItem('status'));
  }
  setUsers(formValue: user) {
    console.log(formValue);
    this.users.push(formValue);
    return localStorage.setItem('users', JSON.stringify(this.users));
  }
  getUsers() {
    return JSON.parse(localStorage.getItem('users'));
  }
}
