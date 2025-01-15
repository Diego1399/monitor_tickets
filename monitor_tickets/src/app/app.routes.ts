import { Routes } from '@angular/router';
import {ChatmenuComponent} from './pages/chatmenu/chatmenu.component'
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component'
import { MensajesComponent } from './pages/mensajes/mensajes.component'
import { CrearTicketComponent } from './pages/crear-ticket/crear-ticket.component'

export const routes: Routes = [
    {path:'', component: LoginComponent},
    {path: 'chatmenu', component: ChatmenuComponent},
    {path: 'home', component: HomeComponent},
    {path: 'dashboard-mensajes', component: MensajesComponent},
    {path: 'ticket', component: CrearTicketComponent}
];
