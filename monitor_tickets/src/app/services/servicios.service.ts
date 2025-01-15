import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  constructor(private httpClient: HttpClient) { }

  private barckendUrl = 'http://localhost:3000/';

  getTicket(): Observable<any> {
    return this.httpClient.get(`${this.barckendUrl}ticket`)
  }

  addMensaje(data:any){
    return this.httpClient.post(`${this.barckendUrl}addMensaje`, data);
  }

  getChat(): Observable<any>{
    return this.httpClient.get(`${this.barckendUrl}chat`)
  }

  getUsuario(data:any){
    return this.httpClient.post(`${this.barckendUrl}login`,data)
      .pipe(
        tap((res: any) => {
          localStorage.setItem('user', JSON.stringify(res));
        }
      )
    )
  }
}
