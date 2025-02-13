import { Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ServiciosService } from '../../services/servicios.service' 

@Component({
  selector: 'app-crear-ticket',
  // Se importan los modulos necesarios para el funcionamiento del formulario
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-ticket.component.html',
  styleUrl: './crear-ticket.component.css'
})
export class CrearTicketComponent {

  // Se inyecta el servicio (en servicios.services) para poder hacer uso de los metodos
  //  getUsersList() y createTicket()
  constructor(private service: ServiciosService) {}

  currentUser: any;
  users: any[] = []
  ticket = {
    subject: "",
    description: "",
    status: "",
    userId: "",
    specialistId: ""
  }

  // Obtiene el usuario actual y la lista de usuarios para asignar un especialista
  ngOnInit() {
    const user = localStorage.getItem('user')
    if (user) {
      this.currentUser = JSON.parse(user);
      this.service.getUsersList(this.currentUser.id).subscribe( res => {
        this.users = res;
        console.log(res)
      }, error => {
        console.log('Error al obtener usuarios: ', error)
      }
    )
    }
  }

  // Crea un ticket con los datos ingresados en el formulario
  createTicket() {
    this.ticket.status = "Abierto";
    this.ticket.userId = this.currentUser.id;
    if(this.isTicketValid()) {
      this.service.createTicket(this.ticket).subscribe(
        res => {
          console.log('Caso Creado ', res)
          alert('Caso creado con exito')
        }, err => {
          console.error("Error al crear caso: ", err);
        }
      )
    }
  }

  // Valida que los campos del ticket no esten vacios
  isTicketValid(): boolean {
    return Object.values(this.ticket).every(value => String(value).trim() !== "")
  }
}
