import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { ServiciosService } from '../../services/servicios.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppserviceService } from '../../services/appservice.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

<<<<<<< HEAD

  constructor(private router: Router, private servicio: ServiciosService) { }


=======
  constructor(
    private router: Router, 
    private apiservice: ServiciosService, 
    private appservice: AppserviceService
  ) { }
>>>>>>> backend

  user = {
    username: "",
    password: "",
  }

  showError: boolean = false;

  redirigir() {

    this.apiservice.getUsuario(this.user).subscribe(res => {
      this.appservice.setUser(res)

      this.showError = false;

      this.router.navigate(['home']);
    }, err => {
      this.showError = true;
    })

  }
}
