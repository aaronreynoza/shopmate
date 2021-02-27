import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styles: [],
})
export class ProductComponent implements OnInit {
  product_id: number;
  product: any;
  itemsWishList: any[] = [];
  itemCartList: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {
    this.product_id = parseInt(this.route.snapshot.paramMap.get('id'));
    // console.log(this.product_id)
    this.getProduct();
  }

  getProduct() {
    this.product = JSON.parse(localStorage.getItem('product'));
    console.log(this.product);
    // this.productService.getProduct(this.product_id).subscribe(
    //   data => {
    //     this.product = data;
    //   }
    // );
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
}
