import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { ServiciosService } from '../../services/servicios.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  // Constructor para inicializar el router y el servicio
  constructor(
    private router: Router, 
    private apiservice: ServiciosService
  ) { }

  user = {
    username: "",
    password: "",
  }

  showError: boolean = false;

  // Función para redirigir a la página de inicio
  redirigir() {
    this.apiservice.getUsuario(this.user).subscribe(res => {
      this.showError = false;
      this.router.navigate(['home']);
    }, err => {
      this.showError = true;

    })

  }
}
