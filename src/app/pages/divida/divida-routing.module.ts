import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DividaPage } from './divida.page';

const routes: Routes = [
  {
    path: '',
    component: DividaPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DividaPageRoutingModule {}
