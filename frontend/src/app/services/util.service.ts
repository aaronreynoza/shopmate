import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { user } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  users: user[] = [];
  public itemWishList = JSON.parse(localStorage.getItem('wishList')) || [];
  public itemCartList = JSON.parse(localStorage.getItem('cartList')) || [];
  // ====================================================
  // User Login Observer
  // ====================================================
  private statusSource = new BehaviorSubject({ isLoggedIn: false });
  public statusSubscriber = this.statusSource.asObservable();
  // =====================================================
  // Cart & Wish List Observers Behavior
  // =====================================================
  private wishListSource = new BehaviorSubject(this.itemWishList);
  public wishListSubscriber = this.wishListSource.asObservable();
  private cartListSource = new BehaviorSubject(this.itemCartList);
  public cartListSubscriber = this.cartListSource.asObservable();
  // ==================================================
  
  constructor() {}

  // ================================================
  // Cart & Wish List
  // ================================================
  addToWishList(item) {
    const wishFromLocalStorage = this.getWishList();
    const existWishItem = wishFromLocalStorage.find((itemW) => {
      if (itemW.id == item.id) {
        return item;
      }
    });
    if (!existWishItem) {
      wishFromLocalStorage.push(item);
      this.setWishList(wishFromLocalStorage);
    } else {
      this.setWishList(
        wishFromLocalStorage.filter((itemW) => {
          if (itemW.id != item.id) return itemW;
        })
      );
    }

    this.wishListSource.next(this.getWishList());
  }

  addToCart(product: any) {
    const cartFromLocalStorage = this.getCart();
    if (cartFromLocalStorage.length > 0) {
      const existItemCart = cartFromLocalStorage.find((item) => {
        if (item.product.id == product.id) {
          return item;
        }
      });
      if (!existItemCart) {
        const productCarList = {
          quantity: 1,
          product,
          total: product.price,
        };
        cartFromLocalStorage.push(productCarList);
      } else {
        for (let j = 0; j < cartFromLocalStorage.length; j++) {
          let cartFrom = cartFromLocalStorage[j];
          if (cartFrom.product.id === product.id) {
            cartFrom.quantity += 1;
            cartFrom.total += product.price;
          }
        }
      }
      this.setCartList(cartFromLocalStorage);
    } else {
      const productCarList = {
        quantity: 1,
        product,
        total: product.price,
      };
      this.setCartList([productCarList]);
    }
    this.cartListSource.next(this.getCart());
  }
  deleteItemCart(itemDeleted) {
    const cartFromLocalStorage = this.getCart();
    const newCart = cartFromLocalStorage.filter(
      (item) => item.product.id !== itemDeleted.product.id
    );
    this.setCartList(newCart);
    this.cartListSource.next(newCart);
  }
  deleteItemWishlist(itemDeleted) {
    const wishlistFromLocalStorage = this.getWishList();
    const newWishlist = wishlistFromLocalStorage.filter(
      (item) => item.id !== itemDeleted.id
    );
    this.setWishList(newWishlist);
    this.wishListSource.next(newWishlist);
  }
  // ==================================================================
  // Getters & Setters Cart & Wish List
  // ==================================================================
  setWishList(item) {
    localStorage.setItem('wishList', JSON.stringify(item));
  }
  setCartList(item) {
    localStorage.setItem('cartList', JSON.stringify(item));
  }
  getWishList() {
    return JSON.parse(localStorage.getItem('wishList')) || [];
  }
  getCart() {
    return JSON.parse(localStorage.getItem('cartList')) || [];
  }
  // ==========================================================================

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
    return JSON.parse(localStorage.getItem('status')) || { isLoggedIn: false } ;
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
