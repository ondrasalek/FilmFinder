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
  }

  // Create and expose methods that users of this service can
  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }

  public get(key: string) {
    return this.storage.get(key);
  }

  public forEach(callback: (value: any, key: string, iterationNumber: Number) => void) {
    this.storage.forEach(callback);
  }

  public clear() {
    this._storage?.clear();
    console.log('Storage cleared');
  }

  public remove(key: string) {
    this._storage?.remove(key);
  }

}

