import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { PagesPageRoutingModule } from './pages-routing.module';

import { PagesPage } from './pages.page';

@NgModule({
  imports: [CommonModule, IonicModule, PagesPageRoutingModule],
  declarations: [PagesPage],
})
export class PagesPageModule {}
