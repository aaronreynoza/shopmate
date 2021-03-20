import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2';
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
  Specs = [];
  imagesProduct = [];
  itemWishList = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {
    window.scroll(0, 0);
    this.product_id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.getProduct();
    this.utilService.wishListSubscriber.subscribe((data) => {
      this.itemWishList = data;
    });
  }

  getProduct() {
    this.productService.getProduct(this.product_id).subscribe(async(data) => {
      this.product = await data[0];
      console.log(data)
      // this.product.especificaciones = JSON.parse(this.product.especificaciones);
      const namesKeySpecs = Object.keys(this.product.especificaciones);
      // this.imagesProduct = this.product.images.split(',');
      for (let i = 0; i < namesKeySpecs.length; i++) {
        const nameKeySpec = namesKeySpecs[i];
        const spec = {
          name: nameKeySpec,
          description: this.product.especificaciones[nameKeySpec],
        };
        this.Specs.push(spec);
      }
    });

  }
  addToWishList(product: any) {
    this.utilService.addToWishList(product);
  }
  addToCart(product: any) {
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
  handleCarouselEvents(event) {
    console.log(event);
  }
  selectedItemWish(item) {
    if(item){
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
  }
}
