import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ClassDto} from "../model/dto/ClassDto";
import {ApiResponse} from "../model/paginator";
import {ClassRepository} from "../store/classStore";
import {tap} from "rxjs";
import {UrlDto} from "../model/dto/UrlDto";

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  private sectionId! : number;
  private classId! : number;
  private http: HttpClient = inject(HttpClient);
  private classStore: ClassRepository = inject(ClassRepository);
  private API_URL = 'http://localhost:8001/api/v1/files';
  constructor() { }

  findClassesByCourseId(courseId: number){
    return this.http.get<ApiResponse<UrlDto[]>>(`${this.API_URL}/courses/${courseId}/files`)
      .pipe(
        tap((response) => {
          this.classStore.setClasses(response.response);
        })
      )
  }

  saveClass(classDto: ClassDto, sectionId: number){
    return this.http.post<ApiResponse<number>>(`http://localhost:7777/api/v1/courses/sections/${sectionId}/classes`, classDto);
  }

  findClassById(id: number){
   return this.http.get<ApiResponse<ClassDto>>(`http://localhost:7777/api/v1/courses/classes/${id}`);
  }

  setSectionUrl(sectionId: number){
    this.sectionId = sectionId;
  }
  getSectionUrl(){
    return this.sectionId;
  }

  setClassId(classId: number){
    this.classId = classId;
  }
  getClassId(){
    return this.classId;
  }
}
