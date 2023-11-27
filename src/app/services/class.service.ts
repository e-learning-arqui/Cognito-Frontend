import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ClassDto} from "../model/dto/ClassDto";
import {ApiResponse} from "../model/paginator";
import {ClassRepository} from "../store/classStore";
import {tap} from "rxjs";
import {UrlDto} from "../model/dto/UrlDto";
import {ProgressMessageDto} from "../model/dto/ProgressMessagDto";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  private sectionId! : number;
  private classId! : number;
  private http: HttpClient = inject(HttpClient);
  private classStore: ClassRepository = inject(ClassRepository);
  private API_URL = 'http://localhost:8001/api/v1/files';

  private FILE_URL = environment.FILES_URL;
  private COURSE_URL = environment.COURSE_URL;
  constructor() { }

  findClassesByCourseId(courseId: number){
    const URL = `${this.FILE_URL}/api/v1/files/courses/${courseId}/files`;
    return this.http.get<ApiResponse<UrlDto[]>>(URL)
      .pipe(
        tap((response) => {
          this.classStore.setClasses(response.response);
        })
      )
  }

  findClassesBySectionId(sectionId: number){
    const URL = `${this.COURSE_URL}/api/v1/courses/sections/${sectionId}/classes`;
    return this.http.get<ApiResponse<ClassDto[]>>(URL)
  }

  saveClass(classDto: ClassDto, sectionId: number){
    const URL = `${this.COURSE_URL}/api/v1/courses/sections/${sectionId}/classes`;
    return this.http.post<ApiResponse<number>>(URL, classDto);
  }

  findClassById(id: number){
    const URL = `${this.COURSE_URL}/api/v1/courses/classes/${id}`;
   return this.http.get<ApiResponse<ClassDto>>(URL);
  }

  findUrlByClassId(id: number){

    const URL = `${this.FILE_URL}/api/v1/files/classes/${id}/files`;
    return this.http.get<ApiResponse<UrlDto>>(URL);
  }

  sendProgressNotification(progressMessage: ProgressMessageDto) {


    const routingKey = "progress.routingKey";

    const URL = `${this.COURSE_URL}/api/v1/courses/classes/progress?routingKey=${routingKey}`;

    return this.http.post<ApiResponse<string>>(
        URL,
        progressMessage,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
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
