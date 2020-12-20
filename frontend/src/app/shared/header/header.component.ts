import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { categories } from 'src/app/models/categories.model';
import { category } from 'src/app/models/category.model';
import { user } from 'src/app/models/user.model';
import { wishList } from 'src/app/models/wishList.model';
import { ProductService } from 'src/app/services/product.service';
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
  wishList: wishList = JSON.parse(localStorage.getItem('wishList'))
    ? JSON.parse(localStorage.getItem('wishList'))
    : { count: 0, products: [] };
  cartList: wishList = JSON.parse(localStorage.getItem('cartList'))
    ? JSON.parse(localStorage.getItem('cartList'))
    : { count: 0, products: [] };

  constructor(
    private router: Router,
    private utilService: UtilService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    console.log('cart', this.cartList);
    // this.wishList = JSON.parse(localStorage.getItem('wishList'));
    // this.cartList = JSON.parse(localStorage.getItem('cartList'));
    // this.categories = [
    //   {
    //     category_id: 1,
    //     name: 'Laptops',
    //     icon: 'fa fas-pc',
    //     active: 1,
    //     description: 'image',
    //   },
    //   {
    //     category_id: 2,
    //     name: 'Mouse',
    //     icon: 'fa fas-pc',
    //     active: 1,
    //     description: 'image',
    //   },
    //   {
    //     category_id: 3,
    //     name: 'PC',
    //     icon: 'fa fas-pc',
    //     active: 1,
    //     description: 'image',
    //   },
    // ];
    // console.log(this.wishList, this.cartList);
    this.subscribersRefresh();
    this.getProducts();
  }

  getProducts() {
    this.productService.getCategories().subscribe(
      (data: categories[]) => {
        this.categories = data;
      },
      (err) => {
        console.log(err);
      }
    );
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
      console.log();
      if (JSON.parse(localStorage.getItem('wishList'))) {
        return (this.wishList = JSON.parse(localStorage.getItem('wishList')));
      }
      return (this.wishList = item);
      // this.wishList.count = JSON.parse(localStorage.getItem('wishList')).count
      //   ? JSON.parse(localStorage.getItem('wishList')).count
      //   : 0;
      // this.wishList.products = JSON.parse(localStorage.getItem('wishList'))
      //   .products
      //   ? JSON.parse(localStorage.getItem('wishList')).products
      //   : [];
    });
    this.utilService.cartListSubscriber.subscribe((item) => {
      if (JSON.parse(localStorage.getItem('cartList'))) {
        this.cartList = JSON.parse(localStorage.getItem('cartList'));
      }
      return (this.cartList = item);
      // this.cartList.count = JSON.parse(localStorage.getItem('cartList')).count
      //   ? JSON.parse(localStorage.getItem('cartList')).count
      //   : 0;
      // this.cartList.products = JSON.parse(localStorage.getItem('cartList'))
      //   .products
      //   ? JSON.parse(localStorage.getItem('cartList')).products
      //   : [];
    });
  }
  subtotal(cartList: wishList) {
    // console.log(cartList);
    let total = 0;
    cartList.products.forEach((item) => {
      total += item.price;
    });
    return total;
  }
}
