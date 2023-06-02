import { ModalController, NavParams } from '@ionic/angular';
import { Component, OnInit, Input, Pipe } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  item: any = [];
  titulo: string = '';
  Object = Object;

  constructor(private modalCtrl: ModalController, public navParams: NavParams) {
    try {
      this.item = this.navParams.get('item');
      this.titulo = this.navParams.get('titulo');
    } catch (error) {
      console.log(error);
    }
  }

  formataData(data: string) {
    return new Date(data).toLocaleString('pt-br');
  }

  ngOnInit() {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.item, 'confirm');
  }
}
