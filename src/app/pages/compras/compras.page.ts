import { Medida } from './../../shared/model/medidaEnum';
import { LocalStorageService } from './../../core/service/localStorage/local-storage.service';
import { ModalPage } from './../../shared/components/modal/modal.page';
// import { CompraService } from './../../core/service/compra/compra.service';
import {
  IonItemSliding,
  ModalController,
  Platform,
  ToastController,
} from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Compra } from 'src/app/shared/model/compra';

const ITEM_KEY = 'listaCompras';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.page.html',
  styleUrls: ['./compras.page.scss'],
})
export class ComprasPage implements OnInit {
  listaCompra: Array<Compra> = [];
  newCompra: Compra = <Compra>{};
  protected precoTotal: any = 0;

  constructor(
    private toastController: ToastController,
    private formBuilder: FormBuilder,
    private storageServe: LocalStorageService,
    private modalctrl: ModalController,
    private platform: Platform,
    private router: Router
  ) {
    this.loadCompras();
  }

  protected cadastraCompras: FormGroup = this.formBuilder.group({
    mercado: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
    ],
    produto: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
    ],
    quantidade: [
      '',
      [Validators.required, Validators.min(1), Validators.max(999)],
    ],
    medida: ['', [Validators.required]],
  });

  ngOnInit() {}

  ngDoCheck(): void {
    this.listaCompra
      .sort(function (a, b) {
        return a.mercado < b.mercado ? -1 : a.mercado > b.mercado ? 1 : 0;
      })
      .sort((first, last) => Number(first.checked) - Number(last.checked));
  }

  // tudo maiusculo
  upperCase(texto: string): string {
    return texto.toUpperCase();
  }

  loadCompras() {
    this.storageServe.getAll(ITEM_KEY).then((compras) => {
      this.precoTotal = 0;
      if (compras) {
        this.listaCompra = compras
          .sort(function (a, b) {
            return a.mercado < b.mercado ? -1 : a.mercado > b.mercado ? 1 : 0;
          })
          .map((compras) => {
            if (compras.medida === 'un') {
              this.precoTotal += +(compras.preco * compras.quantidade);
            } else {
              this.precoTotal += +compras.preco;
            }
            compras.preco = compras.preco;
            return compras;
          });
        this.precoTotal = this.precoTotal;
      } else {
        this.listaCompra = [];
        console.log('nao tem compras cadastradas');
      }
    });
  }

  // soma1() {
  //   this.storageServe.getAll(ITEM_KEY).then((compras) => {
  //     console.log(compras);
  //   });
  // }

  // soma(a: any, b: any) {
  //   return a.mercado < b.mercado ? -1 : a.mercado > b.mercado ? 1 : 0;
  // }

  async addCompra() {
    // achar uma maneira melhor de passar os valores

    this.newCompra.id = Date.now();
    this.newCompra.preco = 0.0;
    this.newCompra.mercado = this.cadastraCompras.value.mercado;
    this.newCompra.produto = this.cadastraCompras.value.produto;
    this.newCompra.quantidade = this.cadastraCompras.value.quantidade;
    this.newCompra.medida = this.cadastraCompras.value.medida;
    this.newCompra.checked = false;

    this.storageServe.create(this.newCompra, ITEM_KEY).then((lembrete) => {
      this.newCompra = <Compra>{};
      this.showToast('Produto adicionado');
      this.loadCompras();
      var controlNames = ['produto', 'quantidade'];

      controlNames.map((value: string) =>
        this.cadastraCompras.get(value)?.setValue(null)
      );
      // this.cadastraCompras.controls['produto']?.reset();
      // this.cadastraCompras.get('produto')?.reset();
      // this.cadastraCompras.reset({
      //   mercado: this.cadastraCompras.value.mercado,
      //   produto: null,
      //   quantidade: this.cadastraCompras.value.quantidade,
      //   medida: this.cadastraCompras.value.medida,
      // });
    });
  }

  adicionaPreco(compra: Compra) {
    const preco = { preco: compra.preco };

    this.showModal(preco).then((upItem) => {
      console.log(upItem);

      if (upItem) {
        compra.preco = +upItem.preco.toString().replace(',', '.');
        this.storageServe.updateObj(compra, ITEM_KEY).then((dados) => {
          // essa promise retorna todos os dados cadastrados atualizados
          this.showToast('Atualizado.');
          this.loadCompras();
        });
      } else {
        this.showToast('Cancelado.');
      }
    });
  }

  formataPreco(preco: number) {
    return preco.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  // helper
  async showToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1000,
      position: 'bottom',
      cssClass: 'centerText',
    });
    toast.present();
  }

  async showModal(item: any): Promise<any> {
    const modal = await this.modalctrl.create({
      component: ModalPage,
      cssClass: 'my-custom-modal-css',
      componentProps: {
        item,
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

  onRecebeDados(dados: boolean) {
    if (dados) {
      this.loadCompras();
    }
  }

  // onCheck(compra: Compra, slinding: IonItemSliding) {
  //   compra.checked = !compra.checked;
  //   slinding.close();

  //   this.storageServe.checkItem(compra, ITEM_KEY).then((upCompra) => {
  //     if (compra.checked) {
  //       this.showToast('Produto marcado');
  //     } else {
  //       this.showToast('Produto desmarcado');
  //     }
  //     this.loadCompras();
  //   });
  // }

  // updateCompra(compra: Compra, slinding: IonItemSliding) {
  //   slinding.close();
  //   this.showModal(compra).then((upCompra) => {
  //     if (upCompra) {
  //       compra.mercado = upCompra.mercado;
  //       compra.produto = upCompra.produto;
  //       compra.quantidade = upCompra.quantidade;
  //       compra.medida = upCompra.medida;

  //       this.storageServe.updateObj(compra, ITEM_KEY).then(() => {
  //         // essa promise retorna todos os dados cadastrados atualizados
  //         this.showToast('Produto atualizado.');
  //         this.loadCompras();
  //       });
  //     }
  //     this.showToast('Cancelado.');
  //   });
  // }

  // deleteCompra(compra: Compra, slinding: IonItemSliding) {
  //   slinding.close();
  //   this.storageServe.delete(compra.id, ITEM_KEY).then((compra) => {
  //     this.showToast('Produto apagado.');
  //     this.loadCompras();
  //   });
  // }

  // ==========================================================================================
  // async showModal(compra: Compra): Promise<Compra> {
  //   const modal = await this.modalctrl.create({
  //     component: ModalPage,
  //     cssClass: 'my-custom-modal-css',
  //     componentProps: {
  //       compra,
  //       // id: compra.id,
  //       // checked: compra.checked,
  //       // mercado: compra.mercado,
  //       // produto: compra.produto,
  //       // quantidade: compra.quantidade,
  //       // medida: compra.medida,
  //     },
  //   });
  //   await modal.present();

  //   const { data, role } = await modal.onDidDismiss();
  //   if (role === 'confirm') {
  //     return data;
  //   } else {
  //     return data;
  //   }
  // }
}
