import {inject, Injectable} from '@angular/core';
import {Environment} from "../environments/environment";
import {HttpClient} from "@angular/common/http";
import {UserDto} from "../model/dto/UserDto";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  API_URL = Environment.API_URL;

  http: HttpClient = inject(HttpClient);
  constructor() { }

  registerProfessor(professor: UserDto){
    return this.http.post(this.API_URL + 'users/api/v1/users/professors', professor);
  }
}
