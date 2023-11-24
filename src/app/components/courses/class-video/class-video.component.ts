import {Component, inject} from '@angular/core';
import {ClassService} from "../../../services/class.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ClassDto} from "../../../model/dto/ClassDto";
import {FileUploadEvent, FileUploadHandlerEvent} from "primeng/fileupload";
import {CourseService} from "../../../services/course.service";



export interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-class-video',
  templateUrl: './class-video.component.html',
  styleUrls: ['./class-video.component.css']
})

export class ClassVideoComponent {
  private classService: ClassService = inject(ClassService);
  private courseService: CourseService = inject(CourseService);
  private activeRoute: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  courseId = this.activeRoute.snapshot.parent?.params['id'];
  classId!: number;
  classDto!: ClassDto;
  uploadedFiles: any[] = [];

  customUpload? = true;

  constructor() {
    this.classId = this.classService.getClassId();
    this.getClass(this.classId);

  }

  getClass(id: number){
    this.classService.findClassById(id).subscribe(
      (response) => {
        this.classDto = response.response;
      }
    )
  }

  onUpload(event: FileUploadHandlerEvent) {
    for(let file of event.files) {
      this.uploadedFiles.push(file);
      this.courseService.uploadClassVideo(file, this.classId).subscribe(
        (response) => {
        }
      )
    }
    this.router.navigate([`/courses/${this.courseId}/sections`]);


  }

}
