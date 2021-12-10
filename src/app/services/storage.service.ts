import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular'


@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(
    private storage: Storage
  ) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
    if (!this._storage.get('favorites')) {
      this._storage.set('favorites', []);
    }
  }

  // Create and expose methods that users of this service can
  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }

  public get(key: string): Promise<any> {
    return this.storage.get(key);
  }

  public forEach(callback: (value: any, key: string, iterationNumber: Number) => void) {
    this.storage.forEach(callback);
  }

}

