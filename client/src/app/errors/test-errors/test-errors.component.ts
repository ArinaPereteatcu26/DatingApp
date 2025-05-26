import {Component, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-test-errors',
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './test-errors.component.html',
  styleUrl: './test-errors.component.css'
})
export class TestErrorsComponent {
  baseUrl = "http://localhost:5055/api/";
  private http = inject(HttpClient);
  validationErrors: string[] = [];

  get400Error() {
    this.http.get(this.baseUrl + 'buggy/bad-response').subscribe({
      next: response => console.log(response),
      error: error => console.log(error)
    })
  }

  get401Error() {
    this.http.get(this.baseUrl + 'buggy/auth').subscribe({
      next: response => console.log(response),
      error: error => console.log(error)
    })
  }

  get404Error() {
    this.http.get(this.baseUrl + 'buggy/not-found').subscribe({
      next: response => console.log(response),
      error: error => console.log(error)
    })
  }

  get500Error() {
    this.http.get(this.baseUrl + 'buggy/server-error').subscribe({
      next: response => console.log(response),
      error: error => console.log(error)
    })
  }

  get400ValidationError() {
    this.http.post(this.baseUrl + 'account/register', {}).subscribe({
      next: response => console.log(response),
      error: error => {
        console.log('Full error object:', error);
        console.log('Error.error:', error.error);
        console.log('Error.error.errors:', error.error?.errors);

        // Clear previous errors
        this.validationErrors = [];

        // Handle different possible error structures
        if (error.error?.errors) {
          // If errors is an object with field names as keys
          if (typeof error.error.errors === 'object' && !Array.isArray(error.error.errors)) {
            this.validationErrors = Object.values(error.error.errors).flat() as string[];
          }
          // If errors is already an array
          else if (Array.isArray(error.error.errors)) {
            this.validationErrors = error.error.errors;
          }
        }
        // Fallback: if there's a single error message
        else if (error.error?.message) {
          this.validationErrors = [error.error.message];
        }

        console.log('Processed validation errors:', this.validationErrors);
      }
    })
  }
}
