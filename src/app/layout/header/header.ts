import { Component, inject } from '@angular/core';
import { AuthStore } from '../../core/auth/auth.store';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  readonly #authStore = inject(AuthStore);
  
  protected readonly isLoggedIn = this.#authStore.isLoggedIn;
  protected readonly displayName = this.#authStore.displayName;

  protected logout(): void {
    this.#authStore.logout();
  }
}
