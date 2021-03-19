import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styles: [],
})
export class WishlistComponent implements OnInit {
  products = [];
  constructor(private utilService: UtilService, private router: Router) {}

  ngOnInit(): void {
    window.scroll(0, 0);
    this.products = this.utilService.getWishList();
  }
  subtotal(cartList) {
    let total = 0;
    cartList.forEach((item) => {
      total += item.total;
    });
    return total;
  }
  deleteItemCart(item) {
    this.utilService.deleteItemWishlist(item);
    this.products = this.utilService.getWishList();
  }
  navigateToPath(path) {
    this.router.navigate([path]);
  }
  seeMore(product: any) {
    this.router.navigateByUrl(`store/product/${product.id}`);
  }
}
