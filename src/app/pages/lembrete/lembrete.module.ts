import { ToastComponent } from './../../shared/components/toast/toast.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LembretePageRoutingModule } from './lembrete-routing.module';

import { LembretePage } from './lembrete.page';
import { ModalPageModule } from 'src/app/shared/components/modal.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    LembretePageRoutingModule,
    ModalPageModule,
  ],
  declarations: [LembretePage],
})
export class LembretePageModule {}
