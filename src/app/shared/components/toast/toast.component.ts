import { Component, Input, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit {
  constructor(private toastController: ToastController) {}

  ngOnInit() {}

  @Input() mensage: string = '';

  async showToast(msg: string) {
    const toast = await this.toastController.create({
      message: this.mensage,
      duration: 1500,
      position: 'top',
      cssClass: 'centerText',
    });
    await toast.present();
  }
}
