import {Component, inject} from '@angular/core';
import {AuthRepository} from "../../../store/authStore";
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  authRepository: AuthRepository = inject(AuthRepository);
  keycloakService: KeycloakService = inject(KeycloakService);


  auth$ = this.authRepository.auth$;
  authProps = this.authRepository.getCourseProps();
  constructor() { }

  ngOnInit(){
    console.log(this.authProps);
    this.setPropsFromKeycloak();
  }

  setPropsFromKeycloak(){
    this.authRepository.setAuthProps({
      token: this.keycloakService.getKeycloakInstance().token!,
      username: this.keycloakService.getKeycloakInstance().tokenParsed!['preferred_username']!,
      isLogged: this.keycloakService.getKeycloakInstance().authenticated!
    });
  }

}
