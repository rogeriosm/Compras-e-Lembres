import { Component } from '@angular/core';
import { App } from '@capacitor/app';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {
  protected lastTimeBackPress: number = 0;
  protected timePeriodToExit: number = 2200;

  constructor(public toastCtrl: ToastController) {
    App.addListener('backButton', () => {
      if (
        new Date().getTime() - this.lastTimeBackPress <
        this.timePeriodToExit
      ) {
        App.exitApp();
      } else {
        this.presentToast();
        this.lastTimeBackPress = new Date().getTime();
      }
    });
  }
  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Aperte Novamente para sair',
      duration: 2000,
      position: 'middle',
      cssClass: 'ion-text-center',
      translucent: true,
      color: 'light',
    });

    await toast.present();
  }
}

//back button handle
//Registration of push in Android and Windows Phone
// let lastTimeBackPress: number = 0;
// let timePeriodToExit: number = 2000;

// platform.registerBackButtonAction(() => {

//     //Double check to exit app
//     if (new Date().getTime() - lastTimeBackPress < timePeriodToExit) {
//         //this.platform.exitApp(); //Exit from app

//         this.appMinimize.minimize().then(() => {
//             console.log('minimized successfully');
//         });
//     } else {

//         this.toastCtrl.create({
//             message: this.translate.instant('EXIT_APP_MESSAGE'),
//             duration: 3000,
//             position: 'bottom'
//         }).present();

//         lastTimeBackPress = new Date().getTime();
//     }
// });

// https://ionicframework.com/docs/developing/hardware-back-button
// site que fala sobre sair do app ionic capacitor
