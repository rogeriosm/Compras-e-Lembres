import { LocalStorageService } from './../../../core/service/localStorage/local-storage.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  IonItemSliding,
  ModalController,
  ToastController,
} from '@ionic/angular';

import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-sliding',
  templateUrl: './sliding.component.html',
  styleUrls: ['./sliding.component.scss'],
})
export class SlidingComponent implements OnInit {
  @Input() item: any = <any>{};
  @Input() item_key: string = '';
  @Input() sliding: IonItemSliding | undefined;
  @Output() saida = new EventEmitter<boolean>();

  constructor(
    private storageServe: LocalStorageService,
    private toastController: ToastController,
    private modalctrl: ModalController
  ) {}

  ngOnInit() {}

  async showToast(msg: string, validador: boolean = true) {
    if (validador) {
      this.toast(msg);
    } else {
      this.toast('Error');
    }
  }

  async toast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1000,
      position: 'bottom',
      cssClass: 'centerText',
    });
    toast.present();
  }

  onCheck() {
    if (this.sliding) {
      this.sliding.close();
    }
    this.item.checked = !this.item.checked;

    this.storageServe.checkItem(this.item, this.item_key).then((upCompra) => {
      if (this.item.checked) {
        this.showToast('Marcado');
      } else {
        this.showToast('Desmarcado');
      }
      this.loadCompras();
    });
  }

  updateItem() {
    if (this.sliding) {
      this.sliding.close();
    }

    this.showModal({ ...this.item }, this.item_key).then((upItem) => {
      if (upItem) {
        this.storageServe.updateObj(upItem, this.item_key).then((dados) => {
          // essa promise retorna todos os dados cadastrados atualizados
          this.showToast('Atualizado.');
          this.loadCompras();
        });
      } else {
        this.showToast('Cancelado.');
      }
    });
  }

  deletar() {
    if (this.sliding) {
      this.sliding.close();
    }
    this.storageServe.delete(this.item.id, this.item_key).then((items) => {
      this.item;
      this.showToast('Apagado.', items);
      this.loadCompras();
    });
  }

  loadCompras() {
    this.saida.emit(true);
    // this.storageServe
    //   .getAll(this.item_key)
    //   .then((items) => {
    //     return items.sort(function (a, b) {
    //       return a.mercado < b.mercado ? -1 : a.mercado > b.mercado ? 1 : 0;
    //     });
    //   })
    //   .then((upItems) => {
    //     this.showToast('lista atualizada');
    //     this.item = upItems;
    //   });
  }

  async showModal(item: any, titulo: string): Promise<any> {
    const modal = await this.modalctrl.create({
      component: ModalPage,
      cssClass: 'my-custom-modal-css',
      componentProps: {
        item,
        titulo,
      },
    });
    await modal.present();

    const { data, role } = await modal.onDidDismiss();

    if (role === 'confirm') {
      return data;
    } else {
      return data;
    }
  }
}
