import { Routes } from '@angular/router';
import {ChatmenuComponent} from './pages/chatmenu/chatmenu.component'
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component'
import { MensajesComponent } from './pages/mensajes/mensajes.component'

export const routes: Routes = [
    {path:'', component: LoginComponent},
    {path: 'chatmenu', component: ChatmenuComponent},
    {path: 'home', component: HomeComponent},
    {path: 'dashboard-mensajes', component: MensajesComponent}
];
