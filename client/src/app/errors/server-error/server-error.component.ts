import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-server-error',
  imports: [
    NgIf
  ],
  templateUrl: './server-error.component.html',
  styleUrl: './server-error.component.css'
})
export class ServerErrorComponent {
error:any;
constructor(private router: Router){
  const navigation = this.router.getCurrentNavigation();
  this.error = navigation?.extras?.state?.['error'];

}
}
