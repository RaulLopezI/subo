import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  { path: 'home', loadChildren: () => import('./home/home.routes').then((m) => m.routes), },
  /*{
    path: 'register',
    loadComponent: () => import('./register/register.componentaaa'),
  },*/

];