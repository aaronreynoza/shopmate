import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { user } from 'src/app/models/user.model';
import { ProductService } from 'src/app/services/product.service';
import { SearchServiceService } from 'src/app/services/search-service.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent implements OnInit {
  categories: [] = [];
  currentUser: user;
  status: boolean;
  wishList = [];
  cartList = [];
  searchForm: FormGroup;

  constructor(
    private router: Router,
    private utilService: UtilService,
    private productService: ProductService,
    private fb: FormBuilder,
    private searchService: SearchServiceService
  ) {
    this.initSearchForm();
  }

  ngOnInit(): void {
    this.subscribersRefresh();
    this.getCategories();
    this.searchService.searchSubscriber.subscribe((data) => {
      if (data) {
        this.searchForm.controls.keyword.setValue(data.keyword);
      }
    });
    this.currentUser = this.utilService.getCurrentUser();
  }

  initSearchForm() {
    this.searchForm = this.fb.group({
      keyword: ['', Validators.required],
      category: [-1, Validators.required],
    });
  }

  getCategories() {
    this.productService.getCategories().subscribe(
      (data: any) => {
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
    this.utilService.deleteAllCart()
    this.utilService.deleteAllWishlist()
    this.utilService.removeCurrentUser();
    this.router.navigateByUrl('/');
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
      this.wishList = item;
    });

    this.utilService.cartListSubscriber.subscribe((item) => {
      this.cartList = item;
    });
  }
  subtotal(cartList) {
    let total = 0;
    cartList.forEach((item) => {
      total += item.total;
    });
    return total;
  }
  deleteItemCart(item) {
    this.utilService.deleteItemCart(item);
  }
  onPostRequest(values) {
    const searchKeyword = {
      categoryId: 0,
      active: 1,
      keyword: values.keyword,
      type_search: 'keyword',
    };
    this.searchService.setSearch(searchKeyword);
    this.router.navigate([`store/search`], {
      queryParams: { query: values.keyword, category: values.category },
    });
  }
  searchByCategory(item) {
    item.category = item.category_id;
    item.filter = null;
    item.keyword = '';
    item.type_search = 'category';
    this.searchService.setSearch(item);
    this.router.navigate([`store/search`], {
      queryParams: { category: item.category },
    });
  }
}
