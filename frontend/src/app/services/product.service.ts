import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { categories } from '../models/categories.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getListProduct():Observable<any>{
    return this.http.get(`${environment.API_URL}/products`)
  }
  getProduct(product_id):Observable<any>{
    return this.http.get(`${environment.API_URL}/product/${product_id}`)
  }
  getCategories():Observable<any>{
    return this.http.get(`${environment.API_URL}/categories`, { headers:  {'Content-Type':'application/json'}})
  }

}
