import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { CookieService } from 'ngx-cookie-service';

declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My Stock App';
  signUpDetails = {
    name: null,
    email: null,
    phone: null,
    password: null
  };
  loginDetails = {
    email: null,
    password: null
  };
  registerRes;
  loginRes;
  token = null;
  loggedIn;
  constructor(private apiService: ApiService, private cookieService: CookieService) {
    const cookieValue = this.cookieService.get('token');
    if (cookieValue) {
      this.loggedIn = true;
    }
  }
  showLoginModal() {
    $('#loginModal').modal('show');
  }
  showRegisterModal() {
    $('#registerModal').modal('show');
  }
  registerUser() {
    this.apiService.addUser(this.signUpDetails).subscribe(
      data => {
        this.registerRes = data;
        this.token = this.registerRes.data.token;
        this.cookieService.set('token', this.token);
        this.loggedIn = true;
      },
      err => {
        console.error(err.error.error);
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: err.error.error.message,
        });
      },
      () => {
        console.log('successfully registered');
        $('#registerModal').modal('hide');
        Swal.fire({
          type: 'success',
          title: 'You have registered successfully!',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          window.location.reload();
        });
      }
    );
  }
  loginUser() {
    this.apiService.login(this.loginDetails).subscribe(
      data => {
        this.loginRes = data;
        this.token = this.loginRes.data.token;
        this.cookieService.set('token', this.token);
        this.loggedIn = true;
      },
      err => {
        console.error(err.error.error);
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: err.error.error.message,
        });
      },
      () => {
        console.log('successfully logged in', this.token);
        $('#loginModal').modal('hide');
        Swal.fire({
          type: 'success',
          title: 'You have logged in successfully',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          window.location.reload();
        });
      }
    );
  }
}
