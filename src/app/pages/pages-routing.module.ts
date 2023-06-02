import { DividaPage } from './divida/divida.page';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesPage } from './pages.page';

const routes: Routes = [
  {
    path: '',
    component: PagesPage,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'lembretes',
      },
      {
        path: 'lembretes',
        loadChildren: () =>
          import('./lembrete/lembrete.module').then(
            (m) => m.LembretePageModule
          ),
      },
      {
        path: 'dividas',
        loadChildren: () =>
          import('./divida/divida.module').then((m) => m.DividaPageModule),
      },
      {
        path: 'compras',
        loadChildren: () =>
          import('./compras/compras.module').then((m) => m.ComprasPageModule),
      },
      {
        path: 'programacao',
        loadChildren: () =>
          import('./programacao/programacao.module').then(
            (m) => m.ProgramacaoPageModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesPageRoutingModule {}
