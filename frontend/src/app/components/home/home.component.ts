import { Component, OnInit } from '@angular/core';
import { product } from 'src/app/models/product.model';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [],
})
export class HomeComponent implements OnInit {
  itemsWishList: any[] = [];
  itemCartList: any[] = [];
  products: product[] = [
    {
      name: 'Laptop MX-1SD3',
      image: 'assets/img/product01.png',
      category: 'Laptops',
      description: 'A beautiful laptop',
      price: 440.5,
    },
    {
      name: 'Laptop RX-1SD3',
      image: 'assets/img/product01.png',
      category: 'Laptops',
      description: 'A beautiful laptop',
      price: 540.5,
    },
    {
      name: 'Laptop ZX-1SD3',
      image: 'assets/img/product01.png',
      category: 'Laptops',
      description: 'A beautiful laptop',
      price: 600.5,
    },
    {
      name: 'Laptop LX-1SD3',
      image: 'assets/img/product01.png',
      category: 'Laptops',
      description: 'A beautiful laptop',
      price: 7700.5,
    },
  ];

  constructor(private utilService: UtilService) {}

  ngOnInit(): void {}

  addToWishList(product: product) {
    this.itemsWishList.push(product);
    this.utilService.addToWishList({
      count: this.itemsWishList.length,
      products: this.itemsWishList,
    });
  }
  addToCart(product: product) {
    this.itemCartList.push(product);
    this.utilService.addToCart({
      count: this.itemCartList.length,
      products: this.itemCartList,
    });
  }
}
