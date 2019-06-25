import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import Swal from 'sweetalert2';

declare var $: any;
@Component({
  selector: 'app-my-dashboard',
  templateUrl: './my-dashboard.component.html',
  styleUrls: ['./my-dashboard.component.css']
})
export class MyDashboardComponent implements OnInit {

  myBalance;
  balanceRes;
  dashboardData;
  dashboardDataToDisplay;
  aggregatedDashboardData;
  showCurrentStockTable = false;
  showStockHistTable = false;
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
    this.showCurrentStockTable = false;
    this.showStockHistTable = false;
    this.apiService.getDashboard().subscribe(
      data => {
        this.dashboardData = data;
        this.dashboardDataToDisplay = this.dashboardData.data.totalData;
        this.aggregatedDashboardData = this.dashboardData.data.aggregatedData;
        if (this.dashboardDataToDisplay.length !== 0) {
          this.showStockHistTable = true;
        }
        if (this.aggregatedDashboardData.length !== 0) {
          this.showCurrentStockTable = true;
        }
      },
      err => {
        console.error(err.error.error);
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: err.error.error.message,
        });
      },
      () => console.log('done loading data')
    );
  }

  sellStockModal(index) {
    this.sellStockObj.name = this.aggregatedDashboardData[index].name;
    $('#stockSellModal').modal('show');
  }
  getBalance() {
    this.apiService.getBalance().subscribe(
      data => {
        this.balanceRes = data;
        this.myBalance = this.balanceRes.data.balance;
      },
      err => {
        console.error(err.error.error);
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: err.error.error.message,
        });
      },
      () => console.log('done loading balance')
    );
  }

  addBalance() {
    this.apiService.addBalance(this.addBalAmount).subscribe(
      data => { },
      err => {
        console.error(err.error.error);
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: err.error.error.message,
        });
      },
      () => {
        this.addBalAmount.amount = null;
        this.getBalance();
        Swal.fire({
          type: 'success',
          title: 'Successfully added balance',
          showConfirmButton: false,
          timer: 1500
        });
      }
    );
  }

  sellStock() {
    this.apiService.sellStock(this.sellStockObj).subscribe(
      data => { this.sellRes = data; },
      err => {
        console.error(err.error.error);
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: err.error.error.message,
        });
      },
      () => {
        console.log('Sold successfully');
        Swal.fire({
          type: 'success',
          title: 'Sold successfully',
          showConfirmButton: false,
          timer: 1500
        });
        this.sellStockObj.name = null;
        this.sellStockObj.quantity = null;
        this.getBalance();
        this.getDashboardData();
        $('#stockSellModal').modal('hide');

      }
    );
  }

}
