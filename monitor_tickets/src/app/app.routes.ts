import { Routes } from '@angular/router';
import {ChatmenuComponent} from './pages/chatmenu/chatmenu.component'
import { LoginComponent } from './pages/login/login.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component'
import { SidebarComponent } from './components/sidebar/sidebar.component'

export const routes: Routes = [
    {path:'', component: LoginComponent},
    {path: 'chatmenu', component: ChatmenuComponent},
    {path: 'home', component: HomeComponent}
];
