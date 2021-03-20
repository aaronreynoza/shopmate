import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BillsService {

  constructor(private http: HttpClient) { }

  getBills(){
    return this.http.get(`${environment.API_URL}/requestList`)
  }
  changeStatusRequest(data){
    return this.http.post(`${environment.API_URL}/validation`,data)
  }
}
