import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';
import { AlertController } from '@ionic/angular';
import { Post } from '../models/post.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(
    private storage: Storage,
    private alertController: AlertController
  ) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
    if (await this._storage.get('favorites') === null) {
      this._storage.set('favorites', []);
    }
  }

  public set(key: string, value: any) {
    this._storage.set(key, value);
  }

  public get(key: string): Promise<any> {
    return this._storage.get(key);
  }

  public forEach(callback: (value: any, key: string, iterationNumber: Number) => void) {
    this._storage.forEach(callback);
  }
  public remove(key: string) {
    this._storage.remove(key);
  }

  getItem(id: string) {
    return this.get('favorites').then((favorites) => {
      return favorites.find((item) => {
        if (item.imdbID === id) {
          return item;
        }
        else {
          return null;
        }
      });
    });
  }
}

