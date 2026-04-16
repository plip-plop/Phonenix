import { Component, inject } from '@angular/core';
import { AuthStore } from './core/auth/auth.store';
import { Login } from './core/auth/login/login';
import { Header } from './layout/header/header';
import { TaskList } from './tasks/task-list/task-list';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [Header, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  // readonly #authStore = inject(AuthStore);
  // protected readonly isLoggedIn = this.#authStore.isLoggedIn;
}
