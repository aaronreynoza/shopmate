import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }


  login(data){
    return this.http.post(`${environment.API_URL}/auth`, data);
  }

  register(data){
    return this.http.post(`${environment.API_URL}/registerClient`, data);
  }


}
