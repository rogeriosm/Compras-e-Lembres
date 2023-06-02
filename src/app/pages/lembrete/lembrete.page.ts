import { LocalStorageService } from './../../core/service/localStorage/local-storage.service';
// import { ToastComponent } from './../../shared/components/toast/toast.component';
import { Lembrete } from './../../shared/model/lembrete';
import { Component, DoCheck, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';
// import { LembreteService } from '../../core/service/lembrete/lembrete.service';
import { Router } from '@angular/router';

// notificações
import {
  LocalNotifications,
  ScheduleOptions,
  ScheduleResult,
} from '@capacitor/local-notifications';

const ITEM_KEY = 'lembrete';
@Component({
  selector: 'app-lembrete',
  templateUrl: './lembrete.page.html',
  styleUrls: ['./lembrete.page.scss'],
})
export class LembretePage implements OnInit, DoCheck {
  showPicker = false;
  lembrete: Lembrete[] = [];
  newLembrete: Lembrete = <Lembrete>{};
  dataHoje = this.localToIsoString(new Date(Date.now()));
  Hoje = this.dataHoje;

  // notifications
  notifs: ScheduleResult | undefined;
  pendingNotifs: ScheduleResult | undefined;
  // dataNova = this.localToIsoString(new Date(Date.now()));

  constructor(
    private toastController: ToastController,
    protected alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    // private storageServe: LembreteService,
    private storageServe: LocalStorageService // private toastComponent: ToastComponent,
  ) {}

  dataAlterada(data: any) {
    this.dataHoje = data;
    this.showPicker = false;
  }

  async ngOnInit() {
    this.loadItems();
    // verifica se o app tem permisao de mostrar
    await LocalNotifications.checkPermissions().then((dados) => {
      if (dados.display !== 'granted') {
        this.presentAlert(
          'Permitir notificações.',
          'Você precisa dar acesso as notificações.'
        );
        LocalNotifications.requestPermissions();
      }
    });
  }

  loadItems() {
    this.storageServe.getAll(ITEM_KEY).then((lembretes) => {
      if (lembretes) {
        this.lembrete = lembretes.sort(function (a, b) {
          return a.data < b.data ? -1 : a.data > b.data ? 1 : 0;
        });
        return this.lembrete;
      } else {
        console.log('nao tem lembretes');
        return (this.lembrete = []);
      }
    });
  }

  hoje() {
    return JSON.stringify(Date.now());
  }

  ngDoCheck(): void {
    this.lembrete
      .sort(function (a, b) {
        return a.data < b.data ? -1 : a.data > b.data ? 1 : 0;
      })
      .sort((first, last) => Number(first.checked) - Number(last.checked));
  }

  protected cadastraLembrete: FormGroup = this.formBuilder.group({
    lembrete: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(255)],
    ],
    data: [this.dataHoje, [Validators.required]],
  });

  async addItems() {
    console.log(this.cadastraLembrete.value.data);

    this.newLembrete.id = Date.now();
    this.newLembrete.data = this.cadastraLembrete.value.data;
    this.newLembrete.lembrete = this.cadastraLembrete.value.lembrete;
    this.newLembrete.checked = false;
    this.storageServe.create(this.newLembrete, ITEM_KEY).then((lembrete) => {
      this.newLembrete = <Lembrete>{};
      this.showToast('Lembrete adicionado');
      this.loadItems();
      // this.cadastraLembrete.get('lembrete')?.reset();
      this.cadastraLembrete.controls['lembrete']?.reset();
    });
    // this.addlembrete();
  }

  async addlembrete() {
    this.schedule();
    // this.getPending();
    // this.cancelNotification();
  }
  async schedule() {
    let options: ScheduleOptions = {
      notifications: [
        {
          id: 3,
          title: 'Alerta de Lembrete.',
          body: this.cadastraLembrete.value.lembrete,
          iconColor: '#0000FF',
          schedule: {
            at: this.minhaData(),
            repeats: false,
            allowWhileIdle: true,
          },
        },
      ],
    };

    if (true) {
      await LocalNotifications.schedule(options).then((dados) => {
        this.presentAlert('Agenda', 'Lembrete salvo.');
      });
    }
  }
  minhaData(): Date {
    // pegando datas
    var time = new Date(this.cadastraLembrete.value.data);
    time.setSeconds(time.getSeconds() + 10);
    if (time.getTime() < new Date(Date.now()).getTime()) {
      // se o horario for inferior o alarme e setado para 10 segundos depois
      var timeDois: Date = new Date(Date.now());
      timeDois.setSeconds(timeDois.getSeconds() + 10);
      return timeDois;
    }
    return time;
  }

  async showToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1000,
      position: 'bottom',
      cssClass: 'centerText',
    });
    toast.present();
  }

  onRecebeDados(dados: boolean) {
    if (dados) {
      this.loadItems();
    }
  }

  async presentAlert(header: any, message: any) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  localToIsoString(date: Date): string {
    function pad(n: any) {
      return n < 10 ? '0' + n : n;
    }
    var localIsoString =
      date.getFullYear() +
      '-' +
      pad(date.getMonth() + 1) +
      '-' +
      pad(date.getDate()) +
      'T' +
      pad(date.getHours()) +
      ':' +
      pad(date.getMinutes()) +
      ':' +
      pad(date.getSeconds());
    if (date.getTimezoneOffset() == 0) {
      localIsoString += 'Z';
    }
    return localIsoString;
  }

  // onCheck(lembrete: Lembrete, slinding: IonItemSliding) {
  //   lembrete.checked = !lembrete.checked;
  //   slinding.close();

  //   this.storageServe.checkItem(lembrete, ITEM_KEY).then((item) => {
  //     if (lembrete.checked) {
  //       this.showToast('Marcado');
  //     } else {
  //       this.showToast('Desmarcado');
  //     }
  //     this.loadItems();
  //   });
  // }

  // updateItem(lembrete: Lembrete) {
  //   lembrete.lembrete = `UPDATED: ${lembrete.lembrete}`;
  //   // item.modified = Date.now();

  //   this.storageServe.updateObj(lembrete, ITEM_KEY).then((item) => {
  //     this.showToast('Item updated!');
  //     // this.mylist.closeSlidingItems();
  //     this.loadItems();
  //   });
  // }

  // deleteItem(lembrete: Lembrete) {
  //   this.storageServe.delete(lembrete.id, ITEM_KEY).then((lembrete) => {
  //     this.showToast('Item Removed!');
  //     // this.mylist.closeSlidingItems(); // fix or sliding is stuck afterwards
  //     this.loadItems(); //or splice it from  the array directly
  //   });
  // }

  // helper
  // async showToast(msg: string) {
  //   const toast = await this.toastController.create({
  //     message: msg,
  //     duration: 2000,
  //   });
  //   toast.present();
  // }

  // sair() {
  //   this.plt.backButton.subscribe(() => {
  //     if (this.router.isActive('/home', true)) {
  //       if (0 === 0) {
  //         this.toastController.info('click again to exit app');
  //         click_times++;
  //         setTimeout(() => {
  //           click_times--;
  //         }, 2000);
  //       } else {
  //         try {
  //           //expect to exit app, but first time is nothing happend, second time catch error
  //           navigator['app'].exipApp();
  //         } catch (e) {
  //           console.log(e);
  //         }
  //       }
  //     } else {
  //       this.goBackService.goBack();
  //     }
  //   });
  // }

  //   closeMeNow() {
  //     Ext.Msg.confirm("Close app?.", 'Close app', function (btn) {
  //       if (btn == 'yes') {
  //         navigator['app'].exitApp()
  //       }
  //     });
  // }

  ionViewDidEnter() {
    // this.subscription = this.platform.backButton.subscribe(() => {
    //   navigator();
    // });
  }

  ionViewWillLeave() {
    // this.subscription.unsubscribe();
  }

  // async addItems() {
  //   this.storageServe
  //     .set(JSON.stringify(Date.now()), this.cadastraLembrete.value)
  //     .then((lembrete) => {
  //       this.lembrete = [];
  //       this.showToast('Item added');
  //       this.loadItems();
  //     });

  // this.newItem.id = Date.now();
  // this.newItem.id = Date.now();

  // this.storageServe.addItem(this.newItem).then((item) => {
  //   this.newItem = <Item>{};
  // });
  // }

  // async loadItems() {
  //   this.storageServe.getAll().then((items: any) => {
  // this.showToast('Item loaded!');
  //     this.lembrete = items;
  //   });
  // }

  // updateItem(lembrete: Lembrete) {
  // item.title = `UPDATED: ${item.title}`;
  // item.modified = Date.now();

  // this.storageServe.updateItem(item).then((item) => {
  // this.showToast('Item updated!');
  //   // this.mylist.closeSlidingItems();
  //   this.loadItems();
  // });
  // }

  // deleteItem(lembrete: Lembrete) {
  //   this.storageServe.remove(lembrete.data).then((item) => {
  //this.mylist.closeSlidingItems(); // fix or sliding is stuck afterwards
  // this.loadItems(); //or splice it from  the array directly
  //     });
  //     this.showToast('Item Removed!');
  // }
}
