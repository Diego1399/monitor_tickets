import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';

// Componentes
import { SidebarComponent } from '../../components/sidebar/sidebar.component'
import { NavbarComponent } from '../../components/navbar/navbar.component'

//Service
import { ChatService } from '../../services/chat.service'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  user: any;
  tickets: any[] = [];

  aranda_ticket_id: any;

  constructor( private socket: ChatService) {}

  // Función para ir a crear ticket
  ngOnInit() {
    // Verificar si hay un usuario en el localstorage
    const user = localStorage.getItem('user');
    if (user) {
      this.user = JSON.parse(user);
      // Obtener tickets del usuario logueado
      this.socket.getTickets(this.user.id).subscribe(
        // Obtener tickets del usuario logueado
        (list) => {
          this.tickets = list;
          //console.log('Tickets recibidos:', list)
        },
        (error) => {
          console.error('Error al obtener tickets: ', error)
        }
      )
    } else {
      console.error('No se puedo cargar la pagina')
    }
  }

  getTicketJSON(ticket: any) {
    // convierte el objeto en string
    return JSON.stringify(ticket)
  }
}
