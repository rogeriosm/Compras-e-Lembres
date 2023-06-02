import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { ProgramacaoPageRoutingModule } from './programacao-routing.module';

import { ProgramacaoPage } from './programacao.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ProgramacaoPageRoutingModule
  ],
  declarations: [ProgramacaoPage]
})
export class ProgramacaoPageModule {}
