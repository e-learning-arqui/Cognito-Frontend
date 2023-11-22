import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ClassDto} from "../model/dto/classDto";
import {ApiResponse} from "../model/paginator";

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  private sectionId! : number;
  private classId! : number;
  private http: HttpClient = inject(HttpClient);

  constructor() { }

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
