import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DividaPageRoutingModule } from './divida-routing.module';

import { DividaPage } from './divida.page';

// import { IonicStorageModule } from '@ionic/storage-angular';
// import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
// import { Drivers } from '@ionic/storage';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    DividaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [DividaPage],
})
export class DividaPageModule {}
