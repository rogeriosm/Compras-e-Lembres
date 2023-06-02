import { SlidingComponent } from './sliding/sliding.component';
import { ToastComponent } from './toast/toast.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalPage } from './modal/modal.page';
import { ModalValorComponent } from './modal-valor/modal-valor.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [
    ModalPage,
    ModalValorComponent,
    ToastComponent,
    SlidingComponent,
  ],
  exports: [ToastComponent, SlidingComponent],
})
export class ModalPageModule {}
