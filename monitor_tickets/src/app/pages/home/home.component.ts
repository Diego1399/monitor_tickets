import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Componentes
import { SidebarComponent } from '../../components/sidebar/sidebar.component'
import { NavbarComponent } from '../../components/navbar/navbar.component'

//Service
import { ChatService } from '../../services/chat.service'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  user: any;
  tickets: any[] = [];

  constructor( private socket: ChatService) {
    const user = localStorage.getItem('user');

    if (user) {
      this.user = JSON.parse(user);
      this.socket.getTickets(this.user.id).subscribe(
        (list) => {
          this.tickets = list;
          console.log('Tickets recibidos:', list)
        },
        (error) => {
          console.error('Error al obtener tickets: ', error)
        }
      )
    } else {
      console.error('No se puedo cargar la pagina')
    }
  }

  ngOnInit() {

  }
}
