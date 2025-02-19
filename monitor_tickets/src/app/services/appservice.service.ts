import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppserviceService {

  private user : any;

  constructor() { }

  setUser(data: any) {
    this.user = data
  }

  getUser() {
    return this.user
  }
}
