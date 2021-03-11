import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { categories } from '../models/categories.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products = {
    status: 200,
    data: [
      {
        id: 13,
        name: 'Acer Predator 5',
        price: 1200.0,
        category: 'Computer and Laptops',
        category_id: 1,
        images:
          'assets/img/product01.png,assets/img/product01.png,assets/img/product01.png,assets/img/product01.png',
        description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum incidunt reiciendis animi, omnis magnam iure consequatur facilis quia molestias similique quisquam in, culpa neque dolore aut nesciunt nemo suscipit debitis!
        Recusandae, illo omnis. Ipsum quas mollitia ratione repellat totam obcaecati ad, minima odio voluptas facere numquam culpa. Accusamus, ea. Eius nulla cumque, fuga corporis facere nostrum minima sint porro distinctio!
        Debitis assumenda voluptas architecto nostrum ab optio quis minima officia! Commodi voluptatum voluptas, ad provident praesentium, facilis magni quas mollitia qui fuga recusandae animi non, magnam nostrum nihil? Repudiandae, similique?`,
        tags:
          'pc, computer, laptop, pc gamer, laptop gamer, gaming pc, gaming laptop, pc gaming',
        discount: 15,
        specifications: {
          weight: '1.5 kg',
          dimensions: '35 mm x 27 mm',
          battery_duration: '5 h',
          screen_type: 'ips',
          screen_resolution: '1920 x 1080',
          refresh_rate: '144 hz',
          dolby_atmos: true,
          graphic_card: 'gtx 3080 super',
          ram_amount: '16 gb',
          maximum_ram_capacity: '64 gb',
          ram_slots: '4 slots',
          processor: 'Ryzen 7 5900x',
          processor_frequency: '4 hz',
          processor_boost: '5 hz',
          primary_disk_amount: '512 gb',
          primary_disk_type: 'SSD',
          secondary_disk_amount: '1 tb',
          secondary_disk_type: 'HDD',
          release_date: '2020-12-31',
        },
        ratings: [
          {
            rating_date: '2021-01-31',
            user_name: 'Sample User',
            comment: 'Good Product',
            starts: 5,
          },
          {
            rating_date: '2021-01-31',
            user_name: 'Sample User',
            comment: 'Good Product',
            starts: 5,
          },
        ],
      },
      {
        id: 11,
        name: 'Hp Omen 17',
        price: 1500.0,
        category: 'Computer and Laptops',
        category_id: 1,
        images:
          'assets/img/product01.png,assets/img/product01.png,assets/img/product01.png,assets/img/product01.png',
        description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum incidunt reiciendis animi, omnis magnam iure consequatur facilis quia molestias similique quisquam in, culpa neque dolore aut nesciunt nemo suscipit debitis!
        Recusandae, illo omnis. Ipsum quas mollitia ratione repellat totam obcaecati ad, minima odio voluptas facere numquam culpa. Accusamus, ea. Eius nulla cumque, fuga corporis facere nostrum minima sint porro distinctio!
        Debitis assumenda voluptas architecto nostrum ab optio quis minima officia! Commodi voluptatum voluptas, ad provident praesentium, facilis magni quas mollitia qui fuga recusandae animi non, magnam nostrum nihil? Repudiandae, similique?`,
        tags:
          'pc, computer, laptop, pc gamer, laptop gamer, gaming pc, gaming laptop, pc gaming',
        discount: 15,
        specifications: {
          weight: '1.5 kg',
          dimensions: '35 mm x 27 mm',
          battery_duration: '5 h',
          screen_type: 'ips',
          screen_resolution: '1920 x 1080',
          refresh_rate: '144 hz',
          dolby_atmos: true,
          graphic_card: 'gtx 3080 super',
          ram_amount: '16 gb',
          maximum_ram_capacity: '64 gb',
          ram_slots: '4 slots',
          processor: 'Ryzen 7 5900x',
          processor_frequency: '4 hz',
          processor_boost: '5 hz',
          primary_disk_amount: '512 gb',
          primary_disk_type: 'SSD',
          secondary_disk_amount: '1 tb',
          secondary_disk_type: 'HDD',
          release_date: '2020-12-31',
        },
        ratings: [
          {
            rating_date: '2021-01-31',
            user_name: 'Sample User',
            comment: 'Good Product',
            starts: 5,
          },
          {
            rating_date: '2021-01-31',
            user_name: 'Sample User',
            comment: 'Good Product',
            starts: 5,
          },
        ],
      },
      {
        id: 12,
        name: 'Hp Omen 15',
        price: 1500.0,
        category: 'Computer and Laptops',
        category_id: 1,
        images:
          'assets/img/product01.png,assets/img/product01.png,assets/img/product01.png,assets/img/product01.png',
        description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum incidunt reiciendis animi, omnis magnam iure consequatur facilis quia molestias similique quisquam in, culpa neque dolore aut nesciunt nemo suscipit debitis!
        Recusandae, illo omnis. Ipsum quas mollitia ratione repellat totam obcaecati ad, minima odio voluptas facere numquam culpa. Accusamus, ea. Eius nulla cumque, fuga corporis facere nostrum minima sint porro distinctio!
        Debitis assumenda voluptas architecto nostrum ab optio quis minima officia! Commodi voluptatum voluptas, ad provident praesentium, facilis magni quas mollitia qui fuga recusandae animi non, magnam nostrum nihil? Repudiandae, similique?`,
        tags:
          'pc, computer, laptop, pc gamer, laptop gamer, gaming pc, gaming laptop, pc gaming',
        discount: 15,
        specifications: {
          weight: '1.5 kg',
          dimensions: '35 mm x 27 mm',
          battery_duration: '5 h',
          screen_type: 'ips',
          screen_resolution: '1920 x 1080',
          refresh_rate: '144 hz',
          dolby_atmos: true,
          graphic_card: 'gtx 3080 super',
          ram_amount: '16 gb',
          maximum_ram_capacity: '64 gb',
          ram_slots: '4 slots',
          processor: 'Ryzen 7 5900x',
          processor_frequency: '4 hz',
          processor_boost: '5 hz',
          primary_disk_amount: '512 gb',
          primary_disk_type: 'SSD',
          secondary_disk_amount: '1 tb',
          secondary_disk_type: 'HDD',
          release_date: '2020-12-31',
        },
        ratings: [
          {
            rating_date: '2021-01-31',
            user_name: 'Sample User',
            comment: 'Good Product',
            starts: 5,
          },
          {
            rating_date: '2021-01-31',
            user_name: 'Sample User',
            comment: 'Good Product',
            starts: 5,
          },
        ],
      },
    ],
  };

  categoriesList = [
    {
      category_id: 1,
      name: 'Laptops',
      icon: 'fa fas-pc',
      active: 1,
      description: 'image',
    },
    {
      category_id: 2,
      name: 'Accesorios para Computadora',
      icon: 'fa fas-pc',
      active: 1,
      description: 'image',
    },
    {
      category_id: 3,
      name: 'Accesorios de Red',
      icon: 'fa fas-pc',
      active: 1,
      description: 'image',
    },
    {
      category_id: 4,
      name: 'Computadoras de Escritorio',
      icon: 'fa fas-pc',
      active: 1,
      description: 'image',
    },
  ];
  constructor(private http: HttpClient) {}

  getListProduct(): Observable<any> {
    // return of(this.products);
    return this.http.get(`${environment.API_URL}/products`).pipe(
      map((res: any) =>
        res.map((item) => {
          item.id = item.id_producto;
          item.name = item.nombre_prod;
          item.price = item.precio_venta;
          item.category = item.fk_id_categoria;
          item.product_image = item.imagen
          return item;
        })
      )
    );
  }
  getProduct(product_id): Observable<any> {
    // const product = this.products.data.find(item => item.id == product_id)
    // return of(product)
    return this.http.get(`${environment.API_URL}/product/${product_id}`).pipe(
      map((res: any) =>
        res.map((item) => {
          item.id = item.id_producto;
          item.name = item.nombre_prod;
          item.price = item.precio_venta;
          item.product_image = item.imagen;
          console.log(item);
          return item;
        })
      )
    );
  }
  getCategories(): Observable<any> {
    // return of(this.categoriesList);
    return this.http.get(`${environment.API_URL}/categories`, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
