import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiResponse} from "../model/paginator";
import {LanguageDto} from "../model/dto/LanguageDto";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  API_URL = 'http://localhost:7777/api/v1/courses';
  http: HttpClient = inject(HttpClient)
  constructor() { }

  getLanguages() {
    return this.http.get<ApiResponse<LanguageDto[]>>(`${this.API_URL}/language/all`);
  }
}
