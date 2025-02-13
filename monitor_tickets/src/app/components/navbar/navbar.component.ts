import { Component } from '@angular/core';
import { AppserviceService } from '../../services/appservice.service'


@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private appService: AppserviceService) {}

  user: any;

  ngOnInit() {
    this.user = this.appService.getUser();
  }
}
