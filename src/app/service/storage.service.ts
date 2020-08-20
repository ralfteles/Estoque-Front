import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
// import { ILogger } from "../../types/logger-type";
// import { LoggerService } from "../logger/logger.service";

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  public storage = window.localStorage;

  public setItem(key: string, item: any) {
    const value = JSON.stringify(item);
    this.storage.setItem(key, value);
  }
  public getItem(key: string): any {
    const value = JSON.parse(this.storage.getItem(key));
    return value ? value : null;
  }
  public getToken() {
    let token = JSON.parse(this.storage.getItem('usuario'));
    if(token == null)
        return null;
    
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token.accessToken,
    });

    return reqHeader;
  }

  public clear() {
    this.storage.clear();
  }
}
