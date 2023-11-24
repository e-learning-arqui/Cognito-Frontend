import { Injectable, inject } from '@angular/core';
import { AssignmentEnv } from '../environments/assignment';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../model/paginator';
import { AssignmentTypeDto } from '../model/dto/AssignmentTypeDto';
import { Observable, map, tap } from 'rxjs';
import { AssignmentTypeStore } from '../store/assignmentTypeStore';
import { SectionDto } from '../model/dto/SectionDto';
import {CourseEnv} from "../environments/course";
import { AssignmentDto } from '../model/dto/AssignmentDto';
import { AssignmentStore } from '../store/assignmentStore';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  API_URL=`${AssignmentEnv.ASSIGNMENT_URL}/api/v1/assignment`;
  TYPE_URL=`${AssignmentEnv.ASSIGNMENT_URL}/api/v1/assignment-type`;
  COURSE_URL=`${CourseEnv.COURSE_URL}/api/v1/courses`;

  constructor(
    private http: HttpClient,
    private assignmentTypeStore: AssignmentTypeStore,
    private assignmentStore: AssignmentStore,



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

  getAssignments(id: number): Observable<AssignmentDto[]>{
    return this.http.get<ApiResponse<AssignmentDto[]>>(`${this.API_URL}/all/${id}`).pipe(
      tap((response) => console.log(response)),
      map((response: ApiResponse<AssignmentDto[]>)=> response.response || []),
      tap((assignment)=> this.assignmentStore.setAssignment(assignment))

    );
  }

  getVerification(id:number, keycloakId: String){
    return this.http.get<ApiResponse<Boolean>>(`${this.API_URL}/${id}/user/${keycloakId}`)
  }

  updateVerification(id:number, keycloakId:String){
    return this.http.put(`${this.API_URL}/${id}/user/${keycloakId}`,{})
  }











}
