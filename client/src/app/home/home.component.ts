import {Component, inject, OnInit} from '@angular/core';
import {RegisterComponent} from '../register/register.component';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-home',
  imports: [
    RegisterComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  http=inject(HttpClient);
  registerMode=false;
  users:any;

ngOnInit():void {
  this.getUsers();

}

registerToggle(){
  this.registerMode=!this.registerMode;
}
  getUsers() {
    this.http.get('http://localhost:5055/api/users').subscribe({
      next: response => this.users = response,
      error: error => console.log(error),
      complete: () => console.log('Successfully')
    })
  }

  cancelRegisterMode(event: boolean) {
    this.registerMode=event;
  }
}
