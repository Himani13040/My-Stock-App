import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { MyDashboardComponent } from './my-dashboard/my-dashboard.component';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiURL = 'http://134.209.158.128:1337';

  constructor(private http: HttpClient) { }

  // send a POST request to the API to create a new user
  addUser(userDetails) {
    const body = JSON.stringify(userDetails);
    return this.http.post(this.apiURL + '/users/signup/', body, httpOptions);
  }

  // send a POST request to the API to login
  login(userDetails) {
    const body = JSON.stringify(userDetails);
    return this.http.post(this.apiURL + '/users/login/', body, httpOptions);
  }

  // API to fetching the portfolio of the user
  getDashboard() {
    return this.http.get(this.apiURL + '/dashboard/get', httpOptions);
  }

  getBalance() {
    return this.http.get(this.apiURL + '/balance/get', httpOptions);
  }

  addBalance(amount) {
    const body = JSON.stringify(amount);
    return this.http.post(this.apiURL + '/balance/add/', body, httpOptions);
  }

  buyStock(buyObj) {
    const body = JSON.stringify(buyObj);
    return this.http.post(this.apiURL + '/dashboard/stocks/buy', body, httpOptions);
  }

  sellStock(sellObj) {
    const body = JSON.stringify(sellObj);
    return this.http.post(this.apiURL + '/dashboard/stocks/sell', body, httpOptions);
  }

  searchStock(searchText) {
    return this.http.get(this.apiURL + '/stocks/search?name=' + searchText, httpOptions);
  }
}
