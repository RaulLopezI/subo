import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: '',
    redirectTo: 'listado',
    pathMatch: 'full',
  },
  { path: 'home', loadChildren: () => import('./home/home.routes').then((m) => m.routes), },
  { path: 'listado', loadChildren: () => import('./listado/listado.routes').then((m) => m.routes), },


];