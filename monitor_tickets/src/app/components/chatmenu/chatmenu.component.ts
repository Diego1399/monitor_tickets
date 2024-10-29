import { Component, OnInit, Renderer2 } from '@angular/core';
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
  mensajeInput: string = "";
  ticket_actual: any;

  constructor(private servicio: ServiciosService, private render: Renderer2) { }

  ngOnInit(): void {
    /*
    this.getTicket();
    this.getChat();
    */
  }

  enviarMensaje() {
    if (this.mensajeInput != "") {

      const currentDate = new Date();

      let nuevoMensaje = new Mensaje("Diego", this.mensajeInput, currentDate.toISOString());

      this.chat.push(nuevoMensaje)

      this.servicio.addMensaje(this.chat).subscribe(
        res => {
          console.log('Se envio el mensaje')
        }
      )

      this.mensajeInput = "";
    }

  }


  getTicket() {
    this.servicio.getTicket().subscribe(
      res => {
        //console.log(res)
        let ticket = JSON.parse(JSON.stringify(res));
        this.ticket_actual = ticket;

        const estado = this.render.selectRootElement('#spanEstado', true);

        if (this.ticket_actual.status === 'Abierto') {
          estado?.classList.add('bg-warning')
        }
        else if (this.ticket_actual.status === 'En Progreso') {
          estado?.classList.add('bg-success')
        }
        else if (this.ticket_actual.status === 'Transferido') {
          estado?.classList.add('bg-danger')
        }
      }
    )
  }

  getChat() {
    this.servicio.getChat().subscribe(
      res => {
        console.log('Aquie esta el get chat')
        console.log(res)
      }
    )
  }
}
