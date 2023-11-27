import {Component, inject, Inject, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {HomeComponent} from "../home/home.component";
import {KeycloakService} from "keycloak-angular";
import {AuthRepository} from "../../../store/authStore";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  items : MenuItem[] | undefined;
  activeItem: MenuItem | undefined;

  keycloakService: KeycloakService = inject(KeycloakService);
  authRepository: AuthRepository = inject(AuthRepository);
  auth$ = this.authRepository.auth$;
  authProps = this.authRepository.getCourseProps();
  router: Router = inject(Router);
  kcId = this.keycloakService.getKeycloakInstance().subject!;

  ngOnInit() {

    this.setAuthProps();

    this.auth$.subscribe((authProps) => {
      this.authProps = authProps;

    });
    this.items = [
      { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['/home'] },
      { label: 'Planes', icon: 'pi pi-fw pi-book', routerLink: ['/plans'] },

      { label: 'Cursos', icon: 'pi pi-fw pi-calendar', routerLink: ['/courses'],
        items: [
          {
            label: 'Crear',
            icon: 'pi pi-fw pi-plus',
            routerLink: ['/courses/create']
          },
          {
            label: 'Editar Perfil',
            icon: 'pi pi-fw pi-card',
            routerLink: ['/user-subscriptions']
          },
          this.authProps.isLogged ?
          {
            label: 'Mis Cursos',
            icon: 'pi pi-fw pi-calendar-plus',
            routerLink: [`/courses/student/${this.authProps.kcId}`]
          }:
            {}


        ]
      },
      { label: this.authProps.isLogged ? `${this.authProps.username}` : `Iniciar Sesión`
        , icon: 'pi pi-fw pi-user',  command: () => this.login()
      },
      this.authProps.isLogged ?
        { label: 'Cerrar Sesión', icon: 'pi pi-fw pi-user-minus',  command:() => this.logout()} :
        { label: 'Registrarse', icon: 'pi pi-fw pi-user-plus',  routerLink: ['register/student']
      }


    ];
    this.activeItem = this.items[0];
  }


  login() {
    this.keycloakService.login().then(r => console.log(r));
  }

  setAuthProps() {
    if(this.keycloakService.getKeycloakInstance().tokenParsed === undefined) return;
    this.authRepository.setAuthProps({
      token: this.keycloakService.getKeycloakInstance().token!,
      username: this.keycloakService.getKeycloakInstance().tokenParsed!['preferred_username']!,
      isLogged: true,
      kcId: this.keycloakService.getKeycloakInstance().subject!

    });
  }

  logout() {
    this.authRepository.logout();

    this.keycloakService.logout().then(r => console.log(r));

  }

}
