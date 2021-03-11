import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }


  login(formData){
    return this.http.post(``, formData);
  }

  register(formData){
return this.http.post(``, formData)
  }


}
