import { ModalPageModule } from 'src/app/shared/components/modal.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { ComprasPageRoutingModule } from './compras-routing.module';

import { ComprasPage } from './compras.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    ModalPageModule,
    ComprasPageRoutingModule,
  ],
  declarations: [ComprasPage],
})
export class ComprasPageModule {}
