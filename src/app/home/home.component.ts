import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  buyStockObj = {
    name: null,
    quantity: null
  };
  stockRes;
  searchRes = null;
  buyRes;
  searchText = '';
  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }
  buyStockModal() {
    $('#stockBuyModal').modal('show');
  }
  buyStock() {
    this.apiService.buyStock(this.buyStockObj).subscribe(
      data => { this.buyRes = data; },
      err => {
        console.error(err);
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'Unauthorized! Please sign in',
        });
        $('#stockBuyModal').modal('hide');
      },
      () => {
        console.log('Bought successfully');
        $('#stockBuyModal').modal('hide');
      }
    );
  }
  searchStock() {
    this.searchRes = null;
    this.apiService.searchStock(this.searchText).subscribe(
      data => {
        this.stockRes = data;
        this.searchRes = this.stockRes.data;
      },
      err => {
        console.error(err);
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: err.error.error.message,
        });
      },
      () => console.log('Search successful')
    );
  }
}
