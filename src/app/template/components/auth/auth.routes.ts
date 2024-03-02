import { Route } from '@angular/router';

export const AUTH_ROUTES: Route[] = [
  { path: 'login', loadChildren: () => import('./login/login.routes').then((m) => m.routes) },
  { path: 'registro', loadChildren: () => import('./registro/registro.routes').then((m) => m.routes) },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];