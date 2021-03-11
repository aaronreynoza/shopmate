import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SearchServiceService {
  private searchSource = new BehaviorSubject(null);
  searchSubscriber = this.searchSource.asObservable();

  constructor(private http: HttpClient) {}
  setSearch(data) {
    console.log('palbaras de busqueda', data);
    this.searchSource.next(data);
  }
  getSearch() {}

  getProducts(data: any) {
    return this.http.post(`${environment.API_URL}/search`, data).pipe(
      map((res: any) =>
        res.map((item) => {
          item.id = item.id_producto;
          item.name = item.nombre_prod;
          item.price = item.precio_venta;
          item.category = item.nombre_categoria;
          item.product_image = item.imagen;
          return item;
        })
      )
    );
  }
}
