import {inject, Injectable} from '@angular/core';
import { userEnvironment } from '../environments/user';
import {HttpClient} from "@angular/common/http";
import {UserDto} from "../model/dto/UserDto";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  API_URL = userEnvironment.API_URL;

  http: HttpClient = inject(HttpClient);
  constructor() { }

  registerProfessor(professor: UserDto){
    return this.http.post(this.API_URL + 'api/v1/users/professors', professor);
  }

  registerStudent(student: UserDto){
    return this.http.post(this.API_URL + 'api/v1/users/students', student);
  }
  updateSubscription(userKcId: string){
    // @ts-ignore
    return this.http.put('http://localhost:8081/users/api/v1/users/student' + userKcId + '/subscription');
  }
}
