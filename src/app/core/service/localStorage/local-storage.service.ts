import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {}

  async init() {
    if (this._storage != null) {
      return;
    }
    await this.storage.defineDriver(CordovaSQLiteDriver);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // create
  async create(item: Object, itemKey: string): Promise<any> {
    if (item) {
      return this.getAll(itemKey).then((items: any[]) => {
        if (items) {
          items.push(item);
          return this.storage.set(itemKey, items);
        } else {
          return this.storage.set(itemKey, [item]);
        }
      });
    }
  }

  // read
  async getAll(itemKey: string): Promise<any[]> {
    await this.init();
    return this.storage.get(itemKey).then((items: any) => {
      if (!items || items.length === 0) {
        return null;
      }
      return items;
    });
  }

  // update
  async updateObj(item: any, itemKey: string): Promise<any> {
    return this.getAll(itemKey).then((items: any[]) => {
      if (items) {
        let newItem: Object[] = [];
        // atualizando array
        for (let i of items) {
          if (i.id === item.id) {
            newItem.push(item);
          } else {
            newItem.push(i);
          }
        }
        return this.storage.set(itemKey, newItem);
      } else {
        return null;
      }
    });
  }

  // check
  async checkItem(item: any, itemKey: string): Promise<any> {
    return this.getAll(itemKey).then((items: any[]) => {
      if (items) {
        let newItem: any[] = [];

        // atualizando array
        for (let i of items) {
          if (i.id === item.id) {
            newItem.push(item);
          } else {
            newItem.push(i);
          }
        }
        return this.storage.set(itemKey, newItem);
      } else {
        return null;
      }
    });
  }

  // delete
  async delete(id: number, itemKey: string): Promise<any> {
    return this.getAll(itemKey).then((items: any[]) => {
      if (items) {
        let toKeep: any[] = [];

        // verifica se o item ja foi apagado e enserra o delete
        const result = items.find((item) => item.id === id);
        if (!result) {
          return null;
        }

        for (let i of items) {
          if (i.id !== id) {
            toKeep.push(i);
          }
        }

        return this.storage.set(itemKey, toKeep);
      } else {
        return null;
      }
    });
  }
}
