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

  addMensaje(data: any) {
    return this.httpClient.post(`${this.barckendUrl}addMensaje`, data);
  }

  getChat(): Observable<any> {
    return this.httpClient.get(`${this.barckendUrl}chat`)
  }

  getUsuario(data: any) {
    // Realiza una solicitud HTTP POST al endpoint de login con los datos proporcionados
    return this.httpClient.post(`${this.barckendUrl}login`, data)
      .pipe(
        // Utiliza el operador tap para realizar una acción secundaria con la respuesta
        tap((res: any) => {
          // Guarda la respuesta en el almacenamiento local del navegador bajo la clave 'user'
          localStorage.setItem('user', JSON.stringify(res));
        })
      );
  }

  getUsersList(data: any): Observable<any> {
    return this.httpClient.get(`${this.barckendUrl}UsersList/${data}`)
  }

  createTicket(data: any) {
    return this.httpClient.post(`${this.barckendUrl}createTicket`, data)
  }

  getChatList(data: any): Observable<any> {
    return this.httpClient.post(`${this.barckendUrl}historialChat`, data)
  }
}
