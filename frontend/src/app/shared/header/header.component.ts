import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { categories } from 'src/app/models/categories.model';
import { user } from 'src/app/models/user.model';
import { wishList } from 'src/app/models/wishList.model';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent implements OnInit {
  public categories: categories[];
  currentUser: user;
  status: boolean;
  wishList: wishList = JSON.parse(localStorage.getItem('wishList'));
  cartList: wishList = JSON.parse(localStorage.getItem('cartList'));

  constructor(private router: Router, private utilService: UtilService) {}

  ngOnInit(): void {
    this.wishList = JSON.parse(localStorage.getItem('wishList'));
    this.cartList = JSON.parse(localStorage.getItem('cartList'));
    this.categories = [
      {
        category_id: 1,
        name: 'Laptops',
        icon: 'fa fas-pc',
        category_image: 'image',
      },
      {
        category_id: 2,
        name: 'Mouse',
        icon: 'fa fas-pc',
        category_image: 'image',
      },
      {
        category_id: 3,
        name: 'PC',
        icon: 'fa fas-pc',
        category_image: 'image',
      },
    ];
    this.subscribersRefresh();
    console.log(this.wishList, this.cartList);
  }
  navigateToPath(path) {
    this.router.navigate([path]);
  }
  logOut() {
    this.utilService.isLoggedIn(false);
    this.utilService.removeCurrentUser();
  }

  subscribersRefresh() {
    this.utilService.statusSubscriber.subscribe((data) => {
      if (data.isLoggedIn) {
        this.currentUser = this.utilService.getCurrentUser();
        this.status = this.utilService.getStatus();
      } else {
        this.currentUser = null;
        this.status = false;
      }
    });
    this.utilService.wishListSubscriber.subscribe((item) => {
      this.wishList.count = JSON.parse(localStorage.getItem('wishList')).count;
      this.wishList.products = item.products;
    });
    this.utilService.cartListSubscriber.subscribe((item) => {
      this.cartList.count = JSON.parse(localStorage.getItem('cartList')).count;
      this.cartList.products = item.products;
    });
  }
  subtotal(cartList: wishList) {
    let total = 0;
    cartList.products.forEach((item) => {
      total += item.price;
    });
    return total;
  }
}
