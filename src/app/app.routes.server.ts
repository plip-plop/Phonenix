import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'dashboard/**',
    // ... on utilise le rendu à la demande côté serveur (SSR Pur).
    renderMode: RenderMode.Server,
  },
  // Règle N°2 : Pour tout le reste (login, register)...
  {
    path: '**',
    // ... on tente de pré-rendre les pages au moment du build (SSG).
    renderMode: RenderMode.Prerender,
  },
];
