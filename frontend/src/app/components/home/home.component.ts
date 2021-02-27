import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [],
})
export class HomeComponent implements OnInit {
  itemsWishList: any[] = [];
  itemCartList: any[] = [];
  products: product[] = [];
  //product[] = [
  //   {
  //     name: 'Laptop MX-1SD3',
  //     image: 'assets/img/product01.png',
  //     category: 'Laptops',
  //     description: 'A beautiful laptop',
  //     price: 440.5,
  //   },
  //   {
  //     name: 'Laptop RX-1SD3',
  //     image: 'assets/img/product01.png',
  //     category: 'Laptops',
  //     description: 'A beautiful laptop',
  //     price: 540.5,
  //   },
  //   {
  //     name: 'Laptop ZX-1SD3',
  //     image: 'assets/img/product01.png',
  //     category: 'Laptops',
  //     description: 'A beautiful laptop',
  //     price: 600.5,
  //   },
  //   {
  //     name: 'Laptop LX-1SD3',
  //     image: 'assets/img/product01.png',
  //     category: 'Laptops',
  //     description: 'A beautiful laptop',
  //     price: 7700.5,
  //   },
  // ];

  constructor(
    private utilService: UtilService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  addToWishList(product: product) {
    // if(this.utilService.getWishList()){
    //   this.itemsWishList.push(this.utilService.getWishList());
    // }
    this.itemsWishList.push(product);
    this.utilService.addToWishList({
      count: this.itemsWishList.length,
      products: this.itemsWishList,
    });
  }
  addToCart(product: product) {
    console.log('cart', product);
    this.itemCartList.push(product);
    this.utilService.addToCart({
      count: this.itemCartList.length,
      products: this.itemCartList,
    });
  }

  getProducts() {
    this.productService.getListProduct().subscribe((data: product[]) => {
      this.products = data;
    });
  }
  seeMore(product: product) {
    localStorage.setItem('product', JSON.stringify(product));
    this.router.navigateByUrl(`/product/${product.product_id}`);
  }
}
