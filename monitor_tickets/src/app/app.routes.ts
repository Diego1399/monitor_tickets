import { Routes } from '@angular/router';
import {ChatmenuComponent} from './components/chatmenu/chatmenu.component'
import { LoginComponent } from './pages/login/login.component';
import { AppComponent } from './app.component';
import { DetalleComponent } from './components/detalle/detalle.component'

export const routes: Routes = [
    {path:'', component: LoginComponent},
    {path:'login', component: LoginComponent},
    {path: 'chatmenu', component: ChatmenuComponent},
    {path: 'detalle', component: DetalleComponent}
];
