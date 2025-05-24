import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import {AccountService} from './_services/account.service';


@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  http = inject(HttpClient);
  private accountSerice = inject(AccountService);
  title = 'DatingApp';
  users: any;


  ngOnInit(): void {
    this.getUsers();
    this.setCurrentUser();
  }
setCurrentUser(){
    const userString = localStorage.getItem('user');
    if(!userString) return;
    const user = JSON.parse(userString);
    this.accountSerice.currentUser.set(user);
}
  getUsers() {
    this.http.get('http://localhost:5055/api/users').subscribe({
      next: response => this.users = response,
      error: error => console.log(error),
      complete: () => console.log('Successfully')
    })
  }
}

