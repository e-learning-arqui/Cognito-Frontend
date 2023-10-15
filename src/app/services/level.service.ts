import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LevelDto} from "../model/dto/LevelDto";
import {ApiResponse} from "../model/paginator";

@Injectable({
  providedIn: 'root'
})
export class LevelService {
  API_URL = 'http://localhost:7777/api/v1/courses/level';
  http: HttpClient = inject(HttpClient);
  constructor() { }

  getAllLevels() {
    return this.http.get<ApiResponse<LevelDto[]>>(`${this.API_URL}/all`);
  }

}

