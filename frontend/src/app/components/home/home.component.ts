import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [],
})
export class HomeComponent implements OnInit {
  products: any = [];
  itemWishList = [];
  constructor(
    private utilService: UtilService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    window.scroll(0, 0);
    this.getProducts();
    this.utilService.wishListSubscriber.subscribe((data) => {
      this.itemWishList = data;
    });
  }

  selectedItemWish(item) {
    const exist = this.itemWishList.find((prod) => {
      if (prod.id == item.id) {
        return prod;
      }
    });
    if (!exist) {
      return false;
    } else {
      return true;
    }
  }

  addToWishList(product: any) {
    this.utilService.addToWishList(product);
  }
  addToCart(product: product) {
    this.utilService.addToCart(product);
    Swal.fire({
      position: 'bottom-right',
      icon: 'success',
      title: 'Producto agregado al carrito de compras',
      showConfirmButton: false,
      timer: 2000,
      backdrop: true,
    });
  }

  getProducts() {
    const commonResult = []
    this.productService.getListProduct().subscribe((data: any) => {
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        if(i < 6){
          commonResult.push(element)
        }
        
      }
      this.products = commonResult
    });
  }
  seeMore(product: any) {
    this.router.navigateByUrl(`store/product/${product.id}`);
  }
}
