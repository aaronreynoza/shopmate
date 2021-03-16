import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { SearchServiceService } from 'src/app/services/search-service.service';
import { UtilService } from 'src/app/services/util.service';
declare var $;
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [],
})
export class SearchComponent implements OnInit {
  categories = [];
  queryParams: any = {};
  products = [];
  product_id: number;
  product: any;
  itemsWishList: any[] = [];
  itemCartList: any[] = [];
  Specs = [];
  imagesProduct = [];
  itemWishList = [];

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchServiceService,
    private utilService: UtilService,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.utilService.wishListSubscriber.subscribe((data) => {
      this.itemWishList = data;
    });
    this.getCategories();
    this.route.queryParamMap.subscribe((params: any) => {
      // delete params.category;
      this.queryParams = params;
    });
    console.log('queryparmas', this.queryParams);
    let itemSearch: any = {};
    const $input_price_min = $('#price_min');
    const $input_price_max = $('#price_max');
    itemSearch = {
      price_max: this.queryParams.params.price_max
        ? parseInt(this.queryParams.params.price_max)
        : 0,
      price_min: this.queryParams.params.price_min
        ? parseInt(this.queryParams.params.price_min)
        : 0,
    };
    $input_price_min.val(itemSearch.price_min);
    $input_price_max.val(itemSearch.price_max);
    console.log(itemSearch, 'itemsearch');
    if (this.queryParams.params.query) {
      this.searchProduct({
        keyword: this.queryParams.params.query,
        type_search: 'keyword',
        category: 0,
        filter: itemSearch || null,
      });
      this.searchService.setSearch({
        keyword: this.queryParams.params.query,
        type_search: 'keyword',
        category: 0,
        filter: itemSearch || null,
      });
    } else {
      this.searchProduct({
        keyword: '',
        type_search: 'category',
        category: parseInt(this.queryParams.params.category),
        filter: itemSearch || null,
      });
      this.searchService.setSearch({
        keyword: '',
        type_search: 'category',
        category: parseInt(this.queryParams.params.category),
        filter: itemSearch || null,
      });
    }
  }
  searchProduct(data) {
    if (data) {
      console.log('hay data', data);
      this.searchService.getProducts(data).subscribe(
        (res: any) => {
          console.log('serchss', res);
          this.products = res;
        },
        (err) => console.log(err)
      );
    }
    this.searchService.searchSubscriber.subscribe(
      (data) => {
        if (data) {
          this.searchService.getProducts(data).subscribe(
            (res: any) => {
              this.products = res;
            },
            (err) => console.log(err)
          );
        }
      },
      (err) => console.log(err)
    );
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
  seeMore(product: any) {
    this.router.navigateByUrl(`store/product/${product.id_producto}`);
  }
  getCategories() {
    this.productService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }
  searchByCategory(item) {
    console.log(item);
    item.category = item.category_id;
    item.filter = null;
    item.keyword = '';
    item.type_search = 'category';
    this.searchService.setSearch(item);
    this.router.navigate([`store/search`], {
      queryParams: { category: item.category },
    });
  }
  filtrar() {
    // const $input_price_min = $('#price_min').val();
    // const $input_price_max = $('#price_max').val();
    // if ($input_price_max && $input_price_min) {
    //   return;
    // }
    const price_min =
      parseInt(
        (<HTMLInputElement>document.getElementById('price_min')).value
      ) || 0;
    const price_max =
      parseInt(
        (<HTMLInputElement>document.getElementById('price_max')).value
      ) || 0;
    console.log(price_max, price_min);
    this.route.queryParamMap.subscribe((params: any) => {
      // delete params.category;
      this.queryParams = params.params;
    });
    const searchParams: any = {};
    if (this.queryParams.category == '0') {
      searchParams.keyword = this.queryParams.query;
      searchParams.type_search = 'keyword';
      searchParams.category = parseInt(this.queryParams.category);
    } else {
      searchParams.keyword = '';
      searchParams.type_search = 'category';
      searchParams.category = parseInt(this.queryParams.category);
    }

    searchParams.filter = {
      price_max,
      price_min,
    };
    this.searchService.setSearch(searchParams);
    this.router.navigate([`store/search`], {
      queryParams: { price_max, price_min },
      queryParamsHandling: 'merge',
    });
  }
}
