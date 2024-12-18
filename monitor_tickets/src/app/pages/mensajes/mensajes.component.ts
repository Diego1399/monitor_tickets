import { Component } from '@angular/core';

// Componentes
import { SidebarComponent } from '../../components/sidebar/sidebar.component'
import { NavbarComponent } from '../../components/navbar/navbar.component'

@Component({
  selector: 'app-mensajes',
  imports: [SidebarComponent, NavbarComponent],
  templateUrl: './mensajes.component.html',
  styleUrl: './mensajes.component.css'
})
export class MensajesComponent {

}
