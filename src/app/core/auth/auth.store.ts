import { computed, inject, PLATFORM_ID } from '@angular/core';
import { pipe, switchMap, tap } from 'rxjs';
import { signalStore, withState, withComputed, withMethods, patchState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { AuthApiService, User } from './auth-api.service';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

function getInitialUser(): User | null {
  // Ce code est exécuté au démarrage. On ne peut pas encore utiliser l'injection.
  // On vérifie donc directement si `localStorage` existe dans le contexte global.
  if (typeof localStorage !== 'undefined') {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  }
  return null;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: getInitialUser(),
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

  withMethods(
    (
      store,
      authApi = inject(AuthApiService),
      router = inject(Router),
      platformId = inject(PLATFORM_ID),
    ) => ({
      // On définit un "effet" déclenché par l'appel de la méthode login
      login: rxMethod<{ email: string; password: string }>(
        pipe(
          tap(() => patchState(store, { isLoading: true, error: null })),
          switchMap(({ email, password }) =>
            authApi.login(email, password).pipe(
              tapResponse({
                next: ({ user }: { user: User }) => {
                  patchState(store, { user, isLoading: false });
                  if (isPlatformBrowser(platformId)) {
                    localStorage.setItem('user', JSON.stringify(user));
                  }
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

        if (isPlatformBrowser(platformId)) {
          localStorage.removeItem('user');
        }

        router.navigateByUrl('/login'); // <-- Redirection
      },
    }),
  ),
);
