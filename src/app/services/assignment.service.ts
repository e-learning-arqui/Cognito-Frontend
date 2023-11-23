import { Injectable, inject } from '@angular/core';
import { AssignmentEnv } from '../environments/assignment';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../model/paginator';
import { AssignmentTypeDto } from '../model/dto/AssignmentTypeDto';
import { Observable, map, tap } from 'rxjs';
import { AssignmentTypeStore } from '../store/assignmentTypeStore';
import { SectionDto } from '../model/dto/SectionDto';
import {CourseEnv} from "../environments/course";

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  API_URL=`${AssignmentEnv.ASSIGNMENT_URL}/api/v1/assignment`;
  TYPE_URL=`${AssignmentEnv.ASSIGNMENT_URL}/api/v1/assignment-type`;
  COURSE_URL=`${CourseEnv.COURSE_URL}/api/v1/courses`;

  constructor(
    private http: HttpClient,
    private assignmentTypeStore: AssignmentTypeStore


  ) { }



  getAssignmentType(){
    return this.http.get<ApiResponse<AssignmentTypeDto[]>>(`${this.TYPE_URL}`);

  }

  getAllSections(id: number){
    return this.http.get<ApiResponse<SectionDto[]>>(`${this.API_URL}/${id}/sections`);
  }

  createAssignment(assignmentData: any) {
    return this.http.post(this.API_URL, assignmentData);
  }






}
