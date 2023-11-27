import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LevelDto} from "../model/dto/LevelDto";
import {ApiResponse} from "../model/paginator";
import {CourseEnv} from "../environments/course";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LevelService {
  API_URL = `${CourseEnv.COURSE_URL}/api/v1/courses/level`;
  http: HttpClient = inject(HttpClient);
  COURSE_URL = environment.COURSE_URL;
  constructor() { }

  getAllLevels() {
    const URL = `${this.COURSE_URL}/api/v1/courses/level/all`;
    return this.http.get<ApiResponse<LevelDto[]>>(URL);
  }

}

