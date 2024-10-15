import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';

import { Mensaje } from '../../objetos/mensaje'
import { Ticket } from '../../objetos/ticket'

import { ServiciosService } from '../../services/servicios.service'

@Component({
  selector: 'app-chatmenu',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './chatmenu.component.html',
  styleUrl: './chatmenu.component.css'
})

export class ChatmenuComponent implements OnInit {

  chat: Mensaje[] = [];
  nuevoMensaje: string = "";
  ticket_actual: any;

  constructor(private servicio: ServiciosService) {}

  ngOnInit(): void {
    this.getTicket()
    console.log(this.ticket_actual)
  }

  enviarMensaje() {
    if (this.nuevoMensaje != "") {
      const currentDate = new Date();
      
      this.chat.push(new Mensaje("Diego", this.nuevoMensaje, currentDate.toISOString()))
      
      this.nuevoMensaje = "";
    } 

  }

  

  getTicket() {
    this.servicio.getTicket().subscribe(
      res => {
        //console.log(res)
        let ticket = JSON.parse(JSON.stringify(res));
        this.ticket_actual = ticket;

      }
    )
  }

}
