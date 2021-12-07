import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular'
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Create and expose methods that users of this service can
  public set(key: string, value: Post) {
    this._storage?.set(key, value);
    this.get(key).then(value => console.log(value));
  }

  public get(key: string) {
    return this._storage?.get(key);
  }

  public forEach(callback: (value: any, key: string) => void) {
    this._storage?.forEach(callback);
  }

  public clear() {
    this._storage?.clear();
  }

  public remove(key: string) {
    this._storage?.remove(key);
  }


}
