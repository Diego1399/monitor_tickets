import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { Ticket } from '../objetos/ticket'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  constructor(private httpClient: HttpClient) { }

  private barckendUrl = 'http://localhost:3000/';

  getTicket(): Observable<any> {
    return this.httpClient.get(`${this.barckendUrl}ticket`)
  }
}
