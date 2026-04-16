import { computed, inject } from '@angular/core';
import { pipe, switchMap, tap } from 'rxjs';
import { signalStore, withState, withComputed, withMethods, patchState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { AuthApiService, User } from './auth-api.service';
import { Router } from '@angular/router';
export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}
const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};
export const AuthStore = signalStore(
  { providedIn: 'root' }, // Store global
  withState(initialState), // Etat initial

  withComputed(({ user }) => ({
    isLoggedIn: computed(() => user() !== null),
    displayName: computed(() => user()?.firstName ?? 'Invité'),
  })),

  withMethods((store, authApi = inject(AuthApiService), router = inject(Router)) => ({
    // On définit un "effet" déclenché par l'appel de la méthode login
    login: rxMethod<{ email: string; password: string }>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap(({ email, password }) =>
          authApi.login(email, password).pipe(
            tapResponse({
              next: ({ user }: { user: User }) => {
                patchState(store, { user, isLoading: false });
                router.navigateByUrl('/dashboard'); // <-- Redirection
              },
              error: (err: Error) => patchState(store, { error: err.message, isLoading: false }),
            }),
          ),
        ),
      ),
    ),
    logout(): void {
      patchState(store, initialState);
      router.navigateByUrl('/login'); // <-- Redirection
    },
  })),
);
