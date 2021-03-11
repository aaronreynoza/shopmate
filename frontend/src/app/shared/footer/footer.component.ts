import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { SearchServiceService } from 'src/app/services/search-service.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: [
  ]
})
export class FooterComponent implements OnInit {
categories = []
  constructor(private productService: ProductService, private router: Router, private searchService: SearchServiceService) { }

  ngOnInit(): void {
    this.getCategories();
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
  searchByCategory(item) {
    console.log(item);
    item.category= item.category_id;
    item.filter= null;
    item.keyword= '';
    item.type_search= 'category';
    this.searchService.setSearch(item);
    this.router.navigate([`/search`], {
      queryParams: { category: item.category },
    });
  }
}
