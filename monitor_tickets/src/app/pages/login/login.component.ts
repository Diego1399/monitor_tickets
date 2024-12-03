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

  constructor(private router: Router, private servicio: ServiciosService) { }



  user = {
    username: "",
    password: "",
  }

  redirigir() {
    console.log(this.user)
    this.servicio.getUsuario(this.user).subscribe(res => {
      console.log(res)
      this.router.navigate(['home']);
    })

  }
}
