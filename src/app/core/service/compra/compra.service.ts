// import { Compra } from './../../../shared/model/compra';
// import { Injectable } from '@angular/core';

// import { Storage } from '@ionic/storage-angular';
// import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

// @Injectable({
//   providedIn: 'root',
// })
// export class CompraService {
//   private _storage: Storage | null = null;

//   constructor(private storage: Storage) {}

//   async init() {
//     if (this._storage != null) {
//       return;
//     }
//     await this.storage.defineDriver(CordovaSQLiteDriver);
//     const storage = await this.storage.create();
//     this._storage = storage;
//   }

//   // create
//   async addCompra(compra: Compra, itemKey: string): Promise<any> {
//     if (compra) {
//       await this.init();
//       return this.storage.get(itemKey).then((compras: Compra[]) => {
//         if (compras) {
//           compras.push(compra);
//           return this.storage.set(itemKey, compras);
//         } else {
//           return this.storage.set(itemKey, [compra]);
//         }
//       });
//     }
//   }

//   // read
//   async getCompras(itemKey: string): Promise<Compra[]> {
//     await this.init();
//     return this.storage.get(itemKey);
//   }

//   // update
//   async updateCompra(compra: Compra, itemKey: string): Promise<any> {
//     await this.init();

//     return this.storage.get(itemKey).then((compras: Compra[]) => {
//       if (!compras || compras.length === 0) {
//         return null;
//       }

//       let newCompra: Compra[] = [];

//       // atualizando array
//       for (let i of compras) {
//         if (i.id === compra.id) {
//           newCompra.push(compra);
//         } else {
//           newCompra.push(i);
//         }
//       }

//       return this.storage.set(itemKey, newCompra);
//     });
//   }

//   // update
//   async adicionaValor(compra: Compra, itemKey: string): Promise<any> {
//     await this.init();

//     return this.storage.get(itemKey).then((compras: Compra[]) => {
//       if (!compras || compras.length === 0) {
//         return null;
//       }

//       let newCompra: Compra[] = [];

//       // atualizando array
//       for (let i of compras) {
//         if (i.id === compra.id) {
//           newCompra.push(compra);
//         } else {
//           newCompra.push(i);
//         }
//       }

//       return this.storage.set(itemKey, newCompra);
//     });
//   }

//   // check
//   async checkCompra(compra: Compra, itemKey: string): Promise<any> {
//     await this.init();
//     return this.storage.get(itemKey).then((compras: Compra[]) => {
//       if (!compras || compras.length === 0) {
//         return null;
//       }

//       let newCompra: Compra[] = [];

//       // atualizando array
//       for (let i of compras) {
//         if (i.id === compra.id) {
//           newCompra.push(compra);
//         } else {
//           newCompra.push(i);
//         }
//       }

//       return this.storage.set(itemKey, newCompra);
//     });
//   }

//   // delete
//   async deleteCompra(id: number, itemKey: string): Promise<Compra> {
//     await this.init();
//     return this.storage.get(itemKey).then((compras: Compra[]) => {
//       if (!compras || compras.length === 0) {
//         return null;
//       }

//       let toKeep: Compra[] = [];

//       for (let i of compras) {
//         if (i.id !== id) {
//           toKeep.push(i);
//         }
//       }

//       return this.storage.set(itemKey, toKeep);
//     });
//   }
// }
