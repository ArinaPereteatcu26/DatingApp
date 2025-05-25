import { Component, OnInit, inject, OnDestroy, HostListener } from '@angular/core';
import {CommonModule, TitleCasePipe} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { Subscription } from 'rxjs';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive, TitleCasePipe],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  accountService = inject(AccountService);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  model = {
    username: '',
    password: ''
  };
  isMobileMenuOpen = false;
  dropdownOpen = false;



  // Close dropdown when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    // Close dropdown when clicking outside of it
    const dropdown = document.querySelector('.dropdown-container');
    if (this.dropdownOpen && dropdown && !dropdown.contains(event.target as Node)) {
      this.dropdownOpen = false;
    }
  }

  toggleDropdown(event: MouseEvent) {
    // Prevent the click from propagating to the document
    event.stopPropagation();
    this.dropdownOpen = !this.dropdownOpen;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  login() {
    this.accountService.login(this.model).subscribe({
      next: response => {
       void this.router.navigateByUrl('/members');
        this.isMobileMenuOpen = false;  // Close mobile menu after login
        this.resetForm();
      },
      error: error => this.toastr.error(error.error)
    });
  }

  logout() {
    this.accountService.logout();  // Use service method instead
    this.router.navigateByUrl('/');
    this.isMobileMenuOpen = false;  // Close mobile menu after logout
    this.dropdownOpen = false;     // Close dropdown after logout
  }

  private resetForm() {
    this.model = {
      username: '',
      password: ''
    };
  }
}
