import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StreamStore } from '../store/streamStore';
import { StreamDto } from '../model/dto/StreamDto';
import { Observable, map, tap } from 'rxjs';
import { ApiResponse } from '../model/paginator';
import {CourseEnv} from  '../environments/course';


@Injectable({
  providedIn: 'root'
})
export class StreamService {
  API_URL= CourseEnv.COURSE_URL;
  COURSE_URL = 'http://localhost:8081/courses';

  constructor(
    private http: HttpClient,
    private streamStore: StreamStore) { }

  getKeys(id:number): Observable<StreamDto>{
    const URL = `${this.COURSE_URL}/api/v1/course/${id}/channel/stream`;
    // return this.http.get<ApiResponse<StreamDto>>(`${this.API_URL}/api/v1/course/${id}/channel/stream`).pipe(
    //   tap((response) => console.log(response)),
    //   map((response: ApiResponse<StreamDto>) => response.response || ""),
    //   tap((stream) => this.streamStore.setStream(stream))
    // );
    return this.http.get<ApiResponse<StreamDto>>(URL).pipe(
      tap((response) => console.log(response)),
      map((response: ApiResponse<StreamDto>) => response.response || ""),
      tap((stream) => this.streamStore.setStream(stream))
    );
  }

  getVerification(id: number){
    return this.http.get<ApiResponse<Boolean>>(`${this.API_URL}/api/v1/course/${id}/channel/verification`)
  }


  createChannel(id:number){
    return this.http.post(`${this.API_URL}/api/v1/course/${id}/create-channel`,{})
  }

  getPlayback(id:number){
    return this.http.get<ApiResponse<string>>(`${this.API_URL}/api/v1/course/${id}/channel/playback`).pipe(
      tap((response) => console.log(response)),
    )
  }

}
