import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'pages',
    pathMatch: 'full',
  },
  // {
  //   path: 'home',
  //   loadChildren: () =>
  //     import('./home/home.module').then((m) => m.HomePageModule),
  // },
  // {
  //   path: 'divida',
  //   loadChildren: () =>
  //     import('./pages/divida/divida.module').then((m) => m.DividaPageModule),
  // },
  // {
  //   path: 'auth',
  //   loadChildren: () =>
  //     import('./auth/auth/auth.module').then((m) => m.AuthPageModule),
  // },
  {
    path: 'pages',
    loadChildren: () =>
      import('./pages/pages.module').then((m) => m.PagesPageModule),
  },
  // {
  //   path: 'modal',
  //   loadChildren: () =>
  //     import('./shared/components/modal.module').then((m) => m.ModalPageModule),
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
