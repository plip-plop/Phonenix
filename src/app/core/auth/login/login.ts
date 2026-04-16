import { Component, inject } from '@angular/core';
import { AuthStore } from '../auth.store';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  readonly #authStore = inject(AuthStore);

  protected readonly isLoading = this.#authStore.isLoading;
  protected readonly error = this.#authStore.error;
  protected email = '';
  protected password = '';

  protected onSubmit(): void {
    this.#authStore.login({ email: this.email, password: this.password });
  }
}
