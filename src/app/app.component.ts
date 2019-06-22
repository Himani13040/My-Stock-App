import { Component } from '@angular/core';
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
  showLoginModal() {
    $('#loginModal').modal('show');
  }
  showRegisterModal() {
    $('#registerModal').modal('show');
  }
}
