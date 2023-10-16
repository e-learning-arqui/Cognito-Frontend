import {Component, inject, Inject, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {HomeComponent} from "../home/home.component";
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  items : MenuItem[] | undefined;
  activeItem: MenuItem | undefined;

  keycloakService: KeycloakService = inject(KeycloakService);

  ngOnInit() {
    this.items = [
      { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['/home'] },
      { label: 'Cursos', icon: 'pi pi-fw pi-calendar', routerLink: ['/courses'],
        items: [
          {
            label: 'Crear',
            icon: 'pi pi-fw pi-plus',
            routerLink: ['/courses/create']
          },
    ]
        },
      { label: 'Iniciar sesión', icon: 'pi pi-fw pi-user',  command: () => this.login()  },
      { label: 'Registrarse', icon: 'pi pi-fw pi-user-plus',  routerLink: ['register']}

    ];
    this.activeItem = this.items[0];
  }


  login() {
    this.keycloakService.login();
    console.log("login");
  }

}
