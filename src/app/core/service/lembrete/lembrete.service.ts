// import { Lembrete } from './../../../shared/model/lembrete';
// import { Injectable } from '@angular/core';

// import { Storage } from '@ionic/storage-angular';
// import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

// @Injectable({
//   providedIn: 'root'
// })
// export class LembreteService {

//   private _storage: Storage | null = null;

//   constructor(private storage: Storage) {}

//   async init() {
//     // If using, define drivers here: await this.storage.defineDriver(/*...*/);
//     // await this.storage.defineDriver(CordovaSQLiteDriver);
//     // const storage = await this.storage.create();
//     // this._storage = storage;

//     if (this._storage != null) {
//       return;
//     }
//     await this.storage.defineDriver(CordovaSQLiteDriver);
//     const storage = await this.storage.create();
//     this._storage = storage;
//   }

//   // Create and expose methods that users of this service can
//   // call, for example:
//   // public async set(key: string, value: any): Promise<any>{
//   //   await this.init();
//   //   return await this._storage?.set(key, value);
//   // }

//   // public async set(key: string, value: any): Promise<any> {
//   //   this.init().then(() => {
//   //     return this._storage?.set(key, value);
//   //   });
//   // }

//   // public async get(key: string) {
//   //   this.init().then(() => {
//   //     this._storage?.get(key);
//   //   });
//   // }

//   // public async remove(key: string) {
//   //   return this.init().then(() => {
//   //     this._storage?.remove(key);
//   //   });
//   // }

//   // public async getAll() {
//   //   await this.init();
//   //   // const lista: any = [];
//   //   this.storage.forEach((value, key, index) => {
//   //     return value
//   //     // lista.push(value);
//   //   });
//   //   // return lista;
//   // }

//   // create
//   async addItem(lembrete: Lembrete, itemKey: string): Promise<any> {
//     if (lembrete) {
//       await this.init();
//       return this.storage.get(itemKey).then((lembretes: Lembrete[]) => {
//         if (lembretes) {
//           lembretes.push(lembrete);
//           return this.storage.set(itemKey, lembretes);
//         } else {
//           return this.storage.set(itemKey, [lembrete]);
//         }
//       });
//     }
//   }

//   // read
//   async getItems(itemKey: string): Promise<Lembrete[]> {
//     await this.init();
//     return this.storage.get(itemKey);
//   }

//   // update
//   async updateItem(lembrete: Lembrete, itemKey: string): Promise<any> {
//     await this.init();
//     return this.storage.get(itemKey).then((lembretes: Lembrete[]) => {
//       if (!lembretes || lembretes.length === 0) {
//         return null;
//       }

//       let newLembrete: Lembrete[] = [];

//       // atualizando array
//       for (let i of lembretes) {
//         if (i.id === lembrete.id) {
//           newLembrete.push(lembrete);
//         } else {
//           newLembrete.push(i);
//         }
//       }

//       return this.storage.set(itemKey, newLembrete);
//     });
//   }
//   // check
//   async checkLembrete(lembrete: Lembrete, itemKey: string): Promise<any> {
//     await this.init();
//     return this.storage.get(itemKey).then((lembretes: Lembrete[]) => {
//       if (!lembretes || lembretes.length === 0) {
//         return null;
//       }

//       let newLembrete: Lembrete[] = [];

//       // atualizando array
//       for (let i of lembretes) {
//         if (i.id === lembrete.id) {
//           newLembrete.push(lembrete);
//         } else {
//           newLembrete.push(i);
//         }
//       }

//       return this.storage.set(itemKey, newLembrete);
//     });
//   }
//   // delete
//   async deleteItem(id: number, itemKey: string): Promise<Lembrete> {
//     await this.init();
//     return this.storage.get(itemKey).then((Lembretes: Lembrete[]) => {
//       if (!Lembretes || Lembretes.length === 0) {
//         return null;
//       }

//       let toKeep: Lembrete[] = [];

//       for (let i of Lembretes) {
//         if (i.id !== id) {
//           toKeep.push(i);
//         }
//       }

//       return this.storage.set(itemKey, toKeep);
//     });
//   }
// }
