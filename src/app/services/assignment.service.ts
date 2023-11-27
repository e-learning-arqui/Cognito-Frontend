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
import { QuestionDto } from '../model/dto/QuestionDto';
import { ScoreDto } from '../model/dto/ScoreDto';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  //API_URL=`${AssignmentEnv.ASSIGNMENT_URL}/api/v1/assignment`;
  TYPE_URL=`${AssignmentEnv.ASSIGNMENT_URL}/api/v1/assignment-type`;
  API_URL = 'http://localhost:8081';
  COURSE_URL=`${this.API_URL}/courses`;
  ASSIGNMENT_URL=`${this.API_URL}/assignments`;


  constructor(
    private http: HttpClient,
    private assignmentTypeStore: AssignmentTypeStore,
    private assignmentStore: AssignmentStore,
  ) { }



  getAssignmentType(){
    return this.http.get<ApiResponse<AssignmentTypeDto[]>>(`${this.ASSIGNMENT_URL}/api/v1/assignment-type`);

  }

  getAllSections(id: number){
    return this.http.get<ApiResponse<SectionDto[]>>(`${this.API_URL}/${id}/sections`);
  }

  createAssignment(assignmentData: any) {
    const URL = `${this.ASSIGNMENT_URL}/api/v1/assignment`;
    return this.http.post(URL, assignmentData);
  }

  getAssignments(id: number): Observable<AssignmentDto[]>{
    const URL = `${this.ASSIGNMENT_URL}/api/v1/assignment/all/${id}`;
    return this.http.get<ApiResponse<AssignmentDto[]>>(URL).pipe(
      tap((response) => console.log(response)),
      map((response: ApiResponse<AssignmentDto[]>)=> response.response || []),
      tap((assignment)=> this.assignmentStore.setAssignment(assignment))

    );
  }

  getVerification(id:number, keycloakId: String){
    const URL = `${this.ASSIGNMENT_URL}/api/v1/assignment/${id}/user/${keycloakId}`
    return this.http.get<ApiResponse<Boolean>>(URL)
  }

  updateVerification(id:number, keycloakId:String){
    const URL = `${this.ASSIGNMENT_URL}/api/v1/assignment/${id}/user/${keycloakId}`
    return this.http.put(URL,{})
  }


  getQuestions(assignmentId: number){
    const URL = `${this.ASSIGNMENT_URL}/api/v1/assignment/${assignmentId}/questions`
    return this.http.get<ApiResponse<QuestionDto[]>>(URL)
  }

  createStudentAssignment(assignmentData: any, assignmentId:number){
    const URL = `${this.ASSIGNMENT_URL}/api/v1/assignment/${assignmentId}`
    return this.http.post(URL,assignmentData)
  }


  getScore(assignmentId: number, keycloakId: String){
    const URL = `${this.ASSIGNMENT_URL}/api/v1/assignment/${assignmentId}/score/user/${keycloakId}`
    //return this.http.get<ApiResponse<ScoreDto>>(`${this.API_URL}/${assignmentId}/score/user/${keycloakId}`)
    return this.http.get<ApiResponse<ScoreDto>>(URL)
  }











}
