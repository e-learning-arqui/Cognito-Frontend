import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ClassDto} from "../model/dto/classDto";
import {ApiResponse} from "../model/paginator";

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  private sectionId! : number;
  private http: HttpClient = inject(HttpClient);

  constructor() { }

  saveClass(classDto: ClassDto, sectionId: number){
    return this.http.post<ApiResponse<ClassDto>>(`http://localhost:7777/api/v1/courses/sections/${sectionId}`, classDto);
  }

  setSectionUrl(sectionId: number){
    this.sectionId = sectionId;
  }
  getSectionUrl(){
    return this.sectionId;
  }
}
