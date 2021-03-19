import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get(`${environment.API_URL}/products`).pipe(
      map((res: any) =>
        res.map((item) => {
          item.id = item.id_producto;
          item.productName = item.nombre_prod;
          item.price = item.precio_venta;
          item.image = item.imagen;
          item.category = item.fk_id_categoria;
          item.provider = item.fk_id_proveedor;
          item.specifications = item.especificaciones;
          return item;
        })
      )
    );
  }
  getCategories() {
    return this.http.get(`${environment.API_URL}/categories`);
  }
  getProviders() {
    return this.http.get(`${environment.API_URL}/providers`);
  }

  createProduct(formData) {
    return this.http.post(`${environment.API_URL}/products`, formData);
  }
}
