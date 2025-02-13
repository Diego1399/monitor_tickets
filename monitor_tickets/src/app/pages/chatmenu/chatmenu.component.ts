import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, ActivatedRoute  } from '@angular/router';

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
  

  message = {
    text: "",
    ticket: "",
    user: ""
  };

  // Se inyecta el servicio (en servicios.services) para poder hacer uso de los metodos
  //  getTicket() y getChatList()
  constructor(
    private servicio: ServiciosService, 
    private render: Renderer2, 
    private socket: ChatService, 
    private router: ActivatedRoute 
  ) {
    
    /*
    this.socket.onMessage().subscribe((msg) => {
      this.chat.push(msg);
    });
    */

    // Se suscribe al evento onChat() del servicio ChatService
    this.socket.onChat().subscribe((obj) => {
      this.chat.push(obj.text);
    })
  }

  ngOnInit(): void {
    // Obtiene el ticket actual y la lista de mensajes del chat asociado al ticket actual
    this.router.queryParams.subscribe(params => {
      const ticketJson = params['ticket'];
      if (ticketJson) {
        this.ticket_actual = JSON.parse(ticketJson);
      }
    });

    // Obtiene el ID del ticket actual 
    let data = {data : this.ticket_actual.id}

    // Obtiene la lista de mensajes del chat asociado al ticket actual 
    // y los almacena en el arreglo chat para mostrarlos en la vista
    this.servicio.getChatList(data).subscribe(
      (res) => {
        console.log(res)
        let historial: string [] = [];
        res.forEach((e: { message: string; }) => {
          historial.push(e.message);
        });
        this.chat = historial
      }
    )
  }

  // Envia un mensaje al chat asociado al ticket actual
  enviarMensaje() {
    // Si el mensaje no esta vacio, se envia al chat
    if (this.mensajeInput.trim()) {
      // Se almacena el mensaje en el objeto message
      this.message.text = this.mensajeInput
      this.message.ticket = this.ticket_actual.id
      this.message.user = this.ticket_actual.user_id
      this.socket.sendChat(this.message)
      this.mensajeInput = '';

      //this.socket.sendMessage(this.mensajeInput);
    }
  }

  // Obtiene el ticket actual
  getTicket() {
    // Obtiene el ticket actual y lo almacena en la variable ticket_actual
    // Ademas, se cambia el color de fondo del estado del ticket segun su estado
    this.servicio.getTicket().subscribe(
      res => {
        let ticket = JSON.parse(JSON.stringify(res)); // Se convierte el objeto res a un objeto JSON
        this.ticket_actual = ticket;

        // Se obtiene el elemento spanEstado y se cambia su color de fondo segun el estado del ticket
        const estado = this.render.selectRootElement('#spanEstado', true);

        // Se cambia el color de fondo del estado del ticket segun su estado
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
