import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor() {}

  user: any;

  ngOnInit() {
    // Verificar si hay un usuario en el localstorage
    const user = localStorage.getItem('user');
    if(user) {
      this.user = JSON.parse(user);
      console.log(`Esto es del localstorage ${this.user}`)
    }
  }

  // Función para ir a crear ticket
  crearTicket() {
    const url = `${window.location.origin}/ticket`;
    window.open(url, '_blank')
  }
}
