import {Injectable} from '@angular/core';
import {Storage} from "@ionic/storage-angular";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  private async init() {
    this._storage = await this.storage.create();
  }

  set(key: string, value: any) {
    this._storage?.set(key, value);
  }

  get(key: string) : Promise<any> {
    return this._storage?.get(key)
  }

}
