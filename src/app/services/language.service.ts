import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiResponse} from "../model/paginator";
import {LanguageDto} from "../model/dto/LanguageDto";
import {CourseEnv} from "../environments/course";
import {environment} from "../../environments/environment";



@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  API_URL = `${CourseEnv.COURSE_URL}/api/v1/courses`;
  COURSE_URL = environment.COURSE_URL;
  http: HttpClient = inject(HttpClient)
  constructor() { }

  getLanguages() {
    const URL = `${this.COURSE_URL}/api/v1/courses/languages/all`;
    return this.http.get<ApiResponse<LanguageDto[]>>(URL);
  }
}
