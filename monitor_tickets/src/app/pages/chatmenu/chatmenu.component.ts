import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ServiciosService } from '../../services/servicios.service'

import { ChatService } from '../../services/chat.service'

@Component({
  selector: 'app-chatmenu',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './chatmenu.component.html',
  styleUrl: './chatmenu.component.css'
})

export class ChatmenuComponent implements OnInit {

  mensajeInput: string = "";
  ticket_actual: any;
  chat: string[] = [];

  constructor(private servicio: ServiciosService, private render: Renderer2, private socket: ChatService) {
    this.socket.onMessage().subscribe((msg) => {
      this.chat.push(msg);
    });
  }

  ngOnInit(): void {

  }

  enviarMensaje() {
    if (this.mensajeInput.trim()) {
      this.socket.sendMessage(this.mensajeInput);
      this.mensajeInput = '';
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

  }
}
