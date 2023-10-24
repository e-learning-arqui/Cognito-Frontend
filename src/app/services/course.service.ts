import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CourseRepository} from "../store/coursesStore";
import {Environment} from "../environments/environment";
import {Paginator, ApiResponse} from "../model/paginator";
import {Course} from "../model/Course";
import {tap} from "rxjs";
import {CourseDto} from "../model/dto/CourseDto";
import {CourseEnv} from "../environments/course";


@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private API_URL = 'http://localhost:7777/';
  private http: HttpClient = inject(HttpClient)
  private coursesRepo = inject(CourseRepository);

  constructor() {

  }
  /*
  getCourses(page: number, size: number) {
    const filters = this.coursesRepo.getFilters();
    let params = `page=${page}&size=${size}`;
    
    if(filters.title) params += `&title=${filters.title}`;
    if(filters.languageId) params += `&languageId=${filters.languageId}`;
    if(filters.levelId) params += `&levelId=${filters.levelId}`;
    if(filters.categoryId) params += `&categoryId=${filters.categoryId}`;
  
    return this.http.get<ApiResponse<Paginator<Course>>>(`${this.API_URL}api/v1/courses?${params}`)
      .pipe(
        tap((response) => {
          this.coursesRepo.setCourses(response.response);
        })
      )
  }*/
  
  
  getCourses(page: number, size: number) {
    return this.http.get<ApiResponse<Paginator<Course>>>(`${this.API_URL}api/v1/courses?page=${page}&size=${size}`)
      .pipe(
        tap((response) => {
          this.coursesRepo.setCourses(response.response);
          console.log(response.response, " response back from server");
        })
      )

  }
  getCourses2(page: number, size: number) {

    return this.http.get<ApiResponse<Paginator<Course>>>(`${this.API_URL}api/v1/courses?page=${page}&size=${size}`).subscribe((response) => {
      console.log(response.response, " response back from server");
      this.coursesRepo.setCourses(response.response);
    }
    )
  }

  createCourse(course: CourseDto){
    return this.http.post<ApiResponse<number>>(`${this.API_URL}api/v1/courses`, course)

  }


  getCourseById(id: number) {
    return this.http.get<ApiResponse<Course>>(`${this.API_URL}api/v1/courses/${id}`)
  }
  uploadLogo(file: File, courseName: string) {
    const formDataRequest = new FormData();
    const headersR = new HttpHeaders();
    headersR.append('Content-Type', 'multipart/form-data');
    formDataRequest.append('file', file);
    formDataRequest.append('courseName', courseName);
    formDataRequest.append('bucketName', 'cognito-hub');
    // @ts-ignore
    return this.http.post<ApiResponse<String>>('http://localhost:8001/api/v1/files/logo', formDataRequest, { headersR });
  }

  getCourseLogo(courseName: string) {
    return this.http.get<ApiResponse<String>>(`${this.API_URL}api/v1/courses/logo/${courseName}`).pipe(
      tap((response) => {
        console.log(response.response);
      }
    ));
  }

}
