import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  set(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  get(key: string): string {
    return localStorage.getItem(key)
  }

  clear(): void {
    localStorage.clear()
  }

}
