import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styles: [],
})
export class ViewCartComponent implements OnInit {
  products = [];

  constructor(private utilService: UtilService) {}

  ngOnInit(): void {
    this.products = this.utilService.getCart();
  }
  subtotal(cartList) {
    let total = 0;
    cartList.forEach((item) => {
      total += item.total;
    });
    return total;
  }
  deleteItemCart(item){
    this.utilService.deleteItemCart(item)
    this.products = this.utilService.getCart();
  }
}
