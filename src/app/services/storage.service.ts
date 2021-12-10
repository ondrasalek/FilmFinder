import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular'

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;
  list = [];

  constructor(
    private storage: Storage,
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

}

