import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

declare var $: any;
@Component({
  selector: 'app-my-dashboard',
  templateUrl: './my-dashboard.component.html',
  styleUrls: ['./my-dashboard.component.css']
})
export class MyDashboardComponent implements OnInit {

  myBalance;
  dashboardData;
  addBalAmount = {
    amount: null
  };
  sellStockObj = {
    name: null,
    quantity: null,
  };
  sellRes;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getDashboardData();
    this.getBalance();
  }

  getDashboardData() {
    this.apiService.getDashboard().subscribe(
      data => { this.dashboardData = data; },
      err => console.error(err),
      () => console.log('done loading data')
    );
  }

  sellStockModal() {
    $('#stockSellModal').modal('show');
  }
  getBalance() {
    this.apiService.getBalance().subscribe(
      data => { this.myBalance = data; },
      err => console.error(err),
      () => console.log('done loading balance')
    );
  }

  addBalance() {
    this.apiService.addBalance(this.addBalAmount).subscribe(
      data => { },
      err => console.error(err),
      () => this.getBalance()
    );
  }

  sellStock() {
    this.apiService.sellStock(this.sellStockObj).subscribe(
      data => { this.sellRes = data; },
      err => console.error(err),
      () => console.log('Sold successfully')
    );
  }

}
