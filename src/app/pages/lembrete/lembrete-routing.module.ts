import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LembretePage } from './lembrete.page';

const routes: Routes = [
  {
    path: '',
    component: LembretePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LembretePageRoutingModule {}
