import { Component } from '@angular/core';
import { AppserviceService } from '../../services/appservice.service'
import { CommonModule } from '@angular/common';

// Componentes
import { SidebarComponent } from '../../components/sidebar/sidebar.component'
import { NavbarComponent } from '../../components/navbar/navbar.component'

//Service
import { ChatService } from '../../services/chat.service'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SidebarComponent, NavbarComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  user: any;
  tickets: any[] = [];

  constructor(private appservice: AppserviceService, private socket: ChatService) {
    this.user = this.appservice.getUser();
    console.log('usuario obtenido', this.user)

    console.log('LLamando a obtener tickets')
    this.socket.getTickets(this.user.id).subscribe(
      (list) => {
        this.tickets = list;
        console.log('Tickets recibidos:', list)
      },
      (error) => {
        console.error('Error al obtener tickets: ', error)
      }
    )
  }

  ngOnInit() {
    
  }
}
