import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  buyStock = {
    noOfStockUnits: null,
    totalAmount: null,
    remainingBalance: null
  };
  constructor() { }

  ngOnInit() {
  }
  buyStockModal() {
    $('#stockBuyModal').modal('show');
  }
}
