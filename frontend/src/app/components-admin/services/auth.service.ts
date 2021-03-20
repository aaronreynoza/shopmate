import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(data) {
    return this.http.post(`${environment.API_URL}/auth`, data);
  }
  setCurrentUser(data) {
    localStorage.setItem('currentUserAdmin', JSON.stringify(data));
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUserAdmin')) || {};
  }
  logOut() {
    localStorage.removeItem('currentUserAdmin');
  }
}
