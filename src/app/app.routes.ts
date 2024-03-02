import { Routes } from '@angular/router';
import { isAuthenticatedGuard } from './template/shared/guards/auth.guard';
import { LayoutComponent } from './template/layout/layout.component';
import { NotfoundComponent } from './template/components/notfound/notfound.component';

export const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      {
        path:'',
        canActivate: [isAuthenticatedGuard()],
        loadChildren: () => import('./template/components/pages/pages.routes').then((m) => m.routes),
      },
      //{ path: 'uikit', loadChildren: () => import('pages').then(m => m.UIkitModule) },
      //{ path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
      //{ path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) }
    ]
  },
  {
    path: 'auth',
    loadChildren: () => import('./template/components/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  { path: 'notfound', component: NotfoundComponent },
  { path: '**', redirectTo: '/notfound' }
];