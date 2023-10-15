import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CourseRepository} from "../store/coursesStore";
import {Environment} from "../environments/environment";
import {Paginator, ApiResponse} from "../model/paginator";
import {Course} from "../model/Course";
import {tap} from "rxjs";
import {CourseDto} from "../model/dto/CourseDto";

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private API_URL = 'http://localhost:7777/';
  private http: HttpClient = inject(HttpClient)
  private coursesRepo = inject(CourseRepository);

  constructor() { }

  getCourses(page: number, size: number) {
    return this.http.get<ApiResponse<Paginator<Course>>>(`${this.API_URL}api/v1/courses?page=${page}&size=${size}`)
      .pipe(

        tap((response) => {
          console.log(response.response);
          this.coursesRepo.setCourses(response.response);
        })
      )

  }
  getCourses2(page: number, size: number) {
    return this.http.get<ApiResponse<Paginator<Course>>>(`${this.API_URL}api/v1/courses?page=${page}&size=${size}`).subscribe((response) => {
      console.log(response.response);
      this.coursesRepo.setCourses(response.response);
    }
    )
  }

  createCourse(course: CourseDto){
    return this.http.post<ApiResponse<String>>(`${this.API_URL}api/v1/courses`, course);
  }

}
