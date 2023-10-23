import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LevelDto} from "../model/dto/LevelDto";
import {ApiResponse} from "../model/paginator";
import {CourseEnv} from "../environments/course";

@Injectable({
  providedIn: 'root'
})
export class LevelService {
  API_URL = `${CourseEnv.COURSE_URL}/api/v1/courses/level`;
  http: HttpClient = inject(HttpClient);
  constructor() { }

  getAllLevels() {
    return this.http.get<ApiResponse<LevelDto[]>>(`${this.API_URL}/all`);
  }

}

