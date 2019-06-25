import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { MyDashboardComponent } from './my-dashboard/my-dashboard.component';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiURL = 'http://134.209.158.128:1337';
  httpOptions: any;
  constructor(private http: HttpClient, private cookieService: CookieService) {
    const cookieValue = this.cookieService.get('token');
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        token: cookieValue
      })
    };
  }

  // send a POST request to the API to create a new user
  addUser(userDetails) {
    const body = JSON.stringify(userDetails);
    return this.http.post(this.apiURL + '/users/signup/', body, this.httpOptions);
  }

  // send a POST request to the API to login
  login(userDetails) {
    const body = JSON.stringify(userDetails);
    return this.http.post(this.apiURL + '/users/login/', body, this.httpOptions);
  }

  // send a GET request to fetch the portfolio of the user
  getDashboard() {
    return this.http.get(this.apiURL + '/dashboard/get', this.httpOptions);
  }

  // send a GET request to get account balance
  getBalance() {
    return this.http.get(this.apiURL + '/balance/get', this.httpOptions);
  }

  // send a POST request to add account balance
  addBalance(amount) {
    const body = JSON.stringify(amount);
    return this.http.post(this.apiURL + '/balance/add/', body, this.httpOptions);
  }

  // send a POST request to buy stock
  buyStock(buyObj) {
    const body = JSON.stringify(buyObj);
    return this.http.post(this.apiURL + '/dashboard/stocks/buy', body, this.httpOptions);
  }

  // send a POST request to buy stock
  sellStock(sellObj) {
    const body = JSON.stringify(sellObj);
    return this.http.post(this.apiURL + '/dashboard/stocks/sell', body, this.httpOptions);
  }

  // send a GET request to search a stock
  searchStock(searchText) {
    return this.http.get(this.apiURL + '/stocks/search?name=' + searchText, this.httpOptions);
  }
}
