import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CourseRepository} from "../store/coursesStore";
import {Environment} from "../environments/environment";
import {Paginator, ApiResponse} from "../model/paginator";
import {Course} from "../model/Course";
import {tap} from "rxjs";
import {CourseDto} from "../model/dto/CourseDto";
import {CourseEnv} from "../environments/course";
import {SectionDto} from "../model/dto/SectionDto";
import {ClassDto} from "../model/dto/ClassDto";
import {CourseAndProgress} from "../model/CourseAndProgress";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private API_URL = 'http://localhost:7777/';
  private http: HttpClient = inject(HttpClient)
  private coursesRepo = inject(CourseRepository);
  private studentCoursesRepo = inject(CourseRepository);
  private COURSE_URL = environment.COURSE_URL;
  private FILE_URL = environment.FILES_URL;
  constructor() {

  }

  getCourses(page: number, size: number, filters: any = {}) {
    let params = `page=${page}&size=${size}`;
    if(filters.title) params += `&title=${filters.title}`;
    if(filters.languageId) params += `&languageId=${filters.languageId}`;
    if(filters.levelId) params += `&levelId=${filters.levelId}`;
    if(filters.categoryId) params += `&categoryId=${filters.categoryId}`;
    const URL = `${this.COURSE_URL}/api/v1/courses?${params}`;

    return this.http.get<ApiResponse<Paginator<Course>>>(`${URL}`)
      .pipe(
        tap((response) => {
          this.coursesRepo.setCourses(response.response);
        })
      )
  }

  getStudentCourses(keycloakId: string, page: number, size: number, filters: any = {}) {
    let params = `page=${page}&size=${size}`;

    if(filters.title) params += `&title=${filters.title}`;
    if(filters.languageId) params += `&languageId=${filters.languageId}`;
    if(filters.levelId) params += `&levelId=${filters.levelId}`;
    if(filters.categoryId) params += `&categoryId=${filters.categoryId}`;


    const URL = `${this.COURSE_URL}/api/v1/courses/students/${keycloakId}?${params}`;
    return this.http.get<ApiResponse<Paginator<CourseAndProgress>>>(`${URL}`)
      .pipe(
        tap((response) => {
          this.studentCoursesRepo.setCourses(response.response);
        })
      )
  }

  createCourse(course: CourseDto){
    const URL = `${this.COURSE_URL}/api/v1/courses`;
    return this.http.post<ApiResponse<number>>(URL, course)

  }


  getCourseById(id: number) {
    const URL = `${this.COURSE_URL}/api/v1/courses/${id}`;
    return this.http.get<ApiResponse<Course>>(`${URL}`)
  }
  uploadLogo(file: File, courseName: string) {
    const formDataRequest = new FormData();
    const headersR = new HttpHeaders();
    headersR.append('Content-Type', 'multipart/form-data');
    headersR.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    formDataRequest.append('file', file);
    formDataRequest.append('courseName', courseName);
    formDataRequest.append('bucketName', 'cognito-hub');

    const URL = `${this.FILE_URL}/api/v1/files/logo`;
    // @ts-ignore
    return this.http.post<ApiResponse<String>>(URL, formDataRequest, { headersR });
  }

  getCourseLogo(courseName: string) {
    return this.http.get<ApiResponse<String>>(`${this.API_URL}api/v1/courses/logo/${courseName}`).pipe(
      tap((response) => {
        console.log(response.response);
      }
    ));
  }

  getSectionsByCourseId(courseId: number) {
    const URL = `${this.COURSE_URL}/api/v1/courses/${courseId}/sections`;
    //return this.http.get<ApiResponse<SectionDto[]>>(`${this.API_URL}api/v1/courses/${courseId}/sections`)
    return this.http.get<ApiResponse<SectionDto[]>>(URL)
  }

  findSectionsById(courseId: number) {
    const URL = `${this.COURSE_URL}/api/v1/courses/${courseId}/sections`;
    //return this.http.get<ApiResponse<SectionDto[]>>(`${this.API_URL}api/v1/courses/${courseId}/sections`)
    return this.http.get<ApiResponse<SectionDto[]>>(URL)
  }

  saveSection(section: SectionDto, courseId: number) {
    const URL = `${this.COURSE_URL}/api/v1/courses/${courseId}/sections`;
    return this.http.post<ApiResponse<SectionDto>>(URL, section).subscribe(
      data => {
        console.log(data);
      }
    )
  }

  deleteSection(sectionId: number) {
    const URL = `${this.COURSE_URL}/api/v1/sections/${sectionId}/status`;
    // @ts-ignore
    return this.http.put<ApiResponse<String>>(URL).subscribe(
      data => {
        console.log(data);
      }
    )
  }

  uploadClassVideo(file: File, classId: number) {
    const formDataRequest = new FormData();
    const headersR = new HttpHeaders();
    headersR.append('Content-Type', 'multipart/form-data');
    headersR.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    formDataRequest.append('file', file);
    formDataRequest.append('classId', classId.toString());
    formDataRequest.append('bucketName', 'cognito-hub');

    const URL = `${this.FILE_URL}/api/v1/files`;

    // @ts-ignore
    return this.http.post<ApiResponse<String>>(URL, formDataRequest, { headersR });
  }

  findClassesBySectionId(sectionId: number) {
    return this.http.get<ApiResponse<ClassDto[]>>(`${this.API_URL}api/v1/courses/sections/${sectionId}/classes`)
  }

  findClassesByCourseId(courseId: number) {

    const URL = `${this.COURSE_URL}/api/v1/courses/${courseId}/classes/all`;
    //return this.http.get<ApiResponse<ClassDto[]>>(`${this.API_URL}api/v1/courses/${courseId}/classes/all`)
    return this.http.get<ApiResponse<ClassDto[]>>(URL)
  }


  subToCourse(courseTitle: string, keycloakId: string) {
    const URL = `${this.COURSE_URL}/api/v1/courses/students/${keycloakId}?courseName=${courseTitle}`;
    //return this.http.post<ApiResponse<String>>(`${this.API_URL}api/v1/courses/students/${keycloakId}?courseName=${courseTitle}`, null)
    return this.http.post<ApiResponse<String>>(URL, null)
  }


}
